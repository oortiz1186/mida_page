"use client";
import { useRouter } from "next/navigation";
import KnowledgeSourceList from "./KnowledgeSourceList";

type Source = {
  id: string;
  title: string;
  source_type: "official_url" | "manual" | "internal" | "faq";
  url: string | null;
  product: string | null;
  version: string | null;
  reviewed_at: string | null;
};

export default function KnowledgeSourceListClient({ sources }: { sources: Source[] }) {
  const router = useRouter();
  return (
    <KnowledgeSourceList
      sources={sources}
      onNew={() => router.push("/admin/conocimientos/fuentes/nueva")}
      onEdit={(id) => router.push("/admin/conocimientos/fuentes/" + id)}
    />
  );
}
