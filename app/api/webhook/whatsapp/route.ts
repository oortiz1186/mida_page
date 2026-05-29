import { NextResponse } from "next/server";
import { MIDA_PROMPT } from "@/lib/midaPrompt";
import { supabase } from "@/lib/supabase";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || "mida";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generarRespuestaIA(mensajeUsuario: string) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
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
    },
  );

  const data = await response.json();

  console.log("STATUS GEMINI:", response.status);
  console.log("RESPUESTA GEMINI:", JSON.stringify(data));

  if (!response.ok) {
    console.error("ERROR GEMINI:", data);

    return "Gracias por escribirnos a MIDA. En este momento estoy teniendo un pequeño problema para responder automáticamente, pero con gusto podemos apoyarte con licencias CONTPAQi®, soporte técnico, equipos de cómputo o servidores. ¿Sobre qué servicio necesitas información?";
  }
  const texto =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Hola 👋 gracias por escribir a MIDA. ¿Sobre qué servicio necesitas información?";

  return texto;
}

function detectarIntencion(mensaje: string) {
  const texto = mensaje.toLowerCase();

  const palabrasSoporte = [
    "error",
    "falla",
    "problema",
    "soporte",
    "ayuda",
    "no funciona",
    "no abre",
    "no factura",
    "no timbra",
    "timbrar",
    "timbrado",
    "no puedo",
  ];

  const palabrasVenta = [
    "cotización",
    "cotizacion",
    "precio",
    "comprar",
    "costo",
    "cuánto cuesta",
    "cuanto cuesta",
    "licencia",
    "renovar",
    "renovación",
    "contratar",
    "adquirir",
  ];

  if (palabrasSoporte.some((p) => texto.includes(p))) {
    return "soporte";
  }

  if (palabrasVenta.some((p) => texto.includes(p))) {
    return "venta";
  }

  return "general";
}

async function enviarMensajeWhatsApp(destino: string, mensaje: string) {
  return await fetch(
    `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: EVOLUTION_API_KEY || "",
      },
      body: JSON.stringify({
        number: destino,
        text: mensaje,
      }),
    },
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

    const respuestaIA = String(
      (await generarRespuestaIA(userMessage)) || "",
    ).trim();

    const intencion = detectarIntencion(userMessage);

    console.log("INTENCION DETECTADA:", intencion);

    const phone = remoteJid.replace("@s.whatsapp.net", "");
    const name = data?.pushName || "Sin nombre";
    const messageId = data?.key?.id || null;

    const { data: contact, error: contactError } = await supabase
      .from("whatsapp_contacts")
      .upsert(
        {
          phone,
          name,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "phone",
        },
      )
      .select()
      .single();

    if (contactError) {
      console.error("ERROR GUARDANDO CONTACTO:", contactError);
    }

    if (contact) {
      await supabase.from("whatsapp_messages").insert([
        {
          contact_id: contact.id,
          phone,
          name,
          message_id: messageId,
          role: "user",
          content: userMessage,
        },
        {
          contact_id: contact.id,
          phone,
          name,
          message_id: null,
          role: "assistant",
          content: respuestaIA,
        },
      ]);
    }

    if (intencion === "venta") {
      const { data: ventas } = await supabase
        .from("advisors")
        .select("*")
        .eq("role", "ventas")
        .eq("active", true)
        .limit(1)
        .single();

      if (ventas) {
        await enviarMensajeWhatsApp(
          ventas.whatsapp,
          `🔔 NUEVA OPORTUNIDAD DE VENTA

Cliente: ${name}
Teléfono: ${phone}

Abrir chat:
https://wa.me/${phone}

Mensaje:
${userMessage}`,
        );

        console.log("ALERTA DE VENTA ENVIADA");
      }
    }

    if (intencion === "soporte") {
      const { data: cliente } = await supabase
        .from("clients")
        .select(
          `
      *,
      advisors(*)
    `,
        )
        .eq("phone", phone)
        .single();

      if (cliente?.advisors) {
        await enviarMensajeWhatsApp(
          cliente.advisors.whatsapp,
          `🛠️ SOLICITUD DE SOPORTE

Cliente: ${name}
Teléfono: ${phone}

Asesor asignado: ${cliente.advisors.name}

Mensaje:
${userMessage}`,
        );

        console.log("ALERTA ENVIADA AL ASESOR");
      } else {
        console.log("CLIENTE SIN ASESOR ASIGNADO");
      }
    }

    console.log("RESPUESTA IA FINAL:", respuestaIA);
    console.log("TIPO RESPUESTA IA:", typeof respuestaIA);
    console.log("NUMERO DESTINO:", remoteJid.replace("@s.whatsapp.net", ""));

    const evolutionResponse = await fetch(
      `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: EVOLUTION_API_KEY || "",
        },
        body: JSON.stringify({
          number: phone,
          text: String(respuestaIA),
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
