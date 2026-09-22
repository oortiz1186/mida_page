import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getSeoPage, seoPages } from "../../lib/seoPages";

export function generateStaticParams() {
  return seoPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${page.slug}` } };
}

export default async function SeoLanding({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: { "@type": "Organization", name: "MIDA Tech Consulting", url: "https://mida.mx" },
    areaServed: ["León, Guanajuato", "Bajío, México"],
    description: page.description,
  };

  const demoHref = `/contacto?interes=${encodeURIComponent(page.h1)}&accion=demostracion`;
  const quoteHref = `/contacto?interes=${encodeURIComponent(page.h1)}&accion=cotizacion`;

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="pt-40 pb-24 bg-mida-deep text-white px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_280px] gap-10 items-center">
          <div>
            <span className="text-mida-light font-bold text-xs uppercase tracking-widest">{page.eyebrow}</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-gray-200 text-base md:text-lg leading-relaxed">{page.intro}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {page.productPage && <a href={demoHref} className="bg-mida-primary text-white font-bold px-7 py-4 rounded-xl text-center">Solicitar demostración</a>}
              <a href={quoteHref} className={page.productPage ? "border border-white/20 bg-white/5 text-white font-bold px-7 py-4 rounded-xl text-center" : "bg-mida-primary text-white font-bold px-7 py-4 rounded-xl text-center"}>Solicitar cotización</a>
            </div>
          </div>
          {page.productPage && page.image && (
            <div className="bg-white rounded-3xl p-8 flex items-center justify-center min-h-56 shadow-xl">
              <Image src={page.image} alt={`${page.h1} | MIDA`} width={240} height={180} className="max-h-44 w-auto object-contain" priority />
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Funcionamiento y características</span>
            <h2 className="mt-3 text-3xl font-black text-mida-deep">Una solución acompañada por especialistas MIDA</h2>
            <p className="mt-5 text-gray-600 leading-relaxed">Analizamos las necesidades de tu empresa para definir el alcance, configuración e implementación adecuada de esta solución.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {page.features.map((feature) => (
              <div key={feature} className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
                <div className="w-9 h-9 rounded-full bg-mida-primary/10 text-mida-primary flex items-center justify-center font-black">✓</div>
                <h3 className="mt-4 font-bold text-mida-deep">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Beneficios y alcance</span>
            <h2 className="mt-3 text-3xl font-black text-mida-deep">Acompañamiento especializado para tu empresa</h2>
            <p className="mt-5 text-gray-600 leading-relaxed">MIDA integra experiencia en CONTPAQi®, SQL e infraestructura para acompañar la implementación y operación de soluciones empresariales.</p>
          </div>
          <div className="grid gap-4">
            {page.benefits.map((benefit) => (
              <div key={benefit} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 font-semibold text-mida-deep">✓ {benefit}</div>
            ))}
          </div>
        </div>
      </section>

      {page.productPage && page.youtubeVideoId && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Video oficial</span>
              <h2 className="mt-3 text-3xl font-black text-mida-deep">Conoce {page.h1}</h2>
              <p className="mt-4 text-gray-600">Conoce la solución a través del contenido oficial de CONTPAQi®.</p>
            </div>
            <div className="mt-10 aspect-video rounded-3xl overflow-hidden shadow-xl bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${page.youtubeVideoId}`}
                title={`Video oficial de ${page.h1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {page.productPage && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
              <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Inversión</span>
              {page.pricing ? (
                <>
                  <h2 className="mt-3 text-2xl font-black text-mida-deep">Precios de lista CONTPAQi® 2026</h2>
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b text-left text-gray-500"><th className="py-3 pr-3">Licenciamiento</th><th className="py-3 pr-3">Nueva</th><th className="py-3 pr-3">Renovación</th><th className="py-3">Usuario adicional</th></tr></thead>
                      <tbody>{page.pricing.map((price) => <tr key={price.label} className="border-b border-gray-100"><td className="py-3 pr-3 font-semibold text-mida-deep">{price.label}</td><td className="py-3 pr-3">{price.newPrice}</td><td className="py-3 pr-3">{price.renewalPrice}</td><td className="py-3">{price.extraUser ?? "Consultar"}</td></tr>)}</tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-xs text-gray-500 leading-relaxed">Precios de lista al público CONTPAQi® vigentes a partir del 02 de enero de 2026. Importes en pesos M.N. + IVA. Precios sujetos a cambio sin previo aviso. La implementación y otros servicios se cotizan de acuerdo con el alcance requerido.</p>
                </>
              ) : (
                <>
                  <h2 className="mt-3 text-2xl font-black text-mida-deep">Cotización de acuerdo con tu necesidad</h2>
                  <p className="mt-4 text-gray-600 leading-relaxed">La inversión puede variar según licenciamiento, usuarios, alcance de implementación y servicios requeridos. Solicita una cotización para recibir una propuesta adecuada a tu empresa.</p>
                </>
              )}
              <a href={quoteHref} className="inline-block mt-6 font-bold text-mida-primary">Solicitar cotización →</a>
            </div>
            <div className="rounded-3xl bg-mida-deep text-white p-8">
              <span className="text-mida-light font-bold text-xs uppercase tracking-widest">Conoce la solución</span>
              <h2 className="mt-3 text-2xl font-black">Solicita una demostración</h2>
              <p className="mt-4 text-gray-200 leading-relaxed">Nuestro equipo puede mostrarte la solución y ayudarte a revisar si corresponde a las necesidades de tu operación.</p>
              <a href={demoHref} className="inline-block mt-6 bg-mida-primary text-white font-bold px-6 py-3 rounded-xl">Solicitar demostración</a>
              {page.sourceUrl && <p className="mt-5 text-xs text-gray-300">Información funcional basada en la página oficial vigente de CONTPAQi®.</p>}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6 bg-mida-deep text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black">{page.productPage ? "¿Quieres conocer esta solución?" : "¿Quieres revisar esta solución para tu empresa?"}</h2>
          <p className="mt-4 text-gray-200">Cuéntanos qué necesitas. Podemos orientarte sobre alcance, implementación y siguientes pasos.</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            {page.productPage && <a href={demoHref} className="bg-mida-primary text-white font-bold px-8 py-4 rounded-xl">Solicitar demostración</a>}
            <a href={quoteHref} className="border border-white/20 bg-white/5 text-white font-bold px-8 py-4 rounded-xl">Contactar a MIDA</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
