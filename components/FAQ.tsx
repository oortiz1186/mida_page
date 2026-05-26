"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "¿Cuánto tiempo tarda en activarse una renovación de CONTPAQi?",
      a: "El proceso regular de timbrado y liberación de licenciamiento toma entre 24 y 48 horas hábiles una vez confirmado el requerimiento, asegurando que las empresas en León y la región del Bajío no pierdan continuidad en su facturación o administración de nómina."
    },
    {
      q: "¿Ofrecen pólizas de soporte mensual o atención por evento técnico?",
      a: "Contamos con ambas modalidades. Ofrecemos pólizas mensuales diseñadas para negocios que requieren mantenimiento preventivo constante en sus servidores SQL dedicados, así como visitas técnicas presenciales en León, Gto., o asistencia remota inmediata ante incidencias críticas."
    },
    {
      q: "¿El diagnóstico de infraestructura para servidores tiene costo?",
      a: "El primer diagnóstico virtual o levantamiento inicial de requerimientos de hardware no tiene costo. Evaluamos tus arreglos RAID, almacenamiento corporativo y capacidades actuales de red para entregarte una propuesta técnica a la medida de tu operación."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-mida-deep tracking-tight">Preguntas Frecuentes</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">Todo lo que necesitas saber sobre nuestras soluciones y esquemas de soporte tecnológico.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border border-gray-100 rounded-2xl bg-mida-gray/30 overflow-hidden transition-all duration-300">
                
                {/* Botón de la Pregunta */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left font-bold text-mida-deep flex justify-between items-center gap-4 hover:bg-mida-gray/50 transition-colors focus:outline-none"
                >
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <span className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-180 text-mida-primary" : ""}`}>
                    ↓
                  </span>
                </button>

                {/* Contenedor de la Respuesta Corregido */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen 
                      ? "max-h-[500px] opacity-100 border-t border-gray-100 p-6 bg-white" 
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}