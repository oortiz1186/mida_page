"use client";

import { useState, useTransition } from "react";
import { infoEmpresa } from "../../components/config/empresa"; // <-- Centralización homologada
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      // Consumimos el dominio o una cadena directa para el endpoint de Formspree de forma segura
      const response = await fetch("https://formspree.io/f/xnjrojny", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        startTransition(() => {
          window.location.href = "/gracias";
        });
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

      {/* ENCABEZADO PRINCIPAL */}
      <section className="pt-40 pb-12 bg-mida-deep text-white px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-left relative z-10 space-y-3">
          <span className="inline-block text-mida-light font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            Atención Corporativa
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Inicia tu proyecto con <span className="text-mida-light">MIDA</span>
          </h1>
          <p className="text-mida-gray/70 text-sm md:text-base max-w-2xl leading-relaxed">
            Ponte en contacto con nuestros asesores comerciales y técnicos. Evaluamos tus necesidades operativas de inmediato.
          </p>
        </div>
      </section>

      {/* SECCIÓN DOS COLUMNAS: FORMULARIO + DATOS DE EMPRESA */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full flex-grow grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* COLUMNA IZQUIERDA Y CENTRAL: EL FORMULARIO */}
        <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-mida-deep">Formulario de Requerimientos Técnicos</h2>
            <p className="text-gray-500 text-xs mt-1">Campos obligatorios para asignación directa de consultor técnico.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">Nombre Completo</label>
                <input 
                  type="text" name="name" required placeholder="Ej. Octavio Ortiz" 
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:ring-2 focus:ring-mida-primary/10 transition-all bg-mida-gray/30 text-mida-deep" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">Empresa o Razón Social</label>
                <input 
                  type="text" name="company" required placeholder="Ej. Logística de León" 
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:ring-2 focus:ring-mida-primary/10 transition-all bg-mida-gray/30 text-mida-deep" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">Correo Electrónico Corporativo</label>
                <input 
                  type="email" name="email" required placeholder="ejemplo@empresa.com" 
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:ring-2 focus:ring-mida-primary/10 transition-all bg-mida-gray/30 text-mida-deep" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">Teléfono de Contacto (WhatsApp)</label>
                <input 
                  type="tel" name="phone" required placeholder="477 123 4567" 
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:ring-2 focus:ring-mida-primary/10 transition-all bg-mida-gray/30 text-mida-deep" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">Línea de Solución Requerida</label>
              <select 
                name="service_type" required 
                className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:ring-2 focus:ring-mida-primary/10 transition-all bg-mida-gray/30 text-mida-deep font-medium"
              >
                <option value="">-- Selecciona una categoría --</option>
                <option value="Sistemas CONTPAQi">Ecosistema de Software CONTPAQi (Nóminas, Contabilidad, Comercial)</option>
                <option value="Soporte e Infraestructura">Infraestructura de Servidores Dedicados y SQL</option>
                <option value="Optimización de Computadoras">Optimización e Infraestructura de Hardware Administrativo</option>
                <option value="Consultoría General">Consultoría TI y Auditoría de Redes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mida-deep mb-2">Mensaje o Escenario Actual</label>
              <textarea 
                name="message" rows={4} required 
                placeholder="Cuéntanos brevemente sobre el escenario o problemática técnica que presenta tu empresa actualmente..." 
                className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-mida-primary focus:ring-2 focus:ring-mida-primary/10 transition-all bg-mida-gray/30 text-mida-deep leading-relaxed" 
              />
            </div>

            <button 
              type="submit" disabled={isSubmitting}
              className="w-full bg-mida-primary text-white py-4 rounded-xl font-bold hover:bg-mida-deep transition-all shadow-md mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
            >
              {isSubmitting ? "Enviando Requerimientos..." : "Enviar Mensaje Corporativo"}
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: INFORMACIÓN CORPORATIVA (Mapeada con tus variables reales) */}
        <div className="bg-mida-deep text-white p-8 sm:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-lg">
          <div className="space-y-8 relative z-10">
            <div>
              <h3 className="text-xl font-black tracking-tight text-mida-light">Información de Contacto</h3>
              <p className="text-mida-gray/60 text-xs mt-1">Atención directa de lunes a viernes en horarios de oficina.</p>
            </div>

            {/* CORRECCIÓN DE CAMPOS: Aquí ya se consume infoEmpresa de manera activa */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl shrink-0 text-mida-light">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <p className="text-xs text-mida-gray/50 uppercase tracking-wider font-bold">Teléfono Oficina</p>
                  <a href={`tel:${infoEmpresa.telefonoEnlace}`} className="text-sm font-semibold hover:text-mida-light transition-colors">{infoEmpresa.telefonoTexto}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl shrink-0 text-mida-light">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p className="text-xs text-mida-gray/50 uppercase tracking-wider font-bold">Correo Electrónico</p>
                  <a href={`mailto:${infoEmpresa.correoContacto}`} className="text-sm font-semibold hover:text-mida-light transition-colors break-all">{infoEmpresa.correoContacto}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl shrink-0 text-mida-light">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <p className="text-xs text-mida-gray/50 uppercase tracking-wider font-bold">Ubicación Corporativa</p>
                  <p className="text-sm font-semibold leading-relaxed text-mida-gray/90">{infoEmpresa.direccionCompleta}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 relative z-10">
            <p className="text-xs text-mida-gray/40 leading-relaxed">
              Al enviar este formulario aceptas el tratamiento de tus datos exclusivamente para fines de prospección comercial de MIDA.
            </p>
          </div>
          
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-mida-primary/10 rounded-full blur-2xl pointer-events-none" />
        </div>

      </section>

      <Footer />
    </main>
  );
}