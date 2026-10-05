"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { trackEvent } from "../lib/analytics";

type Need = "contabilidad" | "nomina" | "ventas" | "facturacion" | "bancos" | "nube";

const needs: { id: Need; label: string; icon: string }[] = [
  { id: "contabilidad", label: "Contabilidad", icon: "📊" },
  { id: "nomina", label: "Nómina", icon: "👥" },
  { id: "ventas", label: "Ventas e inventarios", icon: "📦" },
  { id: "facturacion", label: "Facturación", icon: "🧾" },
  { id: "bancos", label: "Bancos y tesorería", icon: "🏦" },
  { id: "nube", label: "Trabajar en la nube", icon: "☁️" },
];

const recommendations: Record<Need, { title: string; text: string; href: string; bullets: string[] }> = {
  contabilidad: {
    title: "CONTPAQi Contabilidad®",
    text: "Una solución orientada al control contable, fiscal y financiero de tu empresa.",
    href: "/contpaqi-contabilidad",
    bullets: ["Contabilidad y pólizas", "Información fiscal", "Reportes financieros"],
  },
  nomina: {
    title: "CONTPAQi Nóminas®",
    text: "Para administrar el cálculo de nómina y los procesos relacionados con tus colaboradores.",
    href: "/contpaqi-nominas",
    bullets: ["Cálculo de nómina", "Timbrado", "Procesos de colaboradores"],
  },
  ventas: {
    title: "CONTPAQi Comercial Premium®",
    text: "Para empresas que necesitan controlar ventas, compras, inventarios y facturación en una misma operación.",
    href: "/contpaqi-comercial-premium",
    bullets: ["Ventas y compras", "Inventarios y costos", "Facturación y reportes"],
  },
  facturacion: {
    title: "CONTPAQi Vende®",
    text: "Una alternativa en la nube para facturación, ventas, cobranza e inventarios.",
    href: "/contpaqi-vende",
    bullets: ["Facturación en la nube", "Ventas y cobranza", "Inventarios"],
  },
  bancos: {
    title: "CONTPAQi Bancos®",
    text: "Para controlar movimientos bancarios, flujo de efectivo y conciliación financiera.",
    href: "/contpaqi-bancos",
    bullets: ["Flujo de efectivo", "Movimientos bancarios", "Conciliación"],
  },
  nube: {
    title: "Soluciones CONTPAQi® en la nube",
    text: "Podemos ayudarte a elegir entre soluciones nativas en la nube o una infraestructura de Escritorio Virtual según tu operación.",
    href: "/contpaqi-vende",
    bullets: ["Acceso desde cualquier lugar", "Opciones según tu operación", "Acompañamiento MIDA"],
  },
};

export default function SolutionFinder() {
  const [selected, setSelected] = useState<Need>("ventas");
  const recommendation = useMemo(() => recommendations[selected], [selected]);

  return (
    <section className="bg-white py-24 px-6 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Te ayudamos a elegir</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-mida-deep">¿Qué necesitas mejorar en tu empresa?</h2>
          <p className="mt-4 text-gray-600">Selecciona el área que quieres mejorar y te mostramos una solución que puede ajustarse a tu necesidad.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.05fr_.95fr] gap-7 items-stretch">
          <div className="grid sm:grid-cols-2 gap-4">
            {needs.map((need) => {
              const active = selected === need.id;
              return (
                <button
                  key={need.id}
                  type="button"
                  onClick={() => { setSelected(need.id); trackEvent("solution_interest", { need: need.id, product: recommendations[need.id].title, source: "solution_finder", page_path: window.location.pathname }); }}
                  aria-pressed={active}
                  className={`text-left rounded-2xl border p-5 transition-all ${active ? "bg-mida-deep text-white border-mida-deep shadow-lg -translate-y-0.5" : "bg-white text-mida-deep border-gray-200 hover:border-mida-primary hover:shadow-md"}`}
                >
                  <span className="text-2xl" aria-hidden>{need.icon}</span>
                  <span className="block mt-3 font-black">{need.label}</span>
                  <span className={`block mt-1 text-xs ${active ? "text-white/75" : "text-gray-500"}`}>Ver recomendación →</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-[2rem] bg-mida-deep text-white p-8 md:p-10 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-mida-light font-bold text-xs uppercase tracking-widest">Solución recomendada</span>
              <h3 className="mt-3 text-2xl md:text-3xl font-black">{recommendation.title}</h3>
              <p className="mt-4 text-white/80 leading-relaxed">{recommendation.text}</p>
              <div className="mt-6 grid gap-3">
                {recommendation.bullets.map((bullet) => (
                  <div key={bullet} className="flex gap-3 items-center text-sm font-semibold">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-mida-light">✓</span>
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href={recommendation.href} onClick={() => trackEvent("view_product_click", { product: recommendation.title, source: "solution_finder", page_path: window.location.pathname })} className="rounded-xl bg-white px-6 py-3 text-center text-sm font-bold text-mida-deep hover:bg-gray-100 transition-colors">Ver solución</Link>
              <Link href={`/contacto?interes=${encodeURIComponent(recommendation.title)}&accion=cotizacion`} onClick={() => trackEvent("quote_click", { product: recommendation.title, source: "solution_finder", page_path: window.location.pathname })} className="rounded-xl bg-mida-primary px-6 py-3 text-center text-sm font-bold text-white hover:bg-white hover:text-mida-deep transition-colors">Solicitar cotización</Link>
            </div>
            <p className="mt-5 text-xs text-white/60">La recomendación es orientativa. Un asesor MIDA puede validar usuarios, procesos y alcance antes de cotizar.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
