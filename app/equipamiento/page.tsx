import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Infraestructura TI y Soporte de Hardware | MIDA",
  description: "Garantizamos el hardware ideal para tus sistemas, optimización de servidores SQL y estaciones de trabajo administrativas.",
};

export default function EquipamientoPage() {
  const soluciones = [
    {
      titulo: "Servidores para Aplicaciones y Bases de Datos",
      descripcion: "No solo te damos el equipo; diagnosticamos, configuramos y dejamos a punto servidores dedicados (como Dell PowerEdge) preparados específicamente para soportar tus bases de datos SQL y asegurar la estabilidad de tu información.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      titulo: "Optimización y Diagnóstico de Sistemas",
      descripcion: "Analizamos el rendimiento de tus equipos actuales para identificar cuellos de botella. Corregimos problemas de lentitud, depuramos configuraciones erróneas y garantizamos que tu hardware responda con velocidad comercial.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      titulo: "Equipamiento de Trabajo y Continuidad",
      descripcion: "Suministramos y configuramos estaciones de trabajo optimizadas para perfiles contables y administrativos. Además, implementamos esquemas de almacenamiento en red (NAS) para respaldos automatizados de tu empresa.",
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

      {/* HERO SECTION: Fondo oscuro corporativo */}
      <section className="pt-44 pb-24 bg-mida-deep text-white px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full relative z-10">
          
          <div className="text-left space-y-5">
            <span className="inline-block text-mida-light font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
              Soporte de Hardware Corporativo
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              La Infraestructura Correcta para tu <span className="text-mida-light">Operación</span>
            </h1>
            <p className="text-mida-gray/70 text-base md:text-lg leading-relaxed">
              El software necesita un motor físico confiable. Nos encargamos de asegurar, habilitar y dar soporte preventivo y correctivo al equipamiento clave de tu negocio.
            </p>
          </div>

          {/* CONTENEDOR CORREGIDO: Imagen a borde completo sin recuadros blancos */}
          <div className="flex justify-center items-center w-full">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <Image
                src="/images/EQUIPAMIENTO.png"
                alt="Equipamiento Tecnológico MIDA"
                fill
                priority
                sizes="(max-w-768px) 100vw, 50vw"
                className="object-cover" // Hace que cubra todo hasta el borde sin deformarse
              />
            </div>
          </div>

        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

      {/* GRID DE SOLUCIONES CORREGIDO: Fondo blanco para recuperar la división clara */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {soluciones.map((solucion, index) => (
            <div 
              key={index} 
              className="bg-mida-gray/30 p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
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

      {/* CTA SECTION: Fondo gris sutil para marcar la separación con el Footer */}
      <section className="py-20 bg-mida-gray/40 text-center px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-mida-deep">
            ¿Planeas mejorar la infraestructura técnica de tu empresa?
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Te asesoramos para elegir y optimizar el hardware idóneo compatible con tus bases de datos corporativas.
          </p>
          <div className="pt-4">
            <a href="/contacto" className="inline-block bg-mida-primary text-white font-bold px-10 py-4 rounded-xl hover:bg-mida-deep transition-all shadow-md text-sm">
              Solicitar Asesoría de Hardware
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}