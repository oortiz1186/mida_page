import { NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL!;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY!;
const INSTANCE_NAME = process.env.INSTANCE_NAME || "teste";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Webhook activo",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("WEBHOOK RECIBIDO:");
    console.log(JSON.stringify(body, null, 2));

    const mensaje = body?.data?.message?.conversation;

    const numero = body?.data?.key?.remoteJid
      ?.replace("@s.whatsapp.net", "")
      ?.replace("@lid", "");

    console.log("MENSAJE:", mensaje);
    console.log("NUMERO PARA RESPONDER:", numero);
    console.log("SENDER:", body?.sender);
    console.log("REMOTE JID:", body?.data?.key?.remoteJid);

    if (!mensaje || !numero) {
      return NextResponse.json({
        success: true,
        message: "No era un mensaje válido",
      });
    }

    const respuesta = `Hola 👋 recibí tu mensaje: "${mensaje}"`;

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
            text: respuesta,
          },
        }),
      }
    );

    const result = await response.text();

    console.log("STATUS EVOLUTION:", response.status);
    console.log("RESPUESTA EVOLUTION:", result);

    return NextResponse.json({
      success: true,
      enviadoA: numero,
      enviado: respuesta,
      evolutionStatus: response.status,
      evolutionResult: result,
    });

  } catch (error) {
    console.error("ERROR EN WEBHOOK:", error);

    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}