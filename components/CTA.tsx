export default function CTA() {
  return (
    <section className="bg-mida-deep py-20 px-6 text-center text-white relative overflow-hidden">
      {/* Círculo decorativo sutil en el fondo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-mida-primary/20 rounded-full blur-3xl" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para llevar tu infraestructura al siguiente nivel?
        </h2>
        <p className="text-mida-gray/80 text-lg mb-10">
          En MIDA, combinamos precisión técnica con visión de negocio para que la tecnología trabaje a tu favor, no en tu contra.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contacto" className="bg-mida-primary hover:bg-mida-light text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg">
            Solicitar una Asesoría
          </a>
          <a href="mailto:contacto@midatech.mx" className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all">
            Enviar un Correo
          </a>
        </div>
      </div>
    </section>
  );
}