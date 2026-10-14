import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Certificaciones CONTPAQi de nuestros asesores | MIDA",
  description: "Conoce las áreas de certificación del equipo MIDA: Factura Electrónica, Nóminas y sistemas de escritorio CONTPAQi.",
  alternates: { canonical: "/certificaciones" },
};

const specialties = [
  {
    title: "Factura Electrónica",
    description: "Nuestro equipo cuenta con preparación certificada para brindar orientación sobre el uso de CONTPAQi Factura Electrónica, su configuración y los procesos de emisión de comprobantes fiscales digitales.",
    topics: ["Configuración y operación", "Emisión de CFDI", "Acompañamiento técnico"],
  },
  {
    title: "CONTPAQi Nóminas",
    description: "Contamos con asesores certificados en el área de Nóminas para apoyar a las empresas en el uso y la operación de esta solución.",
    topics: ["Configuración del sistema", "Procesos de nómina", "Atención y soporte especializado"],
  },
  {
    title: "Sistemas de escritorio CONTPAQi",
    description: "Nuestro personal cuenta con certificaciones en soluciones de escritorio CONTPAQi, orientadas a su implementación y operación en entornos empresariales.",
    topics: ["Instalación y configuración", "Implementación", "Soporte y continuidad operativa"],
  },
];

export default function CertificacionesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24">
        <section className="bg-mida-deep text-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-200">Certificaciones MIDA</p>
            <h1 className="mt-4 max-w-4xl text-4xl md:text-5xl font-black leading-tight">Asesores preparados para acompañar tu operación con CONTPAQi</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">En MIDA impulsamos la capacitación y certificación de nuestros asesores para ofrecer atención especializada en soluciones administrativas, de facturación y nómina.</p>
          </div>
        </section>
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-black text-mida-deep">Áreas de certificación</h2>
            <p className="mt-3 max-w-3xl text-gray-600">Estas son las especialidades de certificación con las que cuenta nuestro equipo.</p>
            <div className="mt-10 grid gap-7 lg:grid-cols-3">
              {specialties.map((specialty, index) => (
                <article key={specialty.title} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-black text-mida-primary">0{index + 1}</span>
                  <h3 className="mt-6 text-2xl font-bold text-mida-deep">{specialty.title}</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">{specialty.description}</p>
                  <ul className="mt-6 space-y-3">
                    {specialty.topics.map(topic => <li key={topic} className="flex items-start gap-3 text-sm text-mida-deep"><span aria-hidden="true" className="text-mida-primary font-bold">✓</span>{topic}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-black text-mida-deep">¿Necesitas asesoría especializada?</h2>
            <p className="mt-4 text-gray-600">Nuestro equipo puede ayudarte a identificar la solución CONTPAQi adecuada para tu empresa y acompañarte durante su implementación y operación.</p>
            <Link href="/contacto" className="mt-8 inline-flex rounded-full bg-mida-primary px-8 py-3 font-bold text-white hover:bg-mida-deep transition-colors">Contactar a MIDA</Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
