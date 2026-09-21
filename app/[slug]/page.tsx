import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
  };
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

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <section className="pt-40 pb-24 bg-mida-deep text-white px-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-mida-light font-bold text-xs uppercase tracking-widest">{page.eyebrow}</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">{page.h1}</h1>
          <p className="mt-6 max-w-3xl text-gray-200 text-base md:text-lg leading-relaxed">{page.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="/contacto" className="bg-mida-primary text-white font-bold px-7 py-4 rounded-xl text-center">Solicitar cotización</a>
            <a href="/contpaqi" className="border border-white/20 bg-white/5 text-white font-bold px-7 py-4 rounded-xl text-center">Ver soluciones CONTPAQi</a>
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Beneficios y alcance</span>
            <h2 className="mt-3 text-3xl font-black text-mida-deep">Acompañamiento especializado para tu empresa</h2>
            <p className="mt-5 text-gray-600 leading-relaxed">MIDA integra experiencia en CONTPAQi, SQL e infraestructura para acompañar la implementación y operación de soluciones empresariales.</p>
          </div>
          <div className="grid gap-4">
            {page.benefits.map((benefit) => (
              <div key={benefit} className="rounded-2xl border border-gray-100 shadow-sm p-5 font-semibold text-mida-deep">✓ {benefit}</div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-mida-gray/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-mida-deep">¿Quieres revisar esta solución para tu empresa?</h2>
          <p className="mt-4 text-gray-600">Cuéntanos qué necesitas. Podemos orientarte sobre alcance, implementación y siguientes pasos.</p>
          <a href="/contacto" className="inline-block mt-7 bg-mida-primary text-white font-bold px-8 py-4 rounded-xl">Hablar con MIDA</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
