import { NextResponse } from "next/server";
import { MIDA_PROMPT } from "@/lib/midaPrompt";
import { supabase } from "@/lib/supabase";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || "mida";
const WHATSAPP_VENTAS = process.env.WHATSAPP_VENTAS;
const WHATSAPP_GRUPO_ASESORES = process.env.WHATSAPP_GRUPO_ASESORES;

const MAX_MESSAGES = 40;
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
    "actualizacion de version",
    "actualizar version",
    "actualizar mi sistema",
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
    "necesito que me atiendan",
    "asistencia tecnica",
    "me pueden apoyar",
  ];

  return supportWords.some((word) => normalized.includes(word));
}

function extractField(messages: ChatMessage[], field: "nombre" | "empresa" | "problema") {
  const pattern = field === "nombre"
    ? /(?:mi nombre es|me llamo|nombre\s*:)\s*([^\n.,;]+)/i
    : field === "empresa"
      ? /(?:mi empresa es|empresa\s*:|soy de la empresa)\s*([^\n.,;]+)/i
      : /(?:problema\s*:|necesito ayuda con|el problema es|me falla|no puedo)\s*([^\n]+)/i;
  for (const message of [...messages].reverse()) {
    if (message.role !== "user") continue;
    const match = message.content.match(pattern);
    if (match?.[1]?.trim()) return match[1].trim().slice(0, 160);
  }
  return null;
}

function advisorAnswer(messages: ChatMessage[]): "yes" | "no" | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.role !== "assistant" || !/tienes (un )?asesor|cuentas con (un )?asesor/i.test(message.content)) continue;
    const next = messages.slice(i + 1).find((m) => m.role === "user");
    if (!next) return null;
    const answer = normalizeText(next.content.trim());
    if (/^(no|ninguno|no tengo|aun no|todavia no)\b/.test(answer)) return "no";
    if (/^(si|claro|ya tengo|tengo asesor)\b/.test(answer)) return "yes";
    return null;
  }
  return null;
}

function leadData(messages: ChatMessage[]) {
  return {
    name: extractField(messages, "nombre"),
    company: extractField(messages, "empresa"),
    issue: extractField(messages, "problema"),
  };
}

function missingLeadData(messages: ChatMessage[]) {
  const data = leadData(messages);
  if (!data.name) return "Para registrar tu solicitud, dime tu nombre completo (por ejemplo: Mi nombre es Ana López).";
  if (!data.company) return "Gracias. ¿De qué empresa nos contactas? (Por ejemplo: Empresa: Comercial ABC).";
  if (!data.issue) return "Cuéntame brevemente qué necesitas. Puedes escribir: Problema: ...";
  return null;
}

async function recordLead(input: {
  phone: string;
  category: "sales" | "support";
  destination: string;
  messages: ChatMessage[];
}) {
  const data = leadData(input.messages);
  const { data: row, error } = await supabase
    .from("web_chat_requests")
    .insert({
      customer_name: data.name,
      company_name: data.company,
      phone: input.phone,
      description: data.issue,
      category: input.category,
      destination: input.destination,
      status: "pending",
      transcript: input.messages,
    })
    .select("id")
    .single();
  if (error || !row?.id) {
    console.error("CHAT WEB: no se pudo registrar solicitud", error?.code);
    return null;
  }
  return String(row.id);
}

async function updateLead(id: string, status: "accepted" | "failed") {
  const { error } = await supabase.from("web_chat_requests")
    .update({ status, notified_at: status === "accepted" ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) console.error("CHAT WEB: no se pudo actualizar solicitud", error.code);
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
    if (!GEMINI_API_KEY) return NextResponse.json({ error: "Chat no configurado" }, { status: 500 });
    if (!(req.headers.get("content-type") || "").includes("application/json"))
      return NextResponse.json({ error: "Content type inválido" }, { status: 415 });

    const body = await req.json();
    const messages = sanitizeMessages(body?.messages);
    if (!messages) return NextResponse.json({ error: "Conversación inválida" }, { status: 400 });

    const conversation = messages.filter(m => m.role === "user").map(m => m.content).join("\n");
    const normalized = normalizeText(conversation);
    const support = isSupportConversation(conversation);
    const sales = isSalesConversation(conversation);
    const technical = /soporte|falla|error|problema|no funciona|no abre|no timbra|no factura|ayuda/.test(normalized);
    const category: "support" | "sales" | null = support && (technical || !sales) ? "support" : sales ? "sales" : support ? "support" : null;

    if (category) {
      const missing = missingLeadData(messages);
      if (missing) return NextResponse.json({ reply: missing });
      const phone = extractPhone(conversation);
      if (!phone) return NextResponse.json({ reply: "Compárteme un teléfono de contacto a 10 dígitos, por favor." });

      let destination = "sales";
      let whatsapp = WHATSAPP_VENTAS;
      let advisor: Advisor | null = null;

      if (category === "support") {
        const status = advisorAnswer(messages);
        if (!status) return NextResponse.json({ reply: "¿Ya tienes un asesor de MIDA? Responde sí o no, por favor." });
        if (status === "yes") {
          const explicitName = conversation.match(/(?:mi asesor es|me atiende|asesor\s*:)\s*([^\n.,;]+)/i)?.[1]?.trim();
          if (!explicitName) return NextResponse.json({ reply: "¿Cómo se llama tu asesor? Escribe: Mi asesor es Nombre Apellido." });
          advisor = await findMentionedAdvisor(explicitName);
          if (!advisor?.whatsapp) return NextResponse.json({ reply: "No pude identificar a ese asesor. Confirma su nombre completo o escribe 'No tengo asesor' para canalizarte al equipo general." });
          destination = "advisor:" + advisor.id;
          whatsapp = advisor.whatsapp;
        } else {
          destination = "advisor_group";
          whatsapp = WHATSAPP_GRUPO_ASESORES;
        }
      }

      const key = category + ":" + destination + ":" + phone;
      if (!canNotify(key)) return NextResponse.json({ reply: "Ya se envió recientemente una notificación para este número. Si es otra solicitud, comunícate al 477 329 5727." });

      const id = await recordLead({ phone, category, destination, messages });
      if (!id) return NextResponse.json({ reply: "No pude registrar tu solicitud. Por favor llama al 477 329 5727." });
      const notice = category === "sales"
        ? buildSalesNotification(phone, messages)
        : advisor
          ? buildSupportNotification(advisor, phone, messages)
          : buildUnassignedSupportNotification(phone, messages);
      const sent = whatsapp ? await sendWhatsApp(whatsapp, notice) : false;
      await updateLead(id, sent ? "accepted" : "failed");
      if (sent) {
        markNotified(key);
        return NextResponse.json({ reply: "Tu solicitud quedó registrada y la notificación fue aceptada por nuestro sistema de WhatsApp. Un integrante del equipo podrá revisarla." });
      }
      return NextResponse.json({ reply: "Registré tu solicitud, pero falló el envío de WhatsApp. Por favor llama al 477 329 5727 e indica que ya escribiste por el chat." });
    }

    const contents = messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: MIDA_PROMPT + "\nCANAL WEB: No prometas canalizaciones ni notificaciones. Para soporte o ventas, pide al cliente describir su solicitud explícitamente." }] },
        contents
      }),
      cache: "no-store"
    });
    if (!response.ok) return NextResponse.json({ reply: "No pude responder ahora. Intenta nuevamente." }, { status: 502 });
    const data = await response.json();
    return NextResponse.json({ reply: data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "¿En qué podemos ayudarte?" });
  } catch (error) {
    console.error("ERROR API CHAT:", error);
    return NextResponse.json({ error: "No se pudo procesar el mensaje." }, { status: 500 });
  }
}
