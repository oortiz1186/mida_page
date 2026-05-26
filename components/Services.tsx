export default function Services() {
  const servicios = [
    { 
      title: "Consultoría Tecnológica", 
      desc: "Acompañamiento empresarial estratégico para optimizar tus procesos operativos.",
      // Icono de Gráfica/Estrategia
      icon: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    },
    { 
      title: "Sistemas CONTPAQi", 
      desc: "Licenciamiento, instalación, configuración y timbrado digital sin complicaciones.",
      // Icono de Software/Documentos
      icon: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      title: "Equipamiento de Cómputo", 
      desc: "Hardware homologado, servidores y equipos de alto rendimiento para tu negocio.",
      // Icono de Servidor/Hardware
      icon: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v4a2 2 0 00-2-2M7 7h.01M7 15h.01" />
        </svg>
      )
    },
    { 
      title: "Soporte Especializado", 
      desc: "Resolución de incidencias técnicas en redes, servidores y bases de datos SQL.",
      // Icono de Soporte/Engrane
      icon: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      title: "Capacitación", 
      desc: "Formación a la medida para que tu equipo domine el software y las herramientas.",
      // Icono de Usuario/Aprendizaje
      icon: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      title: "Infraestructura TI", 
      desc: "Diseño y despliegue de redes seguras y arquitecturas estables.",
      // Icono de Red/Conexiones
      icon: (
        <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-mida-gray">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mida-deep">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Soluciones integrales diseñadas con precisión y coherencia tecnológica para impulsar tu negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicios.map((item) => (
            <div 
              key={item.title} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Contenedor del Icono dinámico */}
              <div className="w-12 h-12 bg-mida-primary/10 rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-mida-deep mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}