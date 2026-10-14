import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Certificaciones CONTPAQi de nuestros asesores | MIDA",
  description: "Conoce las especialidades de certificación del equipo MIDA en siete sistemas CONTPAQi: Contabilidad, Bancos, Nóminas, Comercial Premium, Comercial Pro, Factura Electrónica y Punto de Venta.",
  alternates: { canonical: "/certificaciones" },
};

const systems = [
  { title: "CONTPAQi Contabilidad", description: "Contabilidad electrónica, pólizas, estados financieros y obligaciones fiscales." },
  { title: "CONTPAQi Bancos", description: "Control de cuentas bancarias, flujo de efectivo y conciliaciones." },
  { title: "CONTPAQi Nóminas", description: "Cálculo de nómina, timbrado de recibos y obligaciones laborales." },
  { title: "CONTPAQi Comercial Premium", description: "Administración comercial, inventarios, compras, ventas y facturación." },
  { title: "CONTPAQi Comercial Pro", description: "Gestión comercial, ventas, compras, clientes e inventarios." },
  { title: "CONTPAQi Factura Electrónica", description: "Emisión, timbrado y administración de CFDI." },
  { title: "CONTPAQi Punto de Venta", description: "Ventas de mostrador, cajas, inventarios y tickets." },
];

export default function CertificacionesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24">
        <section className="bg-mida-deep text-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-200">Certificaciones MIDA</p>
            <h1 className="mt-4 max-w-4xl text-4xl md:text-5xl font-black leading-tight">Asesores certificados en soluciones CONTPAQi</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">En MIDA contamos con asesores certificados en siete soluciones CONTPAQi para ofrecer atención especializada en procesos contables, financieros, laborales y comerciales.</p>
          </div>
        </section>
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-black text-mida-deep">Sistemas en los que nuestro equipo está certificado</h2>
            <p className="mt-3 max-w-3xl text-gray-600">Conoce los sistemas y sus principales funciones.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {systems.map((system, index) => (
                <article key={system.title} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-black text-mida-primary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-xl font-bold text-mida-deep">{system.title}</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">{system.description}</p>
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
