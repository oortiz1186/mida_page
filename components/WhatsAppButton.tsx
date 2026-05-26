"use client";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      
      {/* Etiqueta de texto (Aparece elegante a la izquierda de la burbuja) */}
      <a
        href="https://wa.me/524771234567?text=Hola%20MIDA,%20solicito%20asesor%C3%ADa%20sobre%20sistemas%20CONTPAQi%20o%20soporte%20t%C3%A9cnico%20para%20mi%20empresa."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-mida-deep text-xs font-bold px-4 py-2.5 rounded-l-full shadow-lg border border-gray-100 -mr-4 pr-6 transition-all duration-300 hover:text-mida-primary"
      >
        ¿Necesitas ayuda? Chatea con nosotros
      </a>

      {/* Burbuja Verde con el Icono Oficial */}
      <a
        href="https://wa.me/524771234567?text=Hola%20MIDA,%20solicito%20asesor%C3%ADa%20sobre%20sistemas%20CONTPAQi%20o%20soporte%20t%C3%A9cnico%20para%20mi%20empresa."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center relative z-10"
        aria-label="Chat de WhatsApp"
      >
        <svg 
          className="w-6 h-6 fill-current" 
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.948.01c3.179.001 6.165 1.24 8.413 3.494 2.24 2.246 3.472 5.232 3.47 8.412-.004 6.598-5.342 11.937-11.892 11.937-2.015-.001-4.004-.51-5.806-1.482L0 24zm6.59-4.846c1.66.986 3.298 1.448 4.799 1.45 5.382 0 9.75-4.331 9.753-9.642.001-2.573-1.002-4.99-2.83-6.816-1.83-1.826-4.254-2.83-6.82-2.83-5.382 0-9.75 4.331-9.753 9.642-.001 2.025.533 4.003 1.548 5.725l-.101.163-1.01 3.693 3.773-.99.162.096z" />
        </svg>
      </a>

    </div>
  );
}