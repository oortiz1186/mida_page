"use client";

// IMPORTANTE: Importamos el componente de optimización nativo de Next.js
import Image from "next/image";

export default function Services() {
  const servicios = [
    {
      id: 1,
      titulo: "Sistemas CONTPAQi",
      descripcion:
        "Instalación, soporte, capacitación y renovación de licencias oficiales (Nóminas, Contabilidad, Comercial) para optimizar tu gestión fiscal.",
      imagen: "/images/servicio1.png",
      enlace: "/contpaqi",
    },
    {
      id: 2,
      titulo: "Infraestructura de Servidores y SQL",
      descripcion:
        "Configuración de servidores dedicados, optimización de bases de datos SQL de alta velocidad y arreglos RAID para la continuidad de tu negocio.",
      imagen: "/images/servicio2.png",
      enlace: "/equipamiento",
    },
    {
      id: 3,
      titulo: "Pólizas de Soporte TI",
      descripcion:
        "Mantenimiento preventivo y correctivo ilimitado para los equipos de cómputo y sistemas de tu empresa con tiempos de respuesta prioritarios.",
      imagen: "/images/servicio3.png",
      enlace: "/contacto",
    },
    {
      id: 4,
      titulo: "Hardware y Cómputo Corporativo",
      descripcion:
        "Venta, equipamiento y configuración de equipo de cómputo de alto rendimiento y servidores de las marcas líderes del mercado.",
      imagen: "/images/servicio4.png",
      enlace: "/equipamiento",
    },
    {
      id: 5,
      titulo: "Redes y Conectividad", // <-- Dejamos solo este título limpio sin duplicados
      descripcion:
        "Diseño e implementación de cableado estructurado, redes de voz y datos, y optimización de routers para un entorno empresarial veloz y estable.",
      imagen: "/images/servicio5.png",
      enlace: "/contacto",
    },
    {
      id: 6,
      titulo: "Seguridad y Respaldos",
      descripcion:
        "Blindaje perimetral contra amenazas de red, licenciamiento antivirus corporativo y sistemas de respaldo automatizados en la nube y locales.",
      imagen: "/images/servicio6.png",
      enlace: "/contacto",
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-mida-gray/30 w-full">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Encabezado Institucional */}
        <div className="text-center space-y-3">
          <span className="text-mida-primary font-bold text-xs uppercase tracking-widest bg-mida-primary/10 px-4 py-1.5 rounded-full">
            Soluciones Especializadas
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-mida-deep">
            Servicios diseñados para la continuidad de tu negocio
          </h2>
        </div>

        {/* Grid Dinámico de 3 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Contenedor de la fotografía con Next.js Image Component */}
              <div className="h-48 w-full overflow-hidden bg-mida-deep relative">
                <Image
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  /* Optimizamos usando 'fill' para que la imagen se adapte al contenedor 
                    con herencia de relación de aspecto.
                  */
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  /* Las primeras tarjetas visibles en pantallas estándar se cargan con prioridad 
                    alta para evitar el retraso visual inicial.
                  */
                  priority={servicio.id <= 3}
                />
              </div>

              {/* Contenido de texto */}
              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-mida-deep">
                    {servicio.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {servicio.descripcion}
                  </p>
                </div>

                <a
                  href={servicio.enlace}
                  className="inline-flex items-center text-mida-primary font-bold text-xs uppercase tracking-wider hover:text-mida-deep transition-colors"
                >
                  Saber más{" "}
                  <span className="ml-1.5 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
