import { NextResponse } from "next/server";
import { MIDA_PROMPT } from "@/lib/midaPrompt";
import { supabase } from "@/lib/supabase";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || "mida";
const WHATSAPP_VENTAS = process.env.WHATSAPP_VENTAS;
const WHATSAPP_GRUPO_ASESORES = process.env.WHATSAPP_GRUPO_ASESORES;

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;
const NOTIFICATION_COOLDOWN_MS = 10 * 60 * 1000;
const NOTIFICATION_STORE_TTL_MS = 60 * 60 * 1000;
const NOTIFICATION_STORE_MAX_ENTRIES = 1000;

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface Advisor {
  id: string;
  name: string;
  whatsapp: string | null;
}

const globalNotificationStore = globalThis as typeof globalThis & {
  __midaNotificationCooldown?: Map<string, number>;
};

const notificationCooldown =
  globalNotificationStore.__midaNotificationCooldown ??
  (globalNotificationStore.__midaNotificationCooldown = new Map<string, number>());

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isSalesConversation(text: string) {
  const normalized = normalizeText(text);
  const salesWords = [
    "cotizacion",
    "cotizar",
    "precio",
    "precios",
    "comprar",
    "compra",
    "costo",
    "cuanto cuesta",
    "licencia",
    "licencias",
    "renovar",
    "renovacion",
    "contratar",
    "adquirir",
    "venta",
    "ventas",
    "quiero informacion para comprar",
    "me interesa comprar",
  ];

  return salesWords.some((word) => normalized.includes(word));
}

function isSupportConversation(text: string) {
  const normalized = normalizeText(text);
  const supportWords = [
    "soporte",
    "asesoria",
    "asesor",
    "ayuda",
    "error",
    "falla",
    "problema",
    "no funciona",
    "no abre",
    "no factura",
    "no timbra",
    "no puedo",
    "tengo un detalle",
    "me marca",
  ];

  return supportWords.some((word) => normalized.includes(word));
}

function extractPhone(text: string) {
  const matches = text.match(/(?:\+?52\s*)?(?:1\s*)?(?:\d[\s().-]*){10}/g);
  if (!matches?.length) return null;

  const digits = matches[matches.length - 1].replace(/\D/g, "");
  const local = digits.slice(-10);

  return /^\d{10}$/.test(local) ? local : null;
}

function phoneVariants(localPhone: string) {
  return Array.from(new Set([localPhone, `52${localPhone}`, `521${localPhone}`]));
}

function normalizeWhatsAppDestination(destination: string) {
  const trimmed = destination.trim();

  if (trimmed.includes("@g.us")) {
    return trimmed;
  }

  const digits = trimmed.replace(/\D/g, "");

  if (/^\d{10}$/.test(digits)) {
    return `52${digits}`;
  }

  if (/^52\d{10}$/.test(digits) || /^521\d{10}$/.test(digits)) {
    return digits;
  }

  return trimmed;
}

function sanitizeMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) {
    return null;
  }

  const messages: ChatMessage[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") return null;

    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;

    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;

    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) return null;

    messages.push({ role, content: trimmed });
  }

  if (messages[messages.length - 1]?.role !== "user") {
    return null;
  }

  return messages;
}

function cleanupNotificationCooldown(now: number) {
  for (const [key, sentAt] of notificationCooldown) {
    if (now - sentAt > NOTIFICATION_STORE_TTL_MS) {
      notificationCooldown.delete(key);
    }
  }

  if (notificationCooldown.size > NOTIFICATION_STORE_MAX_ENTRIES) {
    const oldestEntries = [...notificationCooldown.entries()]
      .sort((a, b) => a[1] - b[1])
      .slice(0, notificationCooldown.size - NOTIFICATION_STORE_MAX_ENTRIES);

    for (const [key] of oldestEntries) {
      notificationCooldown.delete(key);
    }
  }
}

function canNotify(key: string) {
  const now = Date.now();
  cleanupNotificationCooldown(now);
  const lastSentAt = notificationCooldown.get(key) || 0;

  if (now - lastSentAt < NOTIFICATION_COOLDOWN_MS) {
    return false;
  }

  return true;
}

function markNotified(key: string) {
  notificationCooldown.set(key, Date.now());
}

async function sendWhatsApp(destination: string, message: string) {
  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    console.error("EVOLUTION API no está configurada para el chat web.");
    return false;
  }

  const normalizedDestination = normalizeWhatsAppDestination(destination);

  try {
    const response = await fetch(
      `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: EVOLUTION_API_KEY,
        },
        body: JSON.stringify({
          number: normalizedDestination,
          text: message,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(
        "ERROR ENVIANDO NOTIFICACION DESDE CHAT WEB:",
        response.status,
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("ERROR CONECTANDO CON EVOLUTION DESDE CHAT WEB:", error);
    return false;
  }
}

async function findMentionedAdvisor(
  conversationText: string,
): Promise<Advisor | null> {
  const { data: advisors, error } = await supabase
    .from("advisors")
    .select("id,name,whatsapp")
    .eq("active", true);

  if (error) {
    console.error("ERROR CONSULTANDO ASESORES EN CHAT WEB");
    return null;
  }

  const normalizedConversation = normalizeText(conversationText);

  const matches = (advisors || [])
    .filter((advisor) => {
      if (!advisor?.name) return false;

      const normalizedName = normalizeText(advisor.name).trim();
      const nameParts = normalizedName
        .split(/\s+/)
        .filter((part: string) => part.length >= 3);

      return (
        normalizedConversation.includes(normalizedName) ||
        nameParts.some((part: string) => normalizedConversation.includes(part))
      );
    })
    .sort((a, b) => b.name.length - a.name.length);

  return matches[0] || null;
}

async function findAssignedAdvisor(localPhone: string) {
  const variants = phoneVariants(localPhone);

  const { data: client, error } = await supabase
    .from("clients")
    .select("name,phone,advisors(id,name,whatsapp)")
    .in("phone", variants)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("ERROR BUSCANDO CLIENTE DESDE CHAT WEB");
    return { client: null, advisor: null };
  }

  const advisorValue = client?.advisors;
  const advisor = Array.isArray(advisorValue)
    ? advisorValue[0] || null
    : advisorValue || null;

  return {
    client,
    advisor: advisor as Advisor | null,
  };
}

function lastUserMessages(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.role === "user")
    .slice(-5)
    .map((message) => `• ${message.content}`)
    .join("\n");
}

function buildSupportNotification(
  advisor: Advisor,
  phone: string,
  messages: ChatMessage[],
) {
  return `🛠️ SOLICITUD DE SOPORTE DESDE MIDA.MX\n\nAsesor: ${advisor.name}\nTeléfono del cliente: ${phone}\n\nEl cliente está solicitando apoyo desde el chat de la página web.\n\nÚltimos mensajes:\n${lastUserMessages(messages)}`;
}

function buildUnassignedSupportNotification(
  phone: string,
  messages: ChatMessage[],
) {
  return `🟡 NUEVO CLIENTE / SOPORTE SIN ASESOR DESDE MIDA.MX\n\nTeléfono del cliente: ${phone}\n\nEl cliente solicita soporte desde el chat web y no se encontró un asesor asignado.\n\nÚltimos mensajes:\n${lastUserMessages(messages)}`;
}

function buildSalesNotification(phone: string, messages: ChatMessage[]) {
  return `🔔 NUEVA OPORTUNIDAD DE VENTA DESDE MIDA.MX\n\nTeléfono del prospecto: ${phone}\n\nEl prospecto mostró interés de compra, cotización, renovación o contratación desde el chat web.\n\nÚltimos mensajes:\n${lastUserMessages(messages)}`;
}

export async function POST(req: Request) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "El asistente no está configurado correctamente." },
        { status: 500 },
      );
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { error: "Tipo de contenido no permitido." },
        { status: 415 },
      );
    }

    const body = await req.json();
    const messages = sanitizeMessages(body?.messages);

    if (!messages) {
      return NextResponse.json(
        { error: "Conversación inválida o demasiado grande." },
        { status: 400 },
      );
    }

    const userConversation = messages
      .filter((message) => message.role === "user")
      .map((message) => message.content)
      .join("\n");

    const salesConversation = isSalesConversation(userConversation);
    const supportConversation = isSupportConversation(userConversation);
    const phone = extractPhone(userConversation);

    if (salesConversation) {
      if (!phone) {
        return NextResponse.json({
          reply:
            "Con gusto te canalizo con el área de ventas. Compárteme por favor tu número de teléfono a 10 dígitos para que un asesor comercial pueda contactarte.",
        });
      }

      const notificationKey = `sales:${phone}`;
      if (!canNotify(notificationKey)) {
        return NextResponse.json({
          reply:
            "Tu solicitud ya fue canalizada con ventas recientemente. Un asesor comercial se pondrá en contacto contigo.",
        });
      }

      if (WHATSAPP_VENTAS) {
        const sent = await sendWhatsApp(
          WHATSAPP_VENTAS,
          buildSalesNotification(phone, messages),
        );

        if (sent) {
          markNotified(notificationKey);
          return NextResponse.json({
            reply:
              "Gracias. Ya canalicé tu solicitud con ventas y envié tus datos al área comercial. Un asesor se pondrá en contacto contigo.",
          });
        }
      }

      return NextResponse.json({
        reply:
          "Gracias. Identifiqué que necesitas atención de ventas, pero en este momento no pude enviar la notificación automática. Puedes continuar aquí y daremos seguimiento a tu solicitud.",
      });
    }

    if (supportConversation) {
      const mentionedAdvisor = await findMentionedAdvisor(userConversation);

      if (!phone) {
        if (mentionedAdvisor) {
          return NextResponse.json({
            reply: `Claro. Para avisarle a ${mentionedAdvisor.name} y que pueda contactarte, compárteme por favor tu número de teléfono a 10 dígitos.`,
          });
        }

        return NextResponse.json({
          reply:
            "Claro, con gusto te canalizo con soporte. Compárteme por favor tu número de teléfono a 10 dígitos para verificar si ya tienes un asesor asignado en MIDA.",
        });
      }

      let advisor = mentionedAdvisor;
      let clientName: string | null = null;

      if (!advisor) {
        const assigned = await findAssignedAdvisor(phone);
        advisor = assigned.advisor;
        clientName = assigned.client?.name || null;
      }

      if (advisor?.whatsapp) {
        const notificationKey = `support:${phone}:${advisor.id}`;

        if (!canNotify(notificationKey)) {
          return NextResponse.json({
            reply: `Tu solicitud ya fue enviada recientemente a ${advisor.name}. Te contactará para apoyarte.`,
          });
        }

        const sent = await sendWhatsApp(
          advisor.whatsapp,
          buildSupportNotification(advisor, phone, messages),
        );

        if (sent) {
          markNotified(notificationKey);
          return NextResponse.json({
            reply: clientName
              ? `Gracias, ${clientName}. Ya notifiqué a tu asesor ${advisor.name} sobre tu solicitud de soporte. Te contactará para ayudarte.`
              : `Gracias. Ya notifiqué a tu asesor ${advisor.name} sobre tu solicitud de soporte. Te contactará para ayudarte.`,
          });
        }

        return NextResponse.json({
          reply:
            "Identifiqué a tu asesor, pero en este momento no pude enviarle la notificación automática. Puedes continuar aquí y nuestro equipo dará seguimiento.",
        });
      }

      const notificationKey = `support-group:${phone}`;
      if (!canNotify(notificationKey)) {
        return NextResponse.json({
          reply:
            "Tu solicitud ya fue enviada recientemente al equipo de soporte. Un asesor disponible se pondrá en contacto contigo.",
        });
      }

      if (WHATSAPP_GRUPO_ASESORES) {
        const sent = await sendWhatsApp(
          WHATSAPP_GRUPO_ASESORES,
          buildUnassignedSupportNotification(phone, messages),
        );

        if (sent) {
          markNotified(notificationKey);
          return NextResponse.json({
            reply:
              "Gracias. No encontré un asesor asignado a tu número, así que ya notifiqué al equipo de soporte de MIDA. Un asesor disponible se pondrá en contacto contigo.",
          });
        }
      }

      return NextResponse.json({
        reply:
          "No encontré un asesor asignado y en este momento no pude notificar automáticamente al equipo. Puedes continuar aquí y daremos seguimiento a tu solicitud.",
      });
    }

    const contents = messages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: `${MIDA_PROMPT}\n\nCANAL WEB\nEstás atendiendo al usuario dentro del chat de mida.mx. No le indiques que abra WhatsApp salvo que pida hablar con una persona. Si requiere soporte o pide hablar con su asesor, indícale que puedes canalizarlo desde este mismo chat. Si detectas interés de compra, cotización, renovación o contratación, indícale que puedes canalizarlo con ventas desde el mismo chat. Mantén respuestas breves y útiles.`,
              },
            ],
          },
          contents,
        }),
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("ERROR CHAT GEMINI:", response.status);
      return NextResponse.json(
        {
          reply:
            "Gracias por escribirnos. En este momento no pude generar una respuesta automática. Puedes intentar nuevamente en unos momentos.",
        },
        { status: 502 },
      );
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Hola 👋 ¿En qué podemos ayudarte hoy?";

    return NextResponse.json(
      { reply },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("ERROR API CHAT:", error);
    return NextResponse.json(
      { error: "No se pudo procesar el mensaje." },
      { status: 500 },
    );
  }
}
