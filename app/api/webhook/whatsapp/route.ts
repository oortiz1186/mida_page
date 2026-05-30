import { NextResponse } from "next/server";
import { MIDA_PROMPT } from "@/lib/midaPrompt";
import { supabase } from "@/lib/supabase";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || "mida";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const WHATSAPP_GRUPO_ASESORES = process.env.WHATSAPP_GRUPO_ASESORES;

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

  const esVenta = palabrasVenta.some((p) => texto.includes(p));
  const esSoporte = palabrasSoporte.some((p) => texto.includes(p));

  if (esVenta && esSoporte) {
    return "mixta";
  }

  if (esVenta) {
    return "venta";
  }

  if (esSoporte) {
    return "soporte";
  }

  return "general";
}

function mensajeTieneDetalleSoporte(mensaje: string) {
  const texto = mensaje.toLowerCase().trim();

  const mensajesGenericos = [
    "hola",
    "buen dia",
    "buen día",
    "buenas",
    "buenas tardes",
    "buenas noches",
    "buenos dias",
    "buenos días",
    "que tal",
    "qué tal",
    "soporte",
    "ayuda",
    "necesito soporte",
    "necesito ayuda",
  ];

  return !mensajesGenericos.includes(texto) && texto.length >= 8;
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

    //const respuestaIA = String(await generarRespuestaIA(userMessage)).trim();

    const intencion = detectarIntencion(userMessage);
    const textoNormalizado = userMessage.toLowerCase().trim();

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
      .maybeSingle();

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
          intent: intencion,
        },
      ]);
    }

    if (contact?.support_flow_step === "pedir_detalle_mixto") {
      const mensajeCompleto = `${contact.support_original_message || ""}

Detalle del cliente:
${userMessage}`;

      const { data: ventas } = await supabase
        .from("advisors")
        .select("*")
        .eq("role", "ventas")
        .eq("active", true)
        .limit(1)
        .maybeSingle();

      if (ventas) {
        await enviarMensajeWhatsApp(
          ventas.whatsapp,
          `🔔 NUEVA OPORTUNIDAD DE VENTA

Cliente: ${name}
Teléfono: ${phone}

Abrir chat:
https://wa.me/${phone}

Mensaje:
${mensajeCompleto}`,
        );
      }

      const { data: cliente } = await supabase
        .from("clients")
        .select(
          `
      *,
      advisors(*)
    `,
        )
        .eq("phone", phone)
        .maybeSingle();

      if (cliente?.advisors) {
        await enviarMensajeWhatsApp(
          cliente.advisors.whatsapp,
          `🛠️ SOLICITUD DE SOPORTE

Cliente: ${name}
Teléfono: ${phone}

Abrir chat:
https://wa.me/${phone}

Asesor asignado: ${cliente.advisors.name}

Mensaje:
${mensajeCompleto}`,
        );
      } else if (WHATSAPP_GRUPO_ASESORES) {
        await enviarMensajeWhatsApp(
          WHATSAPP_GRUPO_ASESORES,
          `🟡 NUEVO USUARIO EN COLA DE SOPORTE

Cliente: ${name}
Teléfono: ${phone}

Chat directo:
https://wa.me/${phone}

Mensaje:
${mensajeCompleto}`,
        );
      }

      await supabase
        .from("whatsapp_contacts")
        .update({
          support_flow_step: null,
          temp_intent: null,
          support_original_message: null,
        })
        .eq("phone", phone);

      await enviarMensajeWhatsApp(
        phone,
        "Gracias. Ya canalizamos tu solicitud con el área correspondiente. Un asesor te contactará en breve.",
      );

      return NextResponse.json({
        success: true,
        flujo: "mixto_canalizado",
      });
    }

    if (contact?.support_flow_step === "pedir_descripcion_soporte_registrado") {
      const { data: cliente } = await supabase
        .from("clients")
        .select(
          `
        *,
        advisors(*)
        `,
        )
        .eq("phone", phone)
        .maybeSingle();

      if (cliente?.advisors) {
        await enviarMensajeWhatsApp(
          cliente.advisors.whatsapp,
          `🛠️ SOLICITUD DE SOPORTE

    Cliente: ${name}
    Teléfono: ${phone}

    Abrir chat:
    https://wa.me/${phone}

    Asesor asignado: ${cliente.advisors.name}

    Mensaje original:
    ${userMessage}`,
        );

        await supabase
          .from("whatsapp_contacts")
          .update({
            support_flow_step: null,
            temp_intent: null,
            support_original_message: null,
          })
          .eq("phone", phone);

        await enviarMensajeWhatsApp(
          phone,
          `Gracias. Ya notificamos a ${cliente.advisors.name}. Te contactará para apoyarte.`,
        );

        return NextResponse.json({
          success: true,
          flujo: "asesor_registrado_notificado",
        });
      }
    }

    if (contact?.support_flow_step === "pedir_descripcion_soporte") {
      await supabase
        .from("whatsapp_contacts")
        .update({
          support_flow_step: "preguntar_asesor",
          temp_intent: "soporte",
          support_original_message: userMessage,
        })
        .eq("phone", phone);

      await enviarMensajeWhatsApp(
        phone,
        "Gracias. ¿Ya cuentas con un asesor asignado en MIDA? Responde Sí o No.",
      );

      return NextResponse.json({
        success: true,
        flujo: "preguntar_asesor",
      });
    }

    if (contact?.support_flow_step === "preguntar_asesor") {
      if (
        textoNormalizado.includes("si") ||
        textoNormalizado.includes("sí") ||
        textoNormalizado.includes("tengo")
      ) {
        await supabase
          .from("whatsapp_contacts")
          .update({
            support_flow_step: "pedir_nombre_asesor",
            temp_intent: "soporte",
          })
          .eq("phone", phone);

        await enviarMensajeWhatsApp(
          phone,
          "Perfecto. Por favor indícame el nombre de tu asesor asignado en MIDA.",
        );

        return NextResponse.json({
          success: true,
          flujo: "pedir_nombre_asesor",
        });
      }

      if (
        textoNormalizado.includes("no") ||
        textoNormalizado.includes("ninguno")
      ) {
        if (WHATSAPP_GRUPO_ASESORES) {
          await enviarMensajeWhatsApp(
            WHATSAPP_GRUPO_ASESORES,
            `🟡 NUEVO USUARIO EN COLA DE SOPORTE

    Cliente: ${name}
    Teléfono: ${phone}

    Chat directo con cliente:
    https://api.whatsapp.com/send?phone=${phone}

    El cliente indicó que no tiene asesor asignado.

    Mensaje original:
    ${contact.support_original_message || userMessage}`,
          );
        }

        await supabase
          .from("whatsapp_contacts")
          .update({
            support_flow_step: null,
            temp_intent: null,
            support_original_message: null,
          })
          .eq("phone", phone);

        await enviarMensajeWhatsApp(
          phone,
          "Gracias. Ya notificamos al equipo de soporte. Un asesor te contactará en breve.",
        );

        return NextResponse.json({ success: true, flujo: "enviado_a_grupo" });
      }

      await enviarMensajeWhatsApp(
        phone,
        "Para canalizarte correctamente, dime por favor: ¿ya tienes un asesor asignado en MIDA? Responde Sí o No.",
      );

      return NextResponse.json({ success: true, flujo: "esperando_si_no" });
    }

    if (contact?.support_flow_step === "pedir_nombre_asesor") {
      const { data: asesor } = await supabase
        .from("advisors")
        .select("*")
        .ilike("name", `%${userMessage}%`)
        .eq("active", true)
        .limit(1)
        .maybeSingle();

      if (asesor) {
        await supabase.from("clients").upsert(
          {
            phone,
            name,
            advisor_id: asesor.id,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "phone",
          },
        );
        await enviarMensajeWhatsApp(
          asesor.whatsapp,
          `🛠️ SOLICITUD DE SOPORTE

    Cliente: ${name}
    Teléfono: ${phone}

    Abrir chat:
    https://wa.me/${phone}

    El cliente indicó que su asesor es: ${asesor.name}

    Mensaje original:
    ${contact.support_original_message || userMessage}`,
        );

        await supabase
          .from("whatsapp_contacts")
          .update({
            support_flow_step: null,
            temp_intent: null,
            support_original_message: null,
          })
          .eq("phone", phone);

        await enviarMensajeWhatsApp(
          phone,
          `Gracias. Ya notificamos a ${asesor.name}. Te contactará para apoyarte.`,
        );

        return NextResponse.json({ success: true, flujo: "asesor_notificado" });
      }

      await enviarMensajeWhatsApp(
        phone,
        "No pude identificar a ese asesor. ¿Podrías escribir solo su nombre? Por ejemplo: Dulce, Juan, etc.",
      );

      return NextResponse.json({
        success: true,
        flujo: "asesor_no_encontrado",
      });
    }

    if (intencion === "mixta") {
      await supabase
        .from("whatsapp_contacts")
        .update({
          support_flow_step: "pedir_detalle_mixto",
          temp_intent: "mixta",
          support_original_message: userMessage,
        })
        .eq("phone", phone);

      await enviarMensajeWhatsApp(
        phone,
        "Veo que necesitas información de una licencia y también apoyo técnico. Para ayudarte mejor, indícame qué licencia te interesa y cuál es el problema que estás presentando.",
      );

      return NextResponse.json({
        success: true,
        flujo: "pedir_detalle_mixto",
      });
    }

    if (intencion === "venta") {
      const { data: ventas } = await supabase
        .from("advisors")
        .select("*")
        .eq("role", "ventas")
        .eq("active", true)
        .limit(1)
        .maybeSingle();

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
        .maybeSingle();

      if (cliente?.advisors) {
        if (!mensajeTieneDetalleSoporte(userMessage)) {
          await supabase
            .from("whatsapp_contacts")
            .update({
              support_flow_step: "pedir_descripcion_soporte_registrado",
              temp_intent: "soporte",
            })
            .eq("phone", phone);

          await enviarMensajeWhatsApp(
            phone,
            "Claro, con gusto te apoyamos. Cuéntame brevemente qué problema tienes o en qué sistema necesitas ayuda.",
          );

          return NextResponse.json({
            success: true,
            flujo: "pedir_descripcion_soporte_registrado",
          });
        }
        await enviarMensajeWhatsApp(
          cliente.advisors.whatsapp,
          `🛠️ SOLICITUD DE SOPORTE

    Cliente: ${name}
    Teléfono: ${phone}

    Abrir chat:
    https://wa.me/${phone}

    Asesor asignado: ${cliente.advisors.name}

    Mensaje original:
    ${userMessage}`,
        );

        console.log("ALERTA ENVIADA AL ASESOR");
      } else {
        if (!mensajeTieneDetalleSoporte(userMessage)) {
          await supabase
            .from("whatsapp_contacts")
            .update({
              support_flow_step: "pedir_descripcion_soporte",
              temp_intent: "soporte",
            })
            .eq("phone", phone);

          await enviarMensajeWhatsApp(
            phone,
            "Claro, con gusto te apoyamos. Cuéntame brevemente qué problema tienes o en qué sistema necesitas ayuda.",
          );

          return NextResponse.json({
            success: true,
            flujo: "pedir_descripcion_soporte",
          });
        }

        await supabase
          .from("whatsapp_contacts")
          .update({
            support_flow_step: "preguntar_asesor",
            temp_intent: "soporte",
            support_original_message: userMessage,
          })
          .eq("phone", phone);

        await enviarMensajeWhatsApp(
          phone,
          "Con gusto te apoyamos. ¿Ya cuentas con un asesor asignado en MIDA? Responde Sí o No.",
        );

        return NextResponse.json({
          success: true,
          flujo: "preguntar_asesor",
        });
      }
    }

    const respuestaIA = String(await generarRespuestaIA(userMessage)).trim();

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

    if (contact) {
      await supabase.from("whatsapp_messages").insert([
        {
          contact_id: contact.id,
          phone,
          name,
          message_id: null,
          role: "assistant",
          content: respuestaIA,
          intent: intencion,
        },
      ]);
    }

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
