import Link from "next/link";
import { notFound } from "next/navigation";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";
import { listKnowledgeSourcesForAdmin } from "@/lib/knowledge-sources-admin";
import { supabase } from "@/lib/supabase";
import KnowledgeArticleForm from "@/components/admin/KnowledgeArticleForm";

export default async function EditKnowledgeArticlePage({
  params,
}: { params: Promise<{ id: string }> }) {
  const context = await requireKnowledgeAdmin();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const [{ data, error }, sources] = await Promise.all([
    supabase.from("knowledge_articles")
      .select("id,title,slug,category,product,product_version,content,status,source_id,reviewed_at")
      .eq("id", id).maybeSingle(),
    listKnowledgeSourcesForAdmin(context),
  ]);
  if (error || !data) notFound();
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link href="/admin/conocimientos" className="text-blue-700 underline">← Volver a conocimientos</Link>
        <KnowledgeArticleForm id={data.id} sources={sources} initialValue={{
          title: data.title,
          slug: data.slug,
          category: data.category,
          product: data.product ?? "",
          product_version: data.product_version ?? "",
          content: data.content,
          status: data.status,
          source_id: data.source_id ?? "",
          reviewed_at: data.reviewed_at?.slice(0, 10) ?? "",
        }} />
      </div>
    </main>
  );
}
