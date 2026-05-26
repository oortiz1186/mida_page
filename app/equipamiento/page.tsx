import Image from "next/image"; // Asegúrate de incluir esta importación
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function EquipamientoPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero de la página (Mantenido del código actual) */}
      <section className="bg-gradient-to-br from-mida-primary to-mida-deep text-white pt-32 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Equipamiento de Cómputo</h1>
        <p className="mt-4 text-lg text-mida-gray/80 max-w-2xl mx-auto">
          Infraestructura de hardware sólida y garantizada para asegurar la continuidad de tu operación.
        </p>
      </section>

      {/* Nueva Sección con Imagen Lateral y Contenido Integrado */}
      <section className="py-20 flex-grow max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Lado izquierdo: Foto del hardware */}
          <div className="md:w-1/2 relative w-full h-[350px] md:h-[450px]">
            <Image 
              src="/images/EQUIPAMIENTO.PNG" 
              alt="Servidores e Infraestructura Tecnológica"
              fill
              className="object-cover rounded-3xl shadow-xl border border-gray-100"
              sizes="(max-w-768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Lado derecho: Texto e invitación */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-mida-deep">Equipos y Servidores Homologados</h2>
            <p className="text-gray-600 leading-relaxed">
              No te la juegues con hardware genérico. Suministramos e instalamos estaciones de trabajo, almacenamiento en red, switches avanzados y servidores configurados a la medida de tus bases de datos SQL y sistemas de red.
            </p>
            
            <div className="bg-mida-gray p-6 rounded-2xl border border-gray-200/60">
              <h4 className="font-bold text-mida-deep mb-3">¿Necesitas renovar infraestructura?</h4>
              <ul className="text-gray-600 text-sm space-y-2 mb-4">
                <li>✓ Diagnóstico de hardware actual sin costo</li>
                <li>✓ Configuración de arreglos RAID para protección de datos</li>
                <li>✓ Servidores optimizados para sistemas CONTPAQi</li>
              </ul>
              <a href="/contacto" className="inline-block text-center bg-mida-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-mida-deep transition-all text-sm">
                Cotizar Equipamiento
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}