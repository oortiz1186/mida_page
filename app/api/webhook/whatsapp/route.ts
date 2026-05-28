import { NextResponse } from "next/server";

async function enviarMensajeWhatsApp(numero: string, texto: string) {

  const url =
    `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE_NAME}`;

  await fetch(url, {
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

}

export async function POST(req: Request) {

  try {

    const body = await req.json();

    console.log(JSON.stringify(body, null, 2));

    // IMPORTANTE:
    // NO cortar el @g.us temporalmente
    const numeroCliente =
      body?.data?.key?.remoteJid;

    await enviarMensajeWhatsApp(
      numeroCliente,
      JSON.stringify(body, null, 2).slice(0, 3000)
    );

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      error: "error"
    });

  }

}