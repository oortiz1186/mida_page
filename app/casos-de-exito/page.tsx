import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Casos de éxito | MIDA",
  description: "Conoce el espacio de casos de éxito MIDA. Próximamente publicaremos experiencias y proyectos autorizados por nuestros clientes.",
  alternates: { canonical: "/casos-de-exito" },
};

const topics = [
  { title: "Implementación CONTPAQi", description: "Proyectos de puesta en marcha y adopción de soluciones administrativas." },
  { title: "Soporte y optimización", description: "Experiencias de atención técnica, continuidad operativa y mejoras de procesos." },
  { title: "Infraestructura tecnológica", description: "Proyectos relacionados con servidores, redes y equipamiento empresarial." },
];

export const dynamic = "force-dynamic";
export default async function CasosDeExitoPage() {
  const {data:stories,error} = await supabase.from("mida_success_stories").select("id,title,slug,client_name,sector,challenge,solution,results,testimonial").eq("status","published").eq("consent_confirmed",true).order("updated_at",{ascending:false});
  if(error) console.error("[success-stories] Public listing unavailable",error.code);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24">
        <section className="bg-mida-deep py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-200">Experiencias de nuestros clientes</p>
            <h1 className="mt-4 text-4xl font-black md:text-5xl">Casos de éxito MIDA</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">Estamos preparando historias de proyectos realizados con nuestros clientes. Publicaremos cada caso cuando contemos con la información y autorización correspondientes.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 max-w-3xl">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-mida-primary">Contenido próximamente</span>
            <h2 className="mt-5 text-3xl font-black text-mida-deep">¿Qué experiencias compartiremos?</h2>
            <p className="mt-3 text-gray-600">Estas son las áreas en las que planeamos documentar proyectos. Aún no hay testimonios ni resultados de clientes publicados.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {topics.map((topic, index) => (
              <article key={topic.title} className="rounded-3xl border border-gray-200 p-8 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-black text-mida-primary">0{index + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-mida-deep">{topic.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{topic.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-black text-mida-deep">¿Quieres conocer cómo podemos ayudarte?</h2>
            <p className="mt-4 text-gray-600">Cuéntanos qué necesita tu empresa y nuestro equipo podrá orientarte.</p>
            <Link href="/contacto" className="mt-8 inline-flex rounded-full bg-mida-primary px-8 py-3 font-bold text-white transition-colors hover:bg-mida-deep">Contactar a MIDA</Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
