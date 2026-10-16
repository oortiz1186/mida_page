import Link from "next/link";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";
import { listKnowledgeSourcesForAdmin } from "@/lib/knowledge-sources-admin";
import KnowledgeArticleForm from "@/components/admin/KnowledgeArticleForm";

export default async function NewKnowledgeArticlePage() {
  const context = await requireKnowledgeAdmin();
  const sources = await listKnowledgeSourcesForAdmin(context);
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link href="/admin/conocimientos" className="text-blue-700 underline">← Volver a conocimientos</Link>
        <KnowledgeArticleForm sources={sources} />
      </div>
    </main>
  );
}
