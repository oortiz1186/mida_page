import Image from "next/image";
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
  { title: "CONTPAQi Contabilidad", description: "Contabilidad electrónica, pólizas, estados financieros y obligaciones fiscales.", href: "/contpaqi-contabilidad", logo: "/images/productos/contabilidad.png" },
  { title: "CONTPAQi Bancos", description: "Control de cuentas bancarias, flujo de efectivo y conciliaciones.", href: "/contpaqi-bancos", logo: "/images/productos/bancos-2026.png" },
  { title: "CONTPAQi Nóminas", description: "Cálculo de nómina, timbrado de recibos y obligaciones laborales.", href: "/contpaqi-nominas", logo: "/images/productos/nominas.png" },
  { title: "CONTPAQi Comercial Premium", description: "Administración comercial, inventarios, compras, ventas y facturación.", href: "/contpaqi-comercial-premium", logo: "/images/productos/comercial_premium.png" },
  { title: "CONTPAQi Comercial Pro", description: "Gestión comercial, ventas, compras, clientes e inventarios.", href: "/contpaqi-comercial-pro", logo: "/images/productos/comercial_pro.png" },
  { title: "CONTPAQi Factura Electrónica", description: "Emisión, timbrado y administración de CFDI.", href: "/contpaqi-factura-electronica", logo: "/images/productos/factura_electronica.png" },
  { title: "CONTPAQi Punto de Venta", description: "Ventas de mostrador, cajas, inventarios y tickets.", href: "/contpaqi-punto-de-venta", logo: "/logo/logo-contpaqi-2026.png" },
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
                <Link key={system.title} href={system.href} aria-label={`Conocer más sobre ${system.title}`} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm group block hover:border-mida-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-between gap-4"><Image src={system.logo} alt={`Logotipo de ${system.title}`} width={160} height={88} className="h-16 w-auto max-w-[180px] object-contain object-left" /><span className="text-xs font-bold text-mida-primary/60">{String(index + 1).padStart(2, "0")}</span></div>
                  <h3 className="mt-6 text-xl font-bold text-mida-deep group-hover:text-mida-primary transition-colors">{system.title}</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">{system.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-mida-primary">Conocer sistema <span aria-hidden="true">→</span></span>
                </Link>
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
