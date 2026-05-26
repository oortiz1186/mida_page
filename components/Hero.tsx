import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-44 pb-24 bg-mida-deep text-white px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full relative z-10">
        
        {/* Columna Izquierda: Mensaje Comercial e Impacto */}
        <div className="text-left space-y-6">
          <span className="inline-block text-mida-light font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            Consultoría TI & Soporte Certificado
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
            Impulsamos la tecnología de tu <span className="text-mida-light">empresa</span>
          </h1>
          <p className="text-mida-gray/70 text-base md:text-lg leading-relaxed max-w-xl">
            Especialistas en la integración, soporte y licenciamiento de sistemas CONTPAQi, optimización de servidores SQL y soluciones de hardware a la medida de tu operación.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <a 
              href="/contacto" 
              className="bg-mida-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white hover:text-mida-deep transition-all shadow-lg text-sm"
            >
              Agendar Asesoría Gratis
            </a>
            <a 
              href="/servicios" 
              className="border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all text-sm"
            >
              Ver Soluciones
            </a>
          </div>
        </div>

        {/* Columna Derecha: Imagen de Oficina/Dashboard Tecnológico */}
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            {/* Usamos una imagen de tu stock que refleje la operación ejecutiva o flujos de datos */}
            <Image
              src="/images/oficina.png" 
              alt="MIDA Consultoría Tecnológica Avanzada"
              fill
              priority
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

      </div>

      {/* Fondo geométrico fino sutil */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
    </section>
  );
}