"use client";
import { useRouter } from "next/navigation";
import KnowledgeSourceEditor, {type KnowledgeSourceDraft} from "@/components/admin/KnowledgeSourceEditor";
import {saveKnowledgeSourceAction} from "@/app/admin/conocimientos/actions";
export default function KnowledgeSourceForm({initialValue,id}: {initialValue?: Partial<KnowledgeSourceDraft>; id?: string}) {
 const router = useRouter();
 return <KnowledgeSourceEditor initialValue={initialValue} onSave={async value => { const result = await saveKnowledgeSourceAction(value,id); if (result.ok) router.push("/admin/conocimientos"); return result; }} />;
}
