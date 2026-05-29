import { NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL!;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY!;
const INSTANCE_NAME = process.env.INSTANCE_NAME!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("WEBHOOK RECIBIDO:");
    console.log(JSON.stringify(body, null, 2));

    const mensaje = body?.data?.message?.conversation;
    const numero = body?.data?.key?.remoteJid;

    if (!mensaje || !numero) {
      return NextResponse.json({
        success: true,
        message: "No era un mensaje de texto válido",
      });
    }

    const respuesta = `Hola 👋 recibí tu mensaje: "${mensaje}"`;

    await fetch(`${EVOLUTION_API_URL}/message/sendText/${INSTANCE_NAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        number: numero,
        text: respuesta,
      }),
    });

    return NextResponse.json({
      success: true,
      enviado: respuesta,
    });

  } catch (error) {
    console.error("ERROR EN WEBHOOK:", error);

    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}