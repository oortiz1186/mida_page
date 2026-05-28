import { NextResponse } from "next/server";

async function enviarMensajeWhatsApp(
  numero: string,
  texto: string
) {
  try {

    const url =
      `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE_NAME}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.EVOLUTION_API_KEY as string
      },
      body: JSON.stringify({
        number: numero,
        options: {
          delay: 1200,
          presence: "composing"
        },
        textMessage: {
          text: texto
        }
      })
    });

    const data = await response.text();

    console.log("STATUS EVOLUTION:", response.status);
    console.log("RESPUESTA EVOLUTION:", data);

  } catch (error) {

    console.error("ERROR ENVIANDO WHATSAPP:", error);

  }
}

export async function POST(req: Request) {

  try {

    const body = await req.json();

    console.log("WEBHOOK COMPLETO:");
    console.log(JSON.stringify(body, null, 2));

    // Detectar si es grupo o chat privado
    const remoteJid =
      body?.data?.key?.remoteJid;

    if (!remoteJid) {

      return NextResponse.json({
        error: "No remoteJid"
      });

    }

    // Si es grupo
    const esGrupo = remoteJid.includes("@g.us");

    // Numero destino
    let destino = "";

    if (esGrupo) {

      destino = remoteJid;

    } else {

      destino = remoteJid.replace("@s.whatsapp.net", "");

    }

    // Mandar JSON de prueba
    await enviarMensajeWhatsApp(
      destino,
      JSON.stringify(body, null, 2).slice(0, 3000)
    );

    return NextResponse.json({
      success: true,
      remoteJid,
      destino
    });

  } catch (error) {

    console.error("ERROR WEBHOOK:", error);

    return NextResponse.json({
      error: "error webhook"
    });

  }
}