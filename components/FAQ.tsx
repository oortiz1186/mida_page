"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "¿Cuánto tiempo tarda en activarse una renovación de CONTPAQi?",
      a: "El proceso regular de timbrado y liberación de licenciamiento toma entre 24 y 48 horas hábiles una vez confirmado el requerimiento, asegurando que no pierdas continuidad en tu facturación o nómina."
    },
    {
      q: "¿Ofrecen pólizas de soporte mensual o atención por evento técnico?",
      a: "Contamos con ambas modalidades. Ofrecemos pólizas mensuales diseñadas para empresas que requieren mantenimiento preventivo constante en sus servidores SQL, así como atención inmediata por evento para resolver incidencias críticas de sistemas."
    },
    {
      q: "¿El diagnóstico de infraestructura para servidores tiene costo?",
      a: "El primer diagnóstico virtual o levantamiento inicial de requerimientos de hardware no tiene costo. Evaluamos tus arreglos RAID, almacenamiento y capacidades actuales para entregarte una propuesta técnica a la medida."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mida-deep">Preguntas Frecuentes</h2>
          <p className="text-gray-600 mt-2 text-sm">Todo lo que necesitas saber sobre nuestras soluciones y esquemas de soporte.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border border-gray-100 rounded-2xl bg-mida-gray/30 overflow-hidden transition-all">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left font-bold text-mida-deep flex justify-between items-center gap-4 hover:bg-mida-gray/50 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    ↓
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 border-t border-gray-100 p-6 bg-white text-gray-600" : "max-h-0 opacity-0 pointer-events-none"}`}>
                  <p className="text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}