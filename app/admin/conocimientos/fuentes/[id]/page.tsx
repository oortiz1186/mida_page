import Link from "next/link";
import { notFound } from "next/navigation";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";
import { supabase } from "@/lib/supabase";
import KnowledgeSourceForm from "@/components/admin/KnowledgeSourceForm";

export default async function EditKnowledgeSourcePage({
  params,
}: { params: Promise<{ id: string }> }) {
  await requireKnowledgeAdmin();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { data, error } = await supabase.from("knowledge_sources")
    .select("id,title,source_type,url,product,version,reviewed_at")
    .eq("id", id).maybeSingle();
  if (error || !data) notFound();
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link href="/admin/conocimientos" className="text-blue-700 underline">← Volver a conocimientos</Link>
        <KnowledgeSourceForm id={data.id} initialValue={{
          title: data.title,
          source_type: data.source_type,
          url: data.url ?? "",
          product: data.product ?? "",
          version: data.version ?? "",
          reviewed_at: data.reviewed_at?.slice(0, 10) ?? "",
        }} />
      </div>
    </main>
  );
}
