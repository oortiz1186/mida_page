"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- Importamos el enrutador nativo
import { infoEmpresa } from "../../components/config/empresa"; 
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactoPage() {
  const router = useRouter(); // <-- Inicializamos el enrutador
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/xnjrojny", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Redirección limpia a la página de éxito en lugar de un alert rígido
        router.push("/gracias");
      } else {
        alert("Hubo un detalle al enviar tu solicitud. Por favor, intenta de nuevo o chatea directamente con nosotros por WhatsApp.");
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Error de conexión a la red. Por favor, verifica tu conexión e intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />
      
      {/* SECCIÓN DE ENCABEZADO */}
      <section className="pt-40 pb-12 text-center px-6">
        <span className="inline-block text-mida-primary font-bold text-xs uppercase tracking-widest bg-mida-primary/10 px-4 py-1.5 rounded-full mb-3">
          Contacto Comercial
        </span>
        <h1 className="text-4xl font-black text-mida-deep tracking-tight">Hablemos de tu Proyecto</h1>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Escríbenos para agendar una sesión de diagnóstico técnico o cotizar tus renovaciones y licencias de software.
        </p>
      </section>

      {/* SECCIÓN DEL FORMULARIO CORPORATIVO */}
      <section className="pb-24 flex-grow max-w-2xl mx-auto px-6 w-full">
        <form 
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-6"
        >
          {/* Fila 1: Datos Personales e Institucionales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">
                Nombre Completo
              </label>
              <input 
                name="name" 
                type="text" 
                required 
                placeholder="Ej. Octavio Ortiz" 
                className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:bg-white transition-colors bg-mida-gray/30 text-mida-deep" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">
                Empresa / Razón Social
              </label>
              <input 
                name="company" 
                type="text" 
                required
                placeholder="Nombre de tu empresa o negocio" 
                className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:bg-white transition-colors bg-mida-gray/30 text-mida-deep" 
              />
            </div>
          </div>

          {/* Fila 2: Canales de Respuesta Directa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">
                Correo Corporativo
              </label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="correo@tuempresa.com" 
                className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:bg-white transition-colors bg-mida-gray/30 text-mida-deep" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">
                WhatsApp de Contacto
              </label>
              <input 
                name="whatsapp" 
                type="tel" 
                required 
                placeholder="Ej. 477 123 4567" 
                className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:bg-white transition-colors bg-mida-gray/30 text-mida-deep" 
              />
            </div>
          </div>

          {/* Fila 3: Menú de Calificación Comercial */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">
              ¿Qué solución requiere tu negocio?
            </label>
            <select 
              name="service_required" 
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:bg-white transition-colors bg-mida-gray/30 text-gray-600 font-medium"
            >
              <option value="Renovación / Venta CONTPAQi">Renovación o Compra de Licencias CONTPAQi</option>
              <option value="Soporte Técnico CONTPAQi">Soporte Técnico y Errores de Sistemas</option>
              <option value="Servidores y Bases de Datos SQL">Configuración de Servidores y SQL</option>
              <option value="Optimización de Computadoras">Optimización e Infraestructura de Hardware Administrativo</option>
            </select>
          </div>

          {/* Fila 4: Campo de Texto de Requerimientos */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">
              Mensaje o Escenario Actual
            </label>
            <textarea 
              name="message" 
              rows={4} 
              required 
              placeholder="Cuéntanos brevemente sobre el escenario o problemática técnica que presenta tu empresa actualmente para asignarte al consultor adecuado..." 
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:bg-white transition-colors bg-mida-gray/30 text-mida-deep leading-relaxed" 
            />
          </div>

          {/* Botón de envío interactivo */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-mida-primary text-white py-4 rounded-xl font-bold hover:bg-mida-deep transition-all shadow-md mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
          >
            {isSubmitting ? "Enviando Requerimientos..." : "Enviar Mensaje Corporativo"}
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}