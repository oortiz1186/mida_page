import { NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL!;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY!;
const INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || "mida";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const mensajesProcesados = new Set<string>();

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Webhook activo con IA",
  });
}

async function generarRespuestaIA(mensaje: string) {
  const prompt = `
Eres MIDA AI, el asistente comercial de MIDA.

MIDA ofrece soluciones tecnológicas para empresas y emprendedores:
- Desarrollo de páginas web.
- Automatización de procesos.
- Inteligencia artificial.
- Chatbots para WhatsApp.
- Soporte técnico.
- Consultoría tecnológica.
- Capacitación en herramientas digitales e IA.

Reglas:
- Responde breve, amable y profesional.
- No inventes precios.
- Si preguntan costos, indica que un asesor puede dar una cotización personalizada.
- Haz preguntas para entender la necesidad del cliente.
- No respondas con mensajes demasiado largos.

Mensaje del usuario:
"${mensaje}"
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("ERROR GEMINI:", data);
    return "Gracias por escribirnos. En breve un asesor de MIDA te atenderá.";
  }

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Gracias por escribirnos. En breve te atenderemos."
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(
      "WEBHOOK COMPLETO:",
      JSON.stringify(body, null, 2)
    );

    const event = body?.event;
    const data = body?.data;

    const messageId = data?.key?.id;
    const fromMe = data?.key?.fromMe;

    const remoteJid =
      data?.key?.remoteJidAlt ||
      data?.key?.remoteJid;

    const mensaje =
      data?.message?.conversation ||
      data?.message?.extendedTextMessage?.text ||
      data?.message?.imageMessage?.caption ||
      data?.message?.videoMessage?.caption;

    console.log("EVENTO:", event);
    console.log("ID MENSAJE:", messageId);
    console.log("REMOTE JID:", remoteJid);
    console.log("FROM ME:", fromMe);
    console.log("MENSAJE:", mensaje);

    if (event !== "messages.upsert") {
      return NextResponse.json({
        success: true,
        message: "Evento ignorado",
      });
    }

    if (fromMe) {
      return NextResponse.json({
        success: true,
        message: "Mensaje propio ignorado",
      });
    }

    if (!messageId || !remoteJid || !mensaje) {
      return NextResponse.json({
        success: true,
        message: "Mensaje inválido",
      });
    }

    if (mensajesProcesados.has(messageId)) {
      return NextResponse.json({
        success: true,
        message: "Mensaje duplicado ignorado",
      });
    }

    mensajesProcesados.add(messageId);

    const numero = remoteJid
      .replace("@s.whatsapp.net", "")
      .replace("@lid", "")
      .replace("@g.us", "");

    const respuestaIA = await generarRespuestaIA(mensaje);

    console.log("RESPUESTA IA:", respuestaIA);

    const response = await fetch(
      `${EVOLUTION_API_URL}/message/sendText/${INSTANCE_NAME}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: EVOLUTION_API_KEY,
        },
        body: JSON.stringify({
          number: numero,
          text: respuestaIA,
        }),
      }
    );

    const result = await response.text();

    console.log("STATUS EVOLUTION:", response.status);
    console.log("RESPUESTA EVOLUTION:", result);

    return NextResponse.json({
      success: true,
      enviadoA: numero,
      respuestaIA,
    });

  } catch (error) {
    console.error("ERROR EN WEBHOOK:", error);

    return NextResponse.json(
      {
        error: "Error interno",
      },
      {
        status: 500,
      }
    );
  }
}