import { NextResponse } from "next/server";
import { MIDA_PROMPT } from "@/lib/midaPrompt";
import { supabase } from "@/lib/supabase";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || "mida";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Advisor {
  id: string;
  name: string;
  whatsapp: string | null;
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
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
    "contpaqi",
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
  return Array.from(
    new Set([localPhone, `52${localPhone}`, `521${localPhone}`]),
  );
}

function notificationAlreadySent(messages: ChatMessage[]) {
  return messages.some(
    (message) =>
      message.role === "assistant" &&
      normalizeText(message.content).includes("ya notifique a tu asesor"),
  );
}

async function sendWhatsApp(destination: string, message: string) {
  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    console.error("EVOLUTION API no está configurada para el chat web.");
    return false;
  }

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
          number: destination,
          text: message,
        }),
      },
    );

    if (!response.ok) {
      console.error(
        "ERROR NOTIFICANDO ASESOR DESDE CHAT WEB:",
        response.status,
        await response.text(),
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
    console.error("ERROR CONSULTANDO ASESORES EN CHAT WEB:", error);
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
    console.error("ERROR BUSCANDO CLIENTE DESDE CHAT WEB:", error);
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

function buildSupportNotification(
  advisor: Advisor,
  phone: string,
  messages: ChatMessage[],
) {
  const userMessages = messages
    .filter((message) => message.role === "user")
    .slice(-5)
    .map((message) => `• ${message.content}`)
    .join("\n");

  return `🛠️ SOLICITUD DE SOPORTE DESDE MIDA.MX

Asesor: ${advisor.name}
Teléfono del cliente: ${phone}

El cliente está solicitando apoyo desde el chat de la página web.

Últimos mensajes:
${userMessages}`;
}

export async function POST(req: Request) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "El asistente no está configurado correctamente." },
        { status: 500 },
      );
    }

    const body = await req.json();
    const messages: ChatMessage[] = Array.isArray(body?.messages)
      ? body.messages
          .filter(
            (message: ChatMessage) =>
              message &&
              (message.role === "user" || message.role === "assistant") &&
              typeof message.content === "string" &&
              message.content.trim(),
          )
          .slice(-12)
      : [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "Escribe un mensaje para iniciar la conversación." },
        { status: 400 },
      );
    }

    const userConversation = messages
      .filter((message) => message.role === "user")
      .map((message) => message.content)
      .join("\n");

    const supportConversation = isSupportConversation(userConversation);
    const phone = extractPhone(userConversation);
    const alreadyNotified = notificationAlreadySent(messages);

    if (supportConversation && !alreadyNotified) {
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
        const notification = buildSupportNotification(advisor, phone, messages);
        const sent = await sendWhatsApp(advisor.whatsapp, notification);

        if (sent) {
          return NextResponse.json({
            reply: clientName
              ? `Gracias, ${clientName}. Ya notifiqué a tu asesor ${advisor.name} sobre tu solicitud de soporte. Te contactará para ayudarte.`
              : `Gracias. Ya notifiqué a tu asesor ${advisor.name} sobre tu solicitud de soporte. Te contactará para ayudarte.`,
          });
        }
      }

      if (!advisor) {
        return NextResponse.json({
          reply:
            "No encontré un asesor asignado con ese número. Si ya trabajas con un asesor de MIDA, dime su nombre y con gusto le envío la notificación.",
        });
      }

      return NextResponse.json({
        reply:
          "Identifiqué a tu asesor, pero en este momento no pude enviarle la notificación automática. Puedes continuar aquí y nuestro equipo dará seguimiento.",
      });
    }

    const contents = messages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content.trim() }],
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
                text: `${MIDA_PROMPT}\n\nCANAL WEB\nEstás atendiendo al usuario dentro del chat de mida.mx. No le indiques que abra WhatsApp salvo que pida hablar con una persona. Si requiere soporte o pide hablar con su asesor, indícale que puedes canalizarlo desde este mismo chat. Mantén respuestas breves y útiles.`,
              },
            ],
          },
          contents,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("ERROR CHAT GEMINI:", data);
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

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("ERROR API CHAT:", error);
    return NextResponse.json(
      { error: "No se pudo procesar el mensaje." },
      { status: 500 },
    );
  }
}
