"use client";

import { useTransition } from "react";
import { infoEmpresa } from "../../components/config/empresa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function GraciasPage() {
  const [, startTransition] = useTransition();

  // Estructura dinámica de la API de WhatsApp usando tus variables centrales
  const urlWhatsApp = `https://wa.me/${infoEmpresa.whatsappNumero}?text=${encodeURIComponent(infoEmpresa.whatsappMensajePredeterminado)}`;

  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-grow flex items-center justify-center pt-44 pb-24 px-6">
        <div className="max-w-xl w-full bg-white p-10 md:p-12 rounded-3xl shadow-sm border border-gray-100 text-center space-y-6 relative overflow-hidden">
          
          {/* Círculo con palomita optimizada */}
          <div className="w-16 h-16 bg-mida-primary/10 text-mida-primary rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-mida-deep tracking-tight">
              ¡Solicitud Recibida!
            </h1>
            <p className="text-mida-primary font-bold text-xs uppercase tracking-widest">
              Tu infraestructura en manos expertas
            </p>
          </div>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Agradecemos tu interés en las soluciones tecnológicas de <strong>{infoEmpresa.legal}</strong>. Un consultor certificado analizará tu escenario operativo y se comunicará contigo en un lapso no mayor a 2 horas hábiles.
          </p>

          {/* Bloque de botones interactivos de salida y conversión rápida */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => startTransition(() => { window.location.href = "/"; })}
              className="w-full sm:w-auto bg-mida-deep text-white font-bold px-8 py-3.5 rounded-xl hover:bg-mida-primary transition-all text-sm uppercase tracking-wider text-center"
            >
              Volver al Inicio
            </button>
            <a 
              href={urlWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-gray-200 text-mida-deep bg-mida-gray/20 font-bold px-8 py-3.5 rounded-xl hover:bg-mida-gray/50 transition-all text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              Atención Urgente por WhatsApp
            </a>
          </div>

          {/* Detalle decorativo sutil de fondo */}
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-mida-primary/5 rounded-full blur-xl pointer-events-none" />
        </div>
      </section>

      <Footer />
    </main>
  );
}