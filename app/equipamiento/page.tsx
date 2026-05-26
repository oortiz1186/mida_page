import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { infoEmpresa } from "../../components/config/empresa"; // <-- 1. Importación de variables globales

export const metadata = {
  title: "Infraestructura TI, Servidores SQL y Hardware en León | MIDA",
  description: "Configuración y diagnóstico de servidores dedicados Dell PowerEdge y estaciones de trabajo administrativas. Garantiza la continuidad de tu negocio.",
};

export default function EquipamientoPage() {
  const soluciones = [
    {
      titulo: "Servidores para Aplicaciones y Bases de Datos",
      descripcion: "No solo te damos el equipo; diagnosticamos, configuramos y dejamos a punto servidores dedicados (como Dell PowerEdge) preparados específicamente para soportar tus bases de datos SQL y asegurar la estabilidad de tu información.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s8-1.79 8-4" />
        </svg>
      )
    },
    {
      titulo: "Estaciones de Trabajo y Equipamiento",
      descripcion: "Suministro e instalación de computadoras de escritorio y laptops homologadas para uso administrativo y operativo. Equipos listos para trabajar con la velocidad que tu empresa necesita.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      titulo: "Redes y Conectividad Corporativa",
      descripcion: "Diseño e implementación de cableado estructurado, ruteadores y puntos de acceso inalámbricos para asegurar que la comunicación entre tus terminales y servidores sea rápida, limpia y sin caídas.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      titulo: "Políticas de Respaldo y Seguridad",
      descripcion: "Configuración de arreglos de discos (RAID), sistemas de alimentación ininterrumpida (No-Breaks) y respaldos automatizados en la nube o almacenamiento local para blindar tu operación ante apagones o fallas mecánicas.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  // Construcción de URL dinámica para el CTA de WhatsApp corporativo
  const urlWhatsApp = `https://wa.me/${infoEmpresa.whatsappNumero}?text=${encodeURIComponent(infoEmpresa.whatsappMensajePredeterminado)}`;

  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />
      
      {/* ENCABEZADO DE SECCIÓN SEMÁNTICO */}
      <section className="pt-40 pb-16 bg-mida-deep text-white px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <span className="inline-block text-mida-light font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            Infraestructura TI y Hardware Operativo
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Equipamiento Tecnológico de <span className="text-mida-light">Alto Rendimiento</span>
          </h1>
          <p className="text-mida-gray/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Diseñamos, suministramos y configuramos arquitecturas estables de hardware y redes para que la plataforma digital de tu empresa trabaje con absoluta velocidad y seguridad.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

      {/* SECCIÓN DEL GRID DE SOLUCIONES DE HARDWARE */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full flex-grow">
        {/* 2. Optimización Responsiva del Grid (1 col móvil, 2 cols en pantallas medianas en adelante) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {soluciones.map((solucion) => (
            <div 
              key={solucion.titulo} 
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-in-out flex flex-col justify-between"
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
        </div>
      </section>

      {/* CTA SECTION CON FONDO GRIS HOMOLOGADO Y VARIABLES GLOBALES */}
      <section className="py-20 bg-mida-gray/50 text-center px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-mida-deep">
            ¿Planeas mejorar la infraestructura técnica de tu empresa?
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            No arriesgues la integridad de tus bases de datos corporativas con hardware inadecuado. Te asesoramos para elegir y optimizar el equipamiento ideal para tu negocio en León, Gto.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/contacto" 
              className="w-full sm:w-auto bg-mida-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-mida-deep transition-all shadow-md text-sm uppercase tracking-wider text-center"
            >
              Solicitar una Cotización
            </a>
            <a 
              href={urlWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-gray-200 bg-white text-mida-deep font-bold px-8 py-3.5 rounded-xl hover:bg-mida-gray/40 transition-all text-sm uppercase tracking-wider text-center shadow-sm"
            >
              Consultar con un Asesor
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}