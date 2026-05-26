import { infoEmpresa } from "./config/empresa"; // <-- Importamos tu archivo de variables globales

export default function CTA() {
  return (
    <section className="bg-mida-deep py-20 px-6 text-center text-white relative overflow-hidden">
      {/* Círculo decorativo sutil en el fondo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-mida-primary/20 rounded-full blur-3xl" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
          ¿Listo para llevar tu infraestructura al siguiente nivel?
        </h2>
        <p className="text-mida-gray/80 text-base md:text-lg mb-10 leading-relaxed">
          En MIDA, combinamos precisión técnica con visión de negocio para que la tecnología trabaje a tu favor, garantizando la continuidad de tu operación corporativa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/contacto" 
            className="w-full sm:w-auto bg-mida-primary hover:bg-white hover:text-mida-deep text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg text-sm uppercase tracking-wider"
          >
            Solicitar una Asesoría
          </a>
          <a 
            href={`mailto:${infoEmpresa.correoContacto}`} // <-- Dinámico: Consume el correo real de tu archivo de configuración
            className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wider"
          >
            Enviar un Correo
          </a>
        </div>
      </div>
    </section>
  );
}