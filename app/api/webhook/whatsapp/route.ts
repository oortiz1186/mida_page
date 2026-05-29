import { NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME;

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
    if (remoteJid.includes("@g.us")) {
      return NextResponse.json({
        success: true,
        message: "Mensaje de grupo ignorado",
      });
    }
    const fromMe = data?.key?.fromMe;
    const messageType = data?.messageType;

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

    if (!remoteJid || !userMessage) {
      return NextResponse.json({
        success: true,
        message: "No hay mensaje válido para responder",
      });
    }

    const respuesta = `Hola 👋 recibimos tu mensaje: "${userMessage}". En breve un asesor te atenderá.`;

    const evolutionResponse = await fetch(
      `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: EVOLUTION_API_KEY || "",
        },
        body: JSON.stringify({
          number: remoteJid,
          text: respuesta,
        }),
      },
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
      { status: 500 },
    );
  }
}
