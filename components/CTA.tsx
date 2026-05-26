export default function CTA() {
  return (
    <section className="bg-mida-gray/40 py-24 px-6 text-center border-t border-b border-gray-100 relative overflow-hidden">
      {/* Círculo decorativo muy sutil en una esquina */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-mida-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-mida-light/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        <span className="inline-block text-mida-primary font-bold text-xs uppercase tracking-widest bg-mida-primary/10 px-4 py-1.5 rounded-full">
          Garantiza la continuidad de tu negocio
        </span>
        
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-mida-deep leading-tight">
          ¿Listo para llevar tu infraestructura al siguiente nivel?
        </h2>
        
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          En MIDA, combinamos precisión técnica con visión de negocio para que la tecnología trabaje a tu favor. Protege tus sistemas y optimiza tu rendimiento operativo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a 
            href="/contacto" 
            className="bg-mida-primary hover:bg-mida-deep text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md text-sm uppercase tracking-wider"
          >
            Solicitar una Asesoría
          </a>
          <a 
            href="mailto:contacto@midatech.mx" 
            className="bg-white border border-gray-200 hover:bg-mida-gray text-mida-deep px-8 py-4 rounded-xl font-bold transition-all shadow-sm text-sm uppercase tracking-wider"
          >
            Enviar un Correo
          </a>
        </div>
      </div>
    </section>
  );
}