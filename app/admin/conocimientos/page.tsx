import type { Metadata } from "next";
import Link from "next/link";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";
import { listKnowledgeSourcesForAdmin } from "@/lib/knowledge-sources-admin";
import KnowledgeSourceListClient from "@/components/admin/KnowledgeSourceListClient";

export const metadata: Metadata = {
  title: "Fuentes IA | Administración MIDA",
  robots: { index: false, follow: false },
};

export default async function KnowledgeAdminPage() {
  const context = await requireKnowledgeAdmin();
  const sources = await listKnowledgeSourcesForAdmin(context);

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
        <KnowledgeSourceListClient sources={sources} />
      </div>
    </main>
  );
}
