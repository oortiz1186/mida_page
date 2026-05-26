import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Metadatos optimizados para SEO enfocados en licenciamiento y soporte integral
export const metadata = {
  title: "Infraestructura y Licenciamiento para Empresas | MIDA",
  description: "Garantizamos el hardware ideal para tus sistemas, venta y renovación de licencias CONTPAQi, y optimización de servidores SQL.",
};

export default function EquipamientoPage() {
  const soluciones = [
    {
      titulo: "Servidores para Aplicaciones y Bases de Datos",
      descripcion: "No solo te damos el equipo; diagnosticamos, configuramos y dejamos a punto servidores dedicados (como Dell PowerEdge) preparados específicamente para soportar tus bases de datos SQL y asegurar el rendimiento óptimo de tus sistemas.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      titulo: "Venta y Renovación de Licencias CONTPAQi",
      descripcion: "Te asesoramos en la adquisición, actualización o renovación anual de tus sistemas CONTPAQi (Nóminas, Contabilidad, Comercial, etc.). Nos aseguramos de que tus licencias estén en regla y listas para el timbrado digital sin interrupciones.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    },
    {
      titulo: "Equipamiento de Trabajo y Continuidad",
      descripcion: "Suministramos y configuramos estaciones de trabajo optimizadas para perfiles contables y administrativos. Además, implementamos esquemas de almacenamiento en red (NAS) para respaldos automáticos y soluciones de red seguras.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-white to-mida-gray/30 text-center px-6">
        <span className="text-mida-primary font-bold text-xs uppercase tracking-widest bg-mida-primary/10 px-4 py-1.5 rounded-full">
          Soluciones de Soporte Integral
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-mida-deep mt-4 tracking-tight">
          La Infraestructura y Licenciamiento Correcto para tu Empresa
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Garantizamos que tu negocio opere sin contratiempos. Nos encargamos desde el motor físico de tus servidores hasta el aprovisionamiento y soporte de tu software empresarial.
        </p>
      </section>

      {/* GRID DE SOLUCIONES */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {soluciones.map((solucion, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-mida-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
                {solucion.icono}
              </div>
              <h3 className="text-xl font-bold text-mida-deep">{solucion.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{solucion.descripcion}</p>
            </div>
          </div>
        ))}
      </section>

      {/* SECCIÓN CTA REORIENTADA A ASESORÍA Y LICENCIAS */}
      <section className="py-20 bg-mida-deep text-white text-center px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            ¿Necesitas adquirir, renovar o actualizar tus licencias?
          </h2>
          <p className="text-mida-gray/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Evita multas, caídas en el timbrado o problemas de compatibilidad en tus servidores. Analizamos tu situación actual y gestionamos tus accesos de forma rápida y segura.
          </p>
          <div className="pt-4">
            <a 
              href="/contacto" 
              className="inline-block bg-mida-primary text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-mida-deep transition-all shadow-lg text-sm"
            >
              Contactar a un Asesor Certificado
            </a>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

      <Footer />
    </main>
  );
}