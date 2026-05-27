"use client";

export default function Services() {
  const servicios = [
    {
      id: 1,
      titulo: "Sistemas CONTPAQi",
      descripcion: "Instalación, soporte, capacitación y renovación de licencias oficiales (Nóminas, Contabilidad, Comercial) para optimizar tu gestión fiscal.",
      imagen: "/images/servicio1.png", // <-- Foto enfocada a administración y procesos
      enlace: "/contpaqi"
    },
    {
      id: 2,
      titulo: "Infraestructura de Servidores y SQL",
      descripcion: "Configuración de servidores dedicados, bases de datos SQL de alta velocidad y arreglos RAID para la continuidad de tu negocio.",
      imagen: "/images/servicio2.png", // <-- Foto de hardware premium en rack
      enlace: "/equipamiento"
    },
    {
      id: 3,
      titulo: "Soporte Técnico y Cómputo",
      descripcion: "Equipamiento de hardware empresarial, pólizas de mantenimiento preventivo y optimización de sistemas informáticos corporativos.",
      imagen: "/images/servicio3.png", // <-- Foto de consultoría y diagnóstico técnico
      enlace: "/contacto"
    }
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

        {/* Grid dinámico con imágenes de cobertura */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <div 
              key={servicio.id} 
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Contenedor de la fotografía con efecto Zoom al hacer Hover */}
              <div className="h-48 w-full overflow-hidden bg-mida-deep relative">
                <img 
                  src={servicio.imagen} 
                  alt={servicio.titulo} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Bloque de contenido y textos explicativos */}
              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-mida-deep">{servicio.titulo}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{servicio.descripcion}</p>
                </div>
                
                <a 
                  href={servicio.enlace}
                  className="inline-flex items-center text-mida-primary font-bold text-xs uppercase tracking-wider hover:text-mida-deep transition-colors"
                >
                  Saber más <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}