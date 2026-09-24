import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-mida-deep text-white pt-28 overflow-hidden w-full">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/oficina-desktop.png" />
          <Image
            src="/images/oficina-mobile.png"
            alt="Consultoría TI, CONTPAQi, SQL y soporte empresarial de MIDA en León"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center lg:object-right opacity-50 lg:opacity-85"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-mida-deep via-mida-deep/90 to-mida-deep/70 lg:bg-gradient-to-r lg:from-mida-deep lg:from-40% lg:via-mida-deep/85 lg:via-60% lg:to-mida-deep/10" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <span className="inline-flex items-center text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
              CONTPAQi · SQL · Infraestructura · Soporte
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight lg:leading-none">
              Distribuidor <span className="text-white">CONTPAQi en León</span>
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              Implementamos, optimizamos y damos soporte a sistemas CONTPAQi, servidores, SQL y redes empresariales en León y el Bajío.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a href="/contacto" className="w-full sm:w-auto bg-mida-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-mida-deep transition-all shadow-lg text-xs sm:text-sm uppercase tracking-wider text-center">Solicitar cotización</a>
              <a href="/soporte-contpaqi-leon" className="w-full sm:w-auto border border-white/30 bg-white/5 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-xs sm:text-sm uppercase tracking-wider text-center">Soporte CONTPAQi</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
