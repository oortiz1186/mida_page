"use client";

import { useState } from "react";
import { infoEmpresa } from "../../components/config/empresa"; // Ajusta la ruta según tus carpetas
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      // Usamos tu ID de Formspree o endpoint de envío
      const response = await fetch("https://formspree.io/f/xnjrojny", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert("¡Solicitud enviada con éxito! Un consultor de MIDA se pondrá en contacto pronto.");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Hubo un detalle al enviar. Intenta de nuevo o dale clic al botón de WhatsApp.");
      }
    } catch (error) {
      alert("Error de red. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-40 pb-12 text-center px-6">
        <span className="inline-block text-mida-primary font-bold text-xs uppercase tracking-widest bg-mida-primary/10 px-4 py-1.5 rounded-full mb-3">
          Contacto Comercial
        </span>
        <h1 className="text-4xl font-black text-mida-deep tracking-tight">Hablemos de tu Proyecto</h1>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Escríbenos para agendar una sesión de diagnóstico técnico o cotizar tus licencias de software.
        </p>
      </section>

      <section className="pb-24 flex-grow max-w-xl mx-auto px-6 w-full">
        <form 
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-mida-deep mb-1">Nombre Completo</label>
              <input name="name" type="text" required placeholder="Ej. Octavio Ortiz" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-mida-deep mb-1">Empresa / Razón Social</label>
              <input name="company" type="text" placeholder="Nombre de tu empresa" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-mida-deep mb-1">Correo Corporativo</label>
              <input name="email" type="email" required placeholder="correo@empresa.com" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-mida-deep mb-1">WhatsApp de Contacto</label>
              <input name="whatsapp" type="tel" required placeholder="Ej. 477 123 4567" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-mida-deep mb-1">¿Qué solución requiere tu negocio?</label>
            <select name="service_required" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20 text-gray-600">
              <option value="Renovación / Venta CONTPAQi">Renovación o Compra de Licencias CONTPAQi</option>
              <option value="Soporte Técnico CONTPAQi">Soporte Técnico y Errores de Sistemas</option>
              <option value="Servidores y Bases de Datos SQL">Configuración de Servidores y SQL (Dell PowerEdge)</option>
              <option value="Optimización de Computadoras">Optimización de Hardware Administrativo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-mida-deep mb-1">Mensaje o Escenario Actual</label>
            <textarea name="message" rows={4} required placeholder="Cuéntanos un poco sobre los sistemas o hardware que usa tu empresa actualmente..." className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20" />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-mida-primary text-white py-3.5 rounded-xl font-bold hover:bg-mida-deep transition-all shadow-md mt-2 disabled:bg-gray-400"
          >
            {isSubmitting ? "Enviando Solicitud..." : "Enviar Mensaje Corporativo"}
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}