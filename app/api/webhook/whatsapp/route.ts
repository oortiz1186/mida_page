import { NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME =
  process.env.EVOLUTION_INSTANCE_NAME || "mida";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generarRespuestaIA(mensajeUsuario: string) {
  const promptSistema = `
Eres un asistente virtual humano, amable y didáctico para MIDA.

Tu forma de responder:
- Habla en español claro y natural.
- Sé amable, cercano y profesional.
- No respondas como robot.
- No uses menús rígidos.
- Responde breve, máximo 4 párrafos.
- Si la persona quiere atención humana, dile que con gusto puede ser canalizada con un asesor.
- Si no sabes algo específico, no inventes. Di que puedes ayudar a canalizarlo.
- No des diagnósticos médicos, legales o financieros.
- Tu objetivo es orientar, explicar y acompañar.
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY || "",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: promptSistema }],
        },
        contents: [
          {
            parts: [
              {
                text: mensajeUsuario,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log("STATUS GEMINI:", response.status);
  console.log("RESPUESTA GEMINI:", JSON.stringify(data));

  const texto =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Gracias por escribirnos. En breve un asesor de MIDA podrá apoyarte con más información.";

  return texto;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("WEBHOOK RECIBIDO:");
    console.log(JSON.stringify(body, null, 2));

    const event = body?.event;
    const data = body?.data;

    if (event !== "messages.upsert") {
      return NextResponse.json({
        success: true,
        message: "Evento ignorado",
      });
    }

    const remoteJid = data?.key?.remoteJid;
    const fromMe = data?.key?.fromMe;
    const messageType = data?.messageType;

    if (!remoteJid) {
      return NextResponse.json({
        success: true,
        message: "Sin remoteJid",
      });
    }

    if (remoteJid.includes("@g.us")) {
      return NextResponse.json({
        success: true,
        message: "Mensaje de grupo ignorado",
      });
    }

    if (fromMe) {
      return NextResponse.json({
        success: true,
        message: "Mensaje propio ignorado",
      });
    }

    let userMessage = "";

    if (messageType === "conversation") {
      userMessage = data?.message?.conversation || "";
    }

    if (messageType === "extendedTextMessage") {
      userMessage = data?.message?.extendedTextMessage?.text || "";
    }

    if (!userMessage) {
      return NextResponse.json({
        success: true,
        message: "Mensaje vacío o no compatible",
      });
    }

    const respuestaIA = await generarRespuestaIA(userMessage);

    const evolutionResponse = await fetch(
      `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: EVOLUTION_API_KEY || "",
        },
        body: JSON.stringify({
          number: remoteJid.replace("@s.whatsapp.net", ""),
          text: respuestaIA,
        }),
      }
    );

    const evolutionData = await evolutionResponse.json();

    console.log("STATUS EVOLUTION:", evolutionResponse.status);
    console.log("RESPUESTA EVOLUTION:", JSON.stringify(evolutionData));

    return NextResponse.json({
      success: true,
      enviado: true,
      respuesta: evolutionData,
    });
  } catch (error) {
    console.error("ERROR WEBHOOK:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error procesando webhook",
      },
      { status: 500 }
    );
  }
}