"use client";
import KnowledgeSourceEditor, {type KnowledgeSourceDraft} from "@/components/admin/KnowledgeSourceEditor";
import {saveKnowledgeSourceAction} from "@/app/admin/conocimientos/actions";
export default function KnowledgeSourceForm({initialValue,id}: {initialValue?: Partial<KnowledgeSourceDraft>; id?: string}) {
 return <KnowledgeSourceEditor initialValue={initialValue} onSave={value => saveKnowledgeSourceAction(value,id)} />;
}
