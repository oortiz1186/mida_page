import { NextResponse } from "next/server";
import { MIDA_PROMPT } from "@/lib/midaPrompt";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "El asistente no está configurado correctamente." },
        { status: 500 },
      );
    }

    const body = await req.json();
    const messages: ChatMessage[] = Array.isArray(body?.messages)
      ? body.messages
          .filter(
            (message: ChatMessage) =>
              message &&
              (message.role === "user" || message.role === "assistant") &&
              typeof message.content === "string" &&
              message.content.trim(),
          )
          .slice(-12)
      : [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "Escribe un mensaje para iniciar la conversación." },
        { status: 400 },
      );
    }

    const contents = messages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content.trim() }],
    }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: `${MIDA_PROMPT}\n\nCANAL WEB\nEstás atendiendo al usuario dentro del chat de mida.mx. No le indiques que abra WhatsApp salvo que pida hablar con una persona. Mantén respuestas breves y útiles.`,
              },
            ],
          },
          contents,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("ERROR CHAT GEMINI:", data);
      return NextResponse.json(
        {
          reply:
            "Gracias por escribirnos. En este momento no pude generar una respuesta automática. Puedes intentar nuevamente en unos momentos.",
        },
        { status: 502 },
      );
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Hola 👋 ¿En qué podemos ayudarte hoy?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("ERROR API CHAT:", error);
    return NextResponse.json(
      { error: "No se pudo procesar el mensaje." },
      { status: 500 },
    );
  }
}
