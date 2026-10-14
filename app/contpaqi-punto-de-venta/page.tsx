import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Punto de Venta | MIDA",
  description: "Conoce cómo MIDA te acompaña con soluciones para ventas de mostrador, cajas, inventarios y tickets.",
  alternates: { canonical: "/contpaqi-punto-de-venta" },
};

export default function PuntoDeVentaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24">
        <section className="bg-mida-deep py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-200">Soluciones comerciales</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-black">CONTPAQi Punto de Venta</h1>
            <p className="mt-6 max-w-3xl text-lg text-white/85">Acompañamiento para negocios que requieren gestionar ventas de mostrador, cajas, inventarios y tickets.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-black text-mida-deep">Funciones principales</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {["Ventas de mostrador", "Control de cajas", "Inventarios", "Emisión de tickets"].map(item => (
              <div key={item} className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <span className="font-bold text-mida-deep">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-gray-600">Nuestro equipo puede orientarte sobre la solución de punto de venta adecuada para tu operación y el alcance de su implementación.</p>
          <Link href="/contacto" className="mt-8 inline-flex rounded-full bg-mida-primary px-7 py-3 font-bold text-white hover:bg-mida-deep transition-colors">Solicitar información</Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
