"use client";
import KnowledgeArticleEditor, {type KnowledgeArticleDraft} from "@/components/admin/KnowledgeArticleEditor";
import {saveKnowledgeArticleAction} from "@/app/admin/conocimientos/actions";
export default function KnowledgeArticleForm({initialValue,id,sources}: {
 initialValue?: Partial<KnowledgeArticleDraft>; id?: string;
 sources: {id:string;title:string;reviewed_at:string|null}[];
}) {
 return <KnowledgeArticleEditor initialValue={initialValue} sources={sources}
  onSave={value => saveKnowledgeArticleAction(value,id)} />;
}
