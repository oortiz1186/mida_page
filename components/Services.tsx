export default function Services() {
  const servicios = [
    { title: "Consultoría Tecnológica", desc: "Acompañamiento empresarial estratégico para optimizar tus procesos operativos." },
    { title: "Sistemas CONTPAQi", desc: "Licenciamiento, instalación, configuración y timbrado digital sin complicaciones." },
    { title: "Equipamiento de Cómputo", desc: "Hardware homologado, servidores y equipos de alto rendimiento para tu negocio." },
    { title: "Soporte Especializado", desc: "Resolución de incidencias técnicas en redes, servidores y bases de datos SQL." },
    { title: "Capacitación", desc: "Formación a la medida para que tu equipo domine el software y las herramientas." },
    { title: "Infraestructura TI", desc: "Diseño y despliegue de redes seguras y arquitecturas estables." }
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
              <div className="w-12 h-12 bg-mida-primary/10 rounded-xl flex items-center justify-center mb-6">
                <div className="w-3 h-3 rounded-full bg-mida-primary" />
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