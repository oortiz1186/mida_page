import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Sistemas CONTPAQi Certificados | MIDA Consultoría",
  description: "Asesoría especializada, instalación, soporte y renovación de licencias para toda la suite de sistemas CONTPAQi.",
};

export default function ContpaqiPage() {
  const serviciosContpaqi = [
    {
      titulo: "Instalación y Configuración Certificada",
      descripcion: "Implementamos sistemas como CONTPAQi Nóminas, Contabilidad y Comercial bajo arquitecturas seguras en red o terminales remotas, garantizando el correcto timbrado fiscal.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      titulo: "Venta, Renovación y Actualizaciones",
      descripcion: "Gestionamos de forma ágil la renovación anual de tus licencias tradicionales o en la nube, actualizaciones mayores de versión y adición de usuarios para que tu equipo nunca detenga su operación.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    },
    {
      titulo: "Soporte Técnico Especializado",
      descripcion: "Resolución inmediata de errores de timbrado, reconstrucción de índices en bases de datos corruptas, migraciones de servidor y soporte continuo ante actualizaciones del SAT.",
      icono: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />

      {/* HERO REDISEÑADO: Fondo oscuro de alto impacto */}
      <section className="pt-44 pb-24 bg-mida-deep text-white px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full relative z-10">
          
          {/* Texto en blanco y azul claro */}
          <div className="text-left space-y-5">
            <span className="inline-block text-mida-light font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
              Consultoría en Software Empresarial
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              Soluciones de Cómputo y <span className="text-mida-light">Sistemas CONTPAQi</span>
            </h1>
            <p className="text-mida-gray/70 text-base md:text-lg leading-relaxed">
              Somos asesores comerciales y técnicos certificados. Maximizamos el rendimiento de tus herramientas contables y administrativas garantizando el cumplimiento fiscal de tu negocio.
            </p>
          </div>

          {/* Imagen resaltando sobre el fondo oscuro */}
          <div className="flex justify-center items-center w-full">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <Image
                src="/images/contpaqi.png"
                alt="Sistemas y Licenciamiento CONTPAQi MIDA"
                fill
                priority
                sizes="(max-w-768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

        </div>
        {/* Textura sutil geométrica */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

      {/* GRID DE SERVICIOS (Fondo gris claro para contraste total) */}
      <section className="py-24 bg-mida-gray">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviciosContpaqi.map((servicio, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-mida-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
                  {servicio.icono}
                </div>
                <h3 className="text-xl font-bold text-mida-deep">{servicio.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{servicio.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-white text-center px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-mida-deep">
            ¿Tu licencia de CONTPAQi está por vencer o necesitas actualizarla?
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Evita pausas imprevistas en tu facturación o cálculo de nómina. Gestionamos tus renovaciones y timbrados de forma rápida y 100% oficial.
          </p>
          <div className="pt-4">
            <a href="/contacto" className="inline-block bg-mida-primary text-white font-bold px-10 py-4 rounded-xl hover:bg-mida-deep transition-all shadow-md text-sm">
              Contactar a un Asesor Certificado
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}