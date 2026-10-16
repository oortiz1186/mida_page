import type { Metadata } from "next";
import Link from "next/link";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";
import { listKnowledgeSourcesForAdmin } from "@/lib/knowledge-sources-admin";
import KnowledgePdfUpload from "@/components/admin/KnowledgePdfUpload";
import { listKnowledgeArticlesForAdmin } from "@/lib/knowledge-admin";
import KnowledgeSourceListClient from "@/components/admin/KnowledgeSourceListClient";

export const metadata: Metadata = {
  title: "Fuentes IA | Administración MIDA",
  robots: { index: false, follow: false },
};

export default async function KnowledgeAdminPage() {
  const context = await requireKnowledgeAdmin();
  const [sources, articles] = await Promise.all([listKnowledgeSourcesForAdmin(context),listKnowledgeArticlesForAdmin(context)]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link href="/admin" className="text-sm text-blue-700 underline">← Volver al administrador</Link>
        <header>
          <h1 className="text-3xl font-bold">Fuentes IA</h1>
          <p className="mt-2 text-slate-600">El asistente aprovechará los artículos publicados del Blog MIDA. Aquí se administran las fuentes de referencia; no es necesario duplicar artículos.</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-5"><p className="text-sm text-slate-600">Fuentes registradas</p><p className="text-3xl font-bold">{sources.length}</p></div>
          <div className="rounded-xl border bg-white p-5">
            <p className="font-semibold">Artículos del Blog MIDA</p>
            <p className="mt-1 text-sm text-slate-600">Se administran desde el módulo Blog, sin duplicarlos.</p>
            <Link href="/admin/blog" className="mt-3 inline-block text-blue-700 underline">Ir al Blog</Link>
          </div>
        </div>
        <KnowledgePdfUpload />
        <section className="rounded-xl border bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Artículos IA y textos extraídos</h2>
            <Link href="/admin/conocimientos/articulos/nuevo" className="text-blue-700 underline">Nuevo artículo IA</Link>
          </div>
          <p className="mt-2 text-sm text-slate-600">Los PDF se guardan como borrador. Para utilizarlos en el chatbot, revisa el texto, registra la fecha de revisión de la fuente y publica el artículo.</p>
          <div className="mt-4 space-y-2">{articles.map(article => <div key={article.id} className="flex flex-wrap items-center justify-between gap-3 border-b py-3"><div><p className="font-semibold">{article.title}</p><p className="text-xs text-slate-500">{article.status === "published" ? "Publicado" : article.status === "draft" ? "Borrador" : "Archivado"}</p></div><Link className="text-blue-700 underline" href={`/admin/conocimientos/articulos/${article.id}`}>Revisar / editar</Link></div>)}</div>
          {!articles.length && <p className="mt-3 text-sm text-slate-500">Todavía no hay artículos IA.</p>}
        </section>
        <KnowledgeSourceListClient sources={sources} />
      </div>
    </main>
  );
}
