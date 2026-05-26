import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function EquipamientoPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <section className="bg-gradient-to-br from-mida-primary to-mida-deep text-white pt-32 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Equipamiento de Cómputo</h1>
        <p className="mt-4 text-lg text-mida-gray/80 max-w-2xl mx-auto">
          Infraestructura de hardware sólida y garantizada para asegurar la continuidad de tu operación.
        </p>
      </section>

      <section className="py-20 flex-grow max-w-5xl mx-auto px-6 w-full text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-mida-deep mb-6">Equipos y Servidores Homologados</h2>
          <p className="text-gray-600 leading-relaxed mb-12">
            No te la juegues con hardware genérico. Suministramos e instalamos estaciones de trabajo, almacenamiento en red, switches avanzados y servidores configurados a la medida de tus bases de datos SQL y sistemas de red.
          </p>
          
          <div className="bg-mida-gray p-8 rounded-2xl inline-block text-left w-full max-w-md border border-gray-200">
            <h4 className="font-bold text-mida-deep mb-4 text-center">¿Necesitas renovar infraestructura?</h4>
            <ul className="text-gray-600 text-sm space-y-3 mb-6">
              <li>✓ Diagnóstico de hardware actual sin costo</li>
              <li>✓ Configuración de arreglos RAID para protección de datos</li>
              <li>✓ Servidores optimizados para sistemas CONTPAQi</li>
            </ul>
            <a href="/contacto" className="block text-center bg-mida-primary text-white py-3 rounded-xl font-bold hover:bg-mida-deep transition-all">
              Cotizar Equipamiento
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}