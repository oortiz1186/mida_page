import type { Metadata } from "next";
import Link from "next/link";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";

export const metadata: Metadata = {
  title: "Analítica y SEO | MIDA Admin",
  robots: { index: false, follow: false },
};

const sources = [
  {
    name: "Google Analytics 4",
    category: "Tráfico del sitio",
    description: "Usuarios, sesiones, páginas visitadas, canales de adquisición y eventos de conversión.",
    url: "https://analytics.google.com/",
    label: "Abrir Google Analytics",
    env: ["MIDA_GA4_PROPERTY_ID", "MIDA_GOOGLE_ANALYTICS_CREDENTIALS_JSON"],
    fields: ["Usuarios", "Sesiones", "Páginas más visitadas", "Conversiones"],
  },
  {
    name: "Google Search Console",
    category: "Posicionamiento orgánico",
    description: "Clics, impresiones, CTR, posición promedio y consultas que atraen visitas desde Google.",
    url: "https://search.google.com/search-console",
    label: "Abrir Search Console",
    env: ["MIDA_SEARCH_CONSOLE_SITE_URL", "MIDA_GOOGLE_ANALYTICS_CREDENTIALS_JSON"],
    fields: ["Clics orgánicos", "Impresiones", "CTR", "Posición promedio"],
  },
  {
    name: "Google PageSpeed Insights",
    category: "Rendimiento técnico",
    description: "Velocidad, experiencia de usuario y oportunidades para mejorar el rendimiento de mida.mx.",
    url: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fmida.mx",
    label: "Analizar mida.mx",
    env: [],
    fields: ["Rendimiento", "Accesibilidad", "Buenas prácticas", "SEO técnico"],
  },
  {
    name: "Meta (Facebook e Instagram)",
    category: "Redes sociales y campañas",
    description: "Alcance, interacciones y rendimiento de campañas, según los permisos autorizados.",
    url: "https://business.facebook.com/",
    label: "Abrir Meta Business Suite",
    env: ["MIDA_META_ACCESS_TOKEN", "MIDA_META_BUSINESS_ACCOUNT_ID"],
    fields: ["Alcance", "Interacciones", "Campañas", "Resultados"],
  },
] as const;

export default async function AnalyticsPage() {
  await requireKnowledgeAdmin();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin" className="text-sm font-semibold text-mida-primary hover:underline">← Volver al administrador</Link>
        <div className="mt-8">
          <p className="text-sm font-black uppercase tracking-widest text-mida-primary">Reportes de MIDA</p>
          <h1 className="mt-2 text-3xl font-black text-mida-deep">Analítica y SEO</h1>
          <p className="mt-3 max-w-3xl text-slate-600">Panel para consultar el rendimiento de mida.mx en Google y Meta. Los datos aparecerán aquí cuando autoricemos las conexiones de lectura.</p>
        </div>
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-slate-700">
          <strong>Integraciones pendientes.</strong> Esta primera versión no consulta cuentas externas, no guarda credenciales y no muestra cifras simuladas. Las conexiones se habilitarán individualmente tras validar permisos.
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {sources.map((source) => (
            <section key={source.name} className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex-1 p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mida-primary">{source.category}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Sin conectar</span>
                </div>
                <h2 className="mt-5 text-2xl font-black text-mida-deep">{source.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{source.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {source.fields.map((field) => (
                    <div key={field} className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">{field}</p>
                      <p className="mt-2 text-lg font-bold text-slate-500">—</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-100 p-7">
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-mida-deep hover:bg-slate-50">{source.label} ↗</a>
              </div>
            </section>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-500">Siguiente etapa: conectar GA4 y Search Console mediante credenciales de solo lectura en el servidor; posteriormente integrar Meta y habilitar filtros de fechas y reportes comparativos.</p>
      </div>
    </main>
  );
}
