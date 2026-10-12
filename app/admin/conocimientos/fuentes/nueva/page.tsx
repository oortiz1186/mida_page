import Link from "next/link";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";
import KnowledgeSourceForm from "@/components/admin/KnowledgeSourceForm";

export default async function NewKnowledgeSourcePage() {
  await requireKnowledgeAdmin();
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link href="/admin/conocimientos" className="text-blue-700 underline">← Volver a conocimientos</Link>
        <KnowledgeSourceForm />
      </div>
    </main>
  );
}
