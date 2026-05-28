import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL as string;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY as string;
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE_NAME as string;

const GRUPO_ASESORES = process.env.WHATSAPP_GRUPO_ASESORES as string;
const WHATSAPP_VENTAS = process.env.WHATSAPP_VENTAS as string;

async function enviarMensajeWhatsApp(numero: string, texto: string) {
  const url = `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: EVOLUTION_API_KEY,
    },
    body: JSON.stringify({
      number: numero,
      options: {
        delay: 1200,
        presence: "composing",
      },
      textMessage: {
        text: texto,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error enviando WhatsApp:", errorText);
  }
}

function obtenerMensajeTexto(body: any) {
  return (
    body?.data?.message?.conversation ||
    body?.data?.message?.extendedTextMessage?.text ||
    body?.data?.message?.imageMessage?.caption ||
    ""
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("WEBHOOK EVOLUTION:");
    console.log(JSON.stringify(body, null, 2));

    const mensajeNuevo = obtenerMensajeTexto(body);
    const numeroCliente = body?.data?.key?.remoteJid?.split("@")[0];
    const fromMe = body?.data?.key?.fromMe;

    if (fromMe || !mensajeNuevo || !numeroCliente) {
      return NextResponse.json({ status: "ignorado" });
    }

    const prompt = `
Eres un clasificador de intenciones para WhatsApp de la empresa MIDA.

Analiza el mensaje del usuario y responde ESTRICTAMENTE con una sola palabra:

NUEVO
RECURRENTE
VENTAS
MENU

Reglas:
- NUEVO: primera vez, soporte, ayuda, problema, dudas generales.
- RECURRENTE: ya tiene asesor, seguimiento, ticket, caso abierto.
- VENTAS: comprar licencia, renovar licencia, cotización, precio, facturación comercial.
- MENU: saludo, mensaje confuso o no queda claro.

Mensaje del usuario:
"${mensajeNuevo}"
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const intencion = result.response.text().trim().toUpperCase();

    switch (intencion) {
      case "VENTAS":
        await enviarMensajeWhatsApp(
          numeroCliente,
          `Gracias por contactar a MIDA. Para compra o renovación de licencias, comunícate con ventas aquí:\n\nhttps://wa.me/${WHATSAPP_VENTAS}`,
        );
        break;

      case "NUEVO":
        await enviarMensajeWhatsApp(
          numeroCliente,
          "Gracias por contactar a MIDA. Te hemos colocado en espera. En breve un asesor disponible te atenderá.",
        );

        await enviarMensajeWhatsApp(
          GRUPO_ASESORES,
          `🚨 Cliente en espera desde la página web MIDA\n\n📱 Cliente: https://wa.me/${numeroCliente}\n💬 Mensaje: ${mensajeNuevo}\n\nFavor de tomar el caso.`,
        );
        break;

      case "RECURRENTE":
        await enviarMensajeWhatsApp(
          numeroCliente,
          "Perfecto. Si ya tienes un asesor asignado, por favor continúa la conversación con él. Si no recuerdas quién te atiende, escribe: *No recuerdo mi asesor*.",
        );

        await enviarMensajeWhatsApp(
          GRUPO_ASESORES,
          `🔁 Cliente recurrente solicita atención\n\n📱 Cliente: https://wa.me/${numeroCliente}\n💬 Mensaje: ${mensajeNuevo}`,
        );
        break;

      case "MENU":
      default:
        await enviarMensajeWhatsApp(
          numeroCliente,
          `¡Hola! Bienvenido al soporte de MIDA.

Elige una opción:

1. Soy cliente nuevo y necesito soporte
2. Ya tengo un asesor asignado
3. Quiero comprar una licencia
4. Quiero renovar una licencia`,
        );
        break;
    }

    return NextResponse.json({
      success: true,
      intencion,
      numeroCliente,
    });
  } catch (error) {
    console.error("Error en el Webhook:", error);
    return NextResponse.json(
      { error: "Error procesando el mensaje" },
      { status: 500 },
    );
  }
}
