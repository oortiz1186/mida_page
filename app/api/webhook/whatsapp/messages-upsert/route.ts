import { NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL!;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY!;
const INSTANCE_NAME = process.env.INSTANCE_NAME || "teste";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

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

  console.log("STATUS GEMINI:", response.status);
  console.log("RESPUESTA GEMINI:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    return `Error Gemini: ${
      data?.error?.message || "No se pudo generar respuesta"
    }`;
  }

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Gracias por escribirnos. En breve te atenderemos."
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("WEBHOOK RECIBIDO:");
    console.log(JSON.stringify(body, null, 2));

    console.log("EVENTO:", body?.event);
    console.log("ID MENSAJE:", body?.data?.key?.id);
    console.log("FROM ME:", body?.data?.key?.fromMe);

    if (body?.event !== "messages.upsert") {
      return NextResponse.json({
        success: true,
        message: "Evento ignorado",
      });
    }

    if (body?.data?.key?.fromMe) {
      return NextResponse.json({
        success: true,
        message: "Mensaje propio ignorado",
      });
    }

    const mensaje = body?.data?.message?.conversation;

    // Temporal para pruebas
    const numero = "5214776336652";

    if (!mensaje) {
      return NextResponse.json({
        success: true,
        message: "No era un mensaje de texto",
      });
    }

    const respuestaIA = await generarRespuestaIA(mensaje);

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
          textMessage: {
            text: respuestaIA,
          },
        }),
      }
    );

    const result = await response.text();

    console.log("STATUS EVOLUTION:", response.status);
    console.log("RESPUESTA EVOLUTION:", result);

    return NextResponse.json({
      success: true,
      mensajeRecibido: mensaje,
      respuestaIA,
      evolutionStatus: response.status,
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