"use client";

// IMPORTANTE: Importamos el componente de optimización nativo de Next.js
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { infoEmpresa } from "../../components/config/empresa";

export default function ContpaqiPage() {
  const serviciosContpaqi = [
    {
      titulo: "Instalación y Configuración Certificada",
      descripcion: "Implementamos sistemas como CONTPAQi Nóminas, Contabilidad y Comercial bajo arquitecturas seguras en red o terminales remotas, garantizando el correcto timbrado fiscal.",
      // 1. Agregamos la ruta de tu asset optimizado
      imagen: "/images/contpaqi-instalacion.webp", 
      icono: (
        <svg className="w-5 h-5 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      titulo: "Soporte Técnico Especializado",
      descripcion: "Solucionamos errores comunes de timbrado, fallas de conexión con bases de datos SQL, problemas con llaves de licenciamiento y configuraciones multiusuario de manera inmediata.",
      imagen: "/images/contpaqi-soporte.webp",
      icono: (
        <svg className="w-5 h-5 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      titulo: "Renovación y Venta de Licencias",
      descripcion: "Te asesoramos para adquirir o renovar tus licencias anuales o tradicionales bajo esquemas óptimos, asegurando que tu negocio cuente siempre con las últimas actualizaciones fiscales.",
      imagen: "/images/contpaqi-licencias.webp",
      icono: (
        <svg className="w-5 h-5 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      titulo: "Optimización de Bases de Datos SQL",
      descripcion: "Mantenimiento y análisis estructural a tus instancias de Microsoft SQL Server para acelerar los reportes, resguardar tu información corporativa y evitar la corrupción de empresas.",
      imagen: "/images/contpaqi-sql.webp",
      icono: (
        <svg className="w-5 h-5 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s8-1.79 8-4" />
        </svg>
      )
    }
  ];

  const urlWhatsApp = `https://wa.me/${infoEmpresa.whatsappNumero}?text=${encodeURIComponent(infoEmpresa.whatsappMensajePredeterminado)}`;

  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />
      
      {/* ENCABEZADO OPTIMIZADO PARA MAQUETADO Y SEO */}
      <section className="pt-40 pb-16 bg-mida-deep text-white px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <span className="inline-block text-mida-light font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            Ecosistema de Software Empresarial
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Especialistas Certificados en <span className="text-mida-light">Sistemas CONTPAQi</span>
          </h1>
          <p className="text-mida-gray/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Garantizamos la continuidad fiscal y administrativa de tu empresa a través de integraciones estables, soporte técnico experto y soluciones oportunas de licenciamiento en León, Gto.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

      {/* SECCIÓN DEL GRID DE SOLUCIONES CON IMÁGENES MODERNAS */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full flex-grow">
        {/* Cambiamos a un grid simétrico de 2 columnas en tablets/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviciosContpaqi.map((servicio, index) => (
            <div 
              key={servicio.titulo} 
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-in-out flex flex-col group"
            >
              {/* 2. CONTENEDOR DE LA IMAGEN ULTRA VELOZ (Relación de aspecto moderna de Next.js) */}
              <div className="h-52 w-full overflow-hidden bg-mida-deep relative">
                <Image 
                  src={servicio.imagen} 
                  alt={servicio.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  // 3. Cargamos de forma prioritaria las primeras dos imágenes para que abran instantáneamente
                  priority={index < 2}
                />
              </div>

              {/* Contenido de texto y su icono flotante */}
              <div className="p-8 flex-grow flex flex-col justify-between relative">
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    {/* El icono ahora acompaña al título de forma elegante */}
                    <div className="w-9 h-9 bg-mida-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      {servicio.icono}
                    </div>
                    <h3 className="text-xl font-bold text-mida-deep">{servicio.titulo}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pl-12">
                    {servicio.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION TOTALMENTE HOMOLOGADA CON VARIABLES */}
      <section className="py-20 bg-white text-center px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-mida-deep">
            ¿Tu licencia de CONTPAQi está por vencer o necesitas actualizarla?
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Evita pausas imprevistas en tu facturación o cálculo de nómina. Gestionamos tus renovaciones y timbrados de forma rápida, oficial y con soporte técnico especializado.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/contacto" 
              className="w-full sm:w-auto bg-mida-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-mida-deep transition-all shadow-md text-sm uppercase tracking-wider text-center"
            >
              Cotizar Licencia / Renovación
            </a>
            <a 
              href={urlWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-gray-200 text-mida-deep font-bold px-8 py-3.5 rounded-xl hover:bg-mida-gray/40 transition-all text-sm uppercase tracking-wider text-center"
            >
              Atención Inmediata por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}