import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center text-white pt-24 px-6 overflow-hidden">
      
      {/* IMAGEN DE FONDO ABSOLUTA */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/OFICINA.png" 
          alt="Oficina MIDA"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Capa de color (Overlay) optimizada para máxima legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-mida-primary/95 via-mida-deep/90 to-black/70 mix-blend-multiply" />
      </div>

      {/* CONTENIDO DE TEXTO */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-3xl space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-md">
            Tecnología que <br /> 
            <span className="opacity-95 text-mida-light">impulsa empresas</span>
          </h1>

          <p className="text-xl md:text-2xl font-light text-mida-gray/90 max-w-2xl drop-shadow">
            Consultoría especializada • Sistemas CONTPAQi • Equipamiento tecnológico de alto nivel.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/contacto"
              className="bg-white text-mida-primary hover:bg-mida-gray hover:scale-105 transition-all duration-300 px-10 py-4 rounded-full font-bold shadow-xl text-center"
            >
              Solicitar asesoría
            </a>
            <a
              href="/servicios"
              className="border-2 border-white/40 hover:border-white hover:bg-white/10 hover:scale-105 transition-all px-10 py-4 rounded-full font-bold text-center"
            >
              Ver servicios
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}