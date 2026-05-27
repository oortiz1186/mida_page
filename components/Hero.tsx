"use client";

import Image from "next/image";
import { infoEmpresa } from "../components/config/empresa";

export default function Hero() {
  const urlWhatsApp = `https://wa.me/${infoEmpresa.whatsappNumero}?text=${encodeURIComponent(infoEmpresa.whatsappMensajePredeterminado)}`;

  return (
    <section className="relative min-h-screen flex items-center bg-mida-deep text-white pt-28 overflow-hidden w-full">
      
      {/* 1. CONTENEDOR DE LA IMAGEN CON OPACIDAD ROBUSTA (80%) */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-80 md:opacity-85 pointer-events-none">
        <Image
          src="/images/oficina.png"
          alt="Infraestructura Tecnológica MIDA"
          fill
          priority
          className="object-cover object-center md:object-right" 
        />
        
        {/* DEGRADADO QUIRÚRGICO DE CONTROL:
          - from-mida-deep (0% a 40%): Es azul sólido a la izquierda para tapar la foto donde hay letras.
          - via-mida-deep/80 (al 60%): Transiciona de forma controlada en la zona media.
          - to-mida-deep/10 (al final): Libera la imagen a la derecha casi al 100% para que luzca reluciente.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-mida-deep from-40% via-mida-deep/80 via-60% to-mida-deep/10" />
        
        {/* Sutil desvanecimiento inferior para fusionar con la siguiente sección */}
        <div className="absolute inset-0 bg-gradient-to-t from-mida-deep via-transparent to-transparent opacity-50" />
      </div>

      {/* 2. CONTENIDO EN CUADRÍCULA */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* El texto se queda protegido en sus 7 columnas de la izquierda */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <span className="inline-flex items-center text-mida-light font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
              Consultoría TI & Soporte Certificado
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none drop-shadow-sm">
              Garantizamos la <span className="text-mida-light">continuidad</span> y potencia digital de tu empresa
            </h1>
            
            <p className="text-mida-gray/90 text-base md:text-lg max-w-2xl leading-relaxed drop-shadow-sm">
              Especialistas en instalación de sistemas CONTPAQi, optimización de servidores dedicados, bases de datos SQL de alta velocidad y pólizas de soporte técnico administrado en León, Gto.
            </p>

            {/* Botones de acción rápida */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a 
                href="/contacto" 
                className="w-full sm:w-auto bg-mida-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-mida-deep transition-all shadow-lg text-sm uppercase tracking-wider text-center"
              >
                Cotizar Solución TI
              </a>
              <a 
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-sm uppercase tracking-wider text-center"
              >
                Atención por WhatsApp
              </a>
            </div>
          </div>

          {/* Columna derecha libre para que la foto destaque al máximo */}
          <div className="hidden lg:block lg:col-span-5" />

        </div>
      </div>

      {/* Trama digital */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />
    </section>
  );
}