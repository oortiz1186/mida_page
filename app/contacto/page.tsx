"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactoPage() {
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
        {/* FORMULARIO CONECTADO A FORMSPREE */}
        <form 
          action="https://formspree.io/f/xnjrojny" 
          method="POST"
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-5"
        >
          {/* CONFIGURACIÓN FLEXIBLE: Funciona en local, Vercel y dominio final */}
          <input type="hidden" name="_next" value="/gracias" />
          
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
            className="bg-mida-primary text-white py-3.5 rounded-xl font-bold hover:bg-mida-deep transition-all shadow-md mt-2"
          >
            Enviar Mensaje
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}