import Link from "next/link";

export default function HomeSuccessStories() {
  return (
    <section aria-labelledby="casos-exito-titulo" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-slate-50 to-blue-50 px-7 py-12 md:px-12 md:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-mida-primary">Experiencias de nuestros clientes</p>
              <h2 id="casos-exito-titulo" className="mt-3 text-3xl font-black text-mida-deep md:text-4xl">Casos de éxito MIDA</h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-gray-600">Estamos preparando un espacio para compartir proyectos y experiencias de empresas que han trabajado con nuestro equipo, con la autorización de cada cliente.</p>
              <Link href="/casos-de-exito" className="mt-7 inline-flex items-center rounded-full bg-mida-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-mida-deep">Conoce esta sección <span aria-hidden="true" className="ml-2">→</span></Link>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-mida-primary" aria-hidden="true">★</div>
              <h3 className="mt-5 text-xl font-bold text-mida-deep">Historias en preparación</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">Próximamente compartiremos casos documentados de implementación, soporte y mejora tecnológica.</p>
              <span className="mt-5 inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">Próximamente</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
