"use client";

import Image from "next/image";

export default function TicketsEnDesarrollo() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Logo de MIDA en lugar del cuadrado */}
        <div className="relative w-48 h-auto mx-auto mb-10">
          <Image 
            src="/logo/Logotipo-mida-azul.svg" 
            alt="MIDA Tech Consulting" 
            width={200} 
            height={60}
            className="mx-auto"
            priority
          />
        </div>

        {/* Contenedor Visual con un ícono más sutil */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-mida-primary/10 rounded-2xl blur-lg" />
          <div className="relative w-full h-full bg-mida-gray/20 rounded-2xl flex items-center justify-center border border-mida-gray">
            <svg className="w-10 h-10 text-mida-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
        </div>

        {/* Texto con jerarquía */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-mida-deep">Centro de Atención</h1>
          <p className="text-gray-500 leading-relaxed">
            Estamos integrando un portal inteligente para gestionar tus solicitudes. 
            Mientras tanto, nuestro equipo sigue a tu disposición vía WhatsApp.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4 pt-4">
          <a 
            href="/" 
            className="block w-full bg-mida-deep text-white py-4 rounded-xl font-bold hover:bg-mida-primary transition-all shadow-md"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </main>
  );
}