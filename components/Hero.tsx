"use client";

import Image from "next/image";
import { infoEmpresa } from "../components/config/empresa";

export default function Hero() {
  const urlWhatsApp = `https://wa.me/${infoEmpresa.whatsappNumero}?text=${encodeURIComponent(infoEmpresa.whatsappMensajePredeterminado)}`;

  return (
    <section className="relative min-h-screen flex items-center bg-mida-deep text-white pt-28 overflow-hidden w-full">
      
      {/* 1. CONTENEDOR DE LA IMAGEN DE FONDO */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-80 md:opacity-85 pointer-events-none">
        <Image
          src="/images/oficina.png"
          alt="Infraestructura Tecnológica MIDA"
          fill
          priority
          className="object-cover object-center md:object-right" 
        />
        
        {/* CORRECCIÓN MÓVIL CRÍTICA: 
          - En móviles (bg-gradient-to-t) metemos un escudo oscuro desde abajo que se vuelve sólido arriba para rescatar las letras.
          - En pantallas grandes (lg:bg-gradient-to-r) se activa tu degradado horizontal de paradas controladas.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-mida-deep via-mida-deep/90 to-mida-deep/70 lg:bg-gradient-to-r lg:from-mida-deep lg:from-40% lg:via-mida-deep/80 lg:via-60% lg:to-mida-deep/10" />
      </div>

      {/* 2. CONTENIDO EN CUADRÍCULA CON RESPONSIVIDAD MEJORADA */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* El contenedor de textos ahora incluye un sutil text-shadow nativo de CSS para contrastar al 100% */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 select-none">
            
            <span className="inline-flex items-center text-mida-light font-bold text-[10px] sm:text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
              Consultoría TI & Soporte Certificado
            </span>
            
            {/* Al usar leading-tight evitamos que las letras grandes se encimen en móviles */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight lg:leading-none">
              Garantizamos la <span className="text-mida-light">continuidad</span> y potencia digital de tu empresa
            </h1>
            
            <p className="text-mida-gray/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              Especialistas en instalación de sistemas CONTPAQi, optimización de servidores dedicados, bases de datos SQL de alta velocidad y pólizas de soporte técnico administrado en León, Gto.
            </p>

            {/* Botones de acción rápida adaptados para no desbordarse en pantallas chicas */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a 
                href="/contacto" 
                className="w-full sm:w-auto bg-mida-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-mida-deep transition-all shadow-lg text-xs sm:text-sm uppercase tracking-wider text-center"
              >
                Cotizar Solución TI
              </a>
              <a 
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-xs sm:text-sm uppercase tracking-wider text-center"
              >
                Atención por WhatsApp
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5" />

        </div>
      </div>

      {/* Trama digital */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />
    </section>
  );
}