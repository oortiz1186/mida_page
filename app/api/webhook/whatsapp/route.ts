import { NextResponse } from "next/server";
import { MIDA_PROMPT } from "@/lib/midaPrompt";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || "mida";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generarRespuestaIA(mensajeUsuario: string) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY || "",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: MIDA_PROMPT }],
        },
        contents: [
          {
            parts: [{ text: mensajeUsuario }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log("STATUS GEMINI:", response.status);
  console.log("RESPUESTA GEMINI:", JSON.stringify(data));

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Gracias por escribirnos. En breve un asesor de MIDA podrá apoyarte con más información."
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("WEBHOOK RECIBIDO:");
    console.log(JSON.stringify(body, null, 2));

    const event = body?.event;
    const data = body?.data;

    if (event !== "messages.upsert") {
      return NextResponse.json({ success: true, message: "Evento ignorado" });
    }

    const remoteJid = data?.key?.remoteJid;
    const fromMe = data?.key?.fromMe;
    const messageType = data?.messageType;

    if (!remoteJid) {
      return NextResponse.json({ success: true, message: "Sin remoteJid" });
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