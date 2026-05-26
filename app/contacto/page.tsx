"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función que maneja el envío sin depender de las redirecciones de Formspree
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/xnjrojny", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // ¡Aquí ocurre la magia! Redirecciona localmente a tu ruta relativa
        router.push("/gracias");
      } else {
        alert("Hubo un detalle al enviar el mensaje. Por favor, intenta de nuevo o contáctanos por WhatsApp.");
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Error de conexión. Intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-40 pb-12 text-center px-6">
        <h1 className="text-4xl font-bold text-mida-deep">Hablemos de tu Proyecto</h1>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Platícanos qué soluciones o soporte requiere tu empresa y nos pondremos en contacto contigo a la brevedad.
        </p>
      </section>

      <section className="pb-24 flex-grow max-w-md mx-auto px-6 w-full">
        {/* FORMULARIO CONTROLADO POR JS */}
        <form 
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-5"
        >
          <div>
            <label className="block text-sm font-semibold text-mida-deep mb-1">Nombre Completo</label>
            <input 
              name="name" 
              type="text" 
              required 
              placeholder="Ej. Octavio Ortiz" 
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-mida-deep mb-1">Correo Electrónico</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="correo@empresa.com" 
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-mida-deep mb-1">Número de WhatsApp</label>
            <input 
              name="whatsapp" 
              type="tel" 
              required 
              placeholder="Ej. 477 123 4567" 
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-mida-deep mb-1">¿En qué te podemos ayudar?</label>
            <select 
              name="subject" 
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20 text-gray-600"
            >
              <option value="Licenciamiento CONTPAQi">Asesoría / Licenciamiento CONTPAQi</option>
              <option value="Soporte Tecnico / Servidores">Soporte Técnico / Servidores</option>
              <option value="Equipamiento Hardware">Equipamiento de Cómputo</option>
              <option value="Otro">Otro Asunto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-mida-deep mb-1">Mensaje</label>
            <textarea 
              name="message" 
              rows={4} 
              required 
              placeholder="Cuéntanos un poco sobre los requerimientos de tu negocio..." 
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mida-primary bg-mida-gray/20" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-mida-primary text-white py-3.5 rounded-xl font-bold hover:bg-mida-deep transition-all shadow-md mt-2 disabled:bg-gray-400"
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}