"use client";
import { useRouter } from "next/navigation";
import KnowledgeArticleEditor, {type KnowledgeArticleDraft} from "@/components/admin/KnowledgeArticleEditor";
import {saveKnowledgeArticleAction} from "@/app/admin/conocimientos/actions";
export default function KnowledgeArticleForm({initialValue,id,sources}: {
 initialValue?: Partial<KnowledgeArticleDraft>; id?: string;
 sources: {id:string;title:string;reviewed_at:string|null}[];
}) {
 const router = useRouter();
 return <KnowledgeArticleEditor initialValue={initialValue} sources={sources}
  onSave={async value => { const result = await saveKnowledgeArticleAction(value,id); if (result.ok) router.push("/admin/conocimientos"); return result; }} />;
}
