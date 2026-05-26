import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Servicios de Consultoría Tecnológica y Soporte TI | MIDA",
  description: "Portafolio integral de soluciones tecnológicas: Soporte especializado, base de datos SQL, redes seguras y capacitación corporativa.",
};

export default function ServiciosPage() {
  const serviciosDetallados = [
    {
      categoria: "Sistemas & Licenciamiento",
      titulo: "Implementación y Soporte CONTPAQi",
      desc: "Instalación, configuración y puesta a punto de todo el ecosistema CONTPAQi. Aseguramos la continuidad de tu timbrado digital, migraciones de bases de datos y actualizaciones fiscales obligatorias para Nóminas, Comercial y Contabilidad.",
      caracteristicas: ["Migración segura de datos", "Optimización de bases de datos SQL", "Soporte técnico ante errores de conexión"]
    },
    {
      categoria: "Consultoría TI",
      titulo: "Ingeniería en Infraestructura y Redes",
      desc: "Diseño y despliegue de redes corporativas estables y seguras. Nos encargamos de la estructuración de servidores físicos y virtuales, configuraciones de políticas de red y seguridad perimetral para proteger los datos de tu empresa.",
      caracteristicas: ["Configuración de Windows Server", "Seguridad perimetral y Firewalls", "Políticas de respaldos automatizados"]
    },
    {
      categoria: "Hardware Profesional",
      titulo: "Suministro y Equipamiento de Cómputo",
      desc: "Equipamiento homologado de alto rendimiento para empresas. Proveemos servidores avanzados de marcas líderes (como Dell PowerEdge), estaciones de trabajo optimizadas para la operación diaria y periféricos de red de nivel empresarial.",
      caracteristicas: ["Servidores a la medida para SQL Server", "Arreglos de discos (RAID) para protección", "Garantía directa de fábrica"]
    },
    {
      categoria: "Capacitación Continua",
      titulo: "Capacitación y Acompañamiento",
      desc: "Formamos a tu personal operativo, contable y administrativo para que dominen las herramientas tecnológicas al 100%. Reducimos la curva de aprendizaje y optimizamos los tiempos de entrega de información interna.",
      caracteristicas: ["Sesiones personalizadas por módulo", "Buenas prácticas en el uso de software", "Soporte post-capacitación"]
    }
  ];

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Encabezado Principal */}
      <section className="bg-gradient-to-br from-mida-primary to-mida-deep text-white pt-40 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Portafolio de Soluciones</h1>
        <p className="mt-4 text-lg text-mida-gray/80 max-w-2xl mx-auto">
          Servicios tecnológicos integrales diseñados con precisión y coherencia para potenciar la infraestructura de tu negocio.
        </p>
      </section>

      {/* Bloque Detallado de Servicios */}
      <section className="py-20 flex-grow max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col gap-12">
          {serviciosDetallados.map((item, index) => (
            <div 
              key={item.titulo} 
              className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-8 items-start"
            >
              {/* Indicador Visual izquierdo */}
              <div className="flex flex-col gap-1 md:w-1/4">
                <span className="text-xs font-bold uppercase tracking-widest text-mida-light">
                  {item.categoria}
                </span>
                <div className="h-1 w-12 bg-mida-primary mt-2 rounded-full" />
              </div>

              {/* Contenido principal */}
              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold text-mida-deep mb-4">
                  {item.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
                
                {/* Viñetas de características */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {item.caracteristicas.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-mida-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Final de Cierre (CTA) */}
      <section className="bg-mida-gray py-16 text-center border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-6">
          <h4 className="text-2xl font-bold text-mida-deep mb-3">¿No encuentras la solución exacta que necesitas?</h4>
          <p className="text-gray-600 text-sm mb-6">
            Escríbenos detallando la situación actual de tus sistemas o infraestructura y un consultor especializado te propondrá una alternativa a la medida.
          </p>
          <a href="/contacto" className="inline-block bg-mida-primary text-white px-8 py-3.5 rounded-full font-bold hover:bg-mida-deep transition-all shadow-md">
            Consultar con un asesor
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}