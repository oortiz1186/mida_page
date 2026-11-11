import "server-only";
import { searchKnowledge } from "@/lib/knowledge-search";

const BASIC_RESPONSES: Array<{ terms: string[]; reply: string }> = [
  { terms: ["contabilidad"], reply: "CONTPAQi Contabilidad es un sistema para registrar y administrar la información contable de una empresa. MIDA ofrece asesoría, licencias, implementación, capacitación y soporte para este sistema." },
  { terms: ["nominas", "nomina"], reply: "CONTPAQi Nóminas ayuda a administrar el cálculo y control de la nómina. MIDA ofrece licencias, implementación, capacitación y soporte." },
  { terms: ["bancos"], reply: "CONTPAQi Bancos ayuda a administrar movimientos bancarios y conciliaciones. MIDA puede apoyarte con licencias, implementación y soporte." },
  { terms: ["factura electronica", "facturacion electronica"], reply: "CONTPAQi Factura Electrónica es una solución para emitir y administrar comprobantes fiscales digitales. MIDA ofrece asesoría, licencias y soporte." },
  { terms: ["comercial premium"], reply: "CONTPAQi Comercial Premium es una solución de gestión comercial. MIDA puede apoyarte con licencias, configuración, capacitación y soporte." },
  { terms: ["servidor", "servidores", "infraestructura", "redes"], reply: "MIDA ofrece instalación y configuración de servidores, redes empresariales, respaldos y consultoría de infraestructura tecnológica." },
  { terms: ["computadora", "computadoras", "laptop", "equipo de computo"], reply: "MIDA ofrece equipos de cómputo, instalación, configuración, mantenimiento y actualización de hardware." },
];

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Respuesta determinista cuando Gemini no está disponible. Nunca ejecuta acciones comerciales. */
export async function buildChatFallback(question: string): Promise<string> {
  const normalized = normalize(question);
  const basic = BASIC_RESPONSES.find(item => item.terms.some(term => normalized.includes(term)));
  const intro = basic?.reply ?? "Puedo orientarte sobre los servicios de MIDA, incluyendo sistemas CONTPAQi, soporte técnico, equipos de cómputo e infraestructura.";

  try {
    // Los artículos son sugerencias de lectura, no respuestas generadas ni instrucciones.
    if (process.env.MIDA_KNOWLEDGE_ENABLED === "true") {
      const articles = await searchKnowledge(question, 3);
      const links = articles
        .filter(article => typeof article.slug === "string" && /^[a-z0-9-]+$/i.test(article.slug))
        .slice(0, 2)
        .map(article => `• ${article.title.replace(/[\r\n]/g, " ").slice(0, 100)}: https://mida.mx/blog/${article.slug}`);
      if (links.length) {
        return `${intro}\n\nArtículos relacionados de MIDA:\n${links.join("\n")}\n\nSi necesitas información específica, puedo ayudarte a solicitar atención de un asesor.`;
      }
    }
  } catch (error) {
    console.error("ERROR RESPALDO CONOCIMIENTOS MIDA:", error instanceof Error ? error.name : "desconocido");
  }
  return `${intro}\n\nEn este momento las respuestas automáticas están limitadas. Para precios, versiones, promociones o detalles específicos, solicita atención de ventas o soporte aquí mismo.`;
}
