import { NextResponse } from "next/server";

async function enviarMensajeWhatsApp(numero: string, texto: string) {
  // tu función aquí
}

export async function POST(req: Request) {
  try {

    const body = await req.json();

    console.log(JSON.stringify(body, null, 2));

    // EXTRAER NUMERO
    const numeroCliente =
      body?.data?.key?.remoteJid?.split("@")[0];

    // ENVIAR JSON AL WHATSAPP
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