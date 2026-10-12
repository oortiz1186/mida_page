import KnowledgeDashboardLists from "@/components/admin/KnowledgeDashboardLists";
import type { Metadata } from "next";
import Link from "next/link";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";
import { listKnowledgeArticlesForAdmin } from "@/lib/knowledge-admin";
import { listKnowledgeSourcesForAdmin } from "@/lib/knowledge-sources-admin";

export const metadata: Metadata = {
  title: "Conocimientos IA | Administración MIDA",
  robots: { index: false, follow: false },
};

export default async function KnowledgeAdminPage() {
  const context = await requireKnowledgeAdmin();
  const [articles, sources] = await Promise.all([
    listKnowledgeArticlesForAdmin(context),
    listKnowledgeSourcesForAdmin(context),
  ]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link href="/admin" className="text-sm text-blue-700 underline">← Volver al administrador</Link>
        <header>
          <h1 className="text-3xl font-bold">Conocimientos IA</h1>
          <p className="mt-2 text-slate-600">Fuentes y artículos revisados para el asistente de MIDA.</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5"><p className="text-sm text-slate-600">Artículos</p><p className="text-3xl font-bold">{articles.length}</p></div>
          <div className="rounded-xl border bg-white p-5"><p className="text-sm text-slate-600">Publicados</p><p className="text-3xl font-bold">{articles.filter(a => a.status === "published").length}</p></div>
          <div className="rounded-xl border bg-white p-5"><p className="text-sm text-slate-600">Fuentes</p><p className="text-3xl font-bold">{sources.length}</p></div>
        </div>
        <KnowledgeDashboardLists articles={articles} sources={sources} />
      </div>
    </main>
  );
}
