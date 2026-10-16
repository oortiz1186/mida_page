"use client";
import { useRouter } from "next/navigation";
import KnowledgeArticleList from "./KnowledgeArticleList";
import KnowledgeSourceList from "./KnowledgeSourceList";

type Article = {
 id: string; title: string; category: string; product: string | null;
 status: "draft" | "published" | "archived";
 reviewed_at: string | null; updated_at: string;
};
type Source = {
 id: string; title: string; source_type: "official_url" | "manual" | "internal" | "faq";
 url: string | null; product: string | null; version: string | null; reviewed_at: string | null;
};

export default function KnowledgeDashboardLists({articles, sources}: {articles: Article[]; sources: Source[]}) {
 const router = useRouter();
 return <div className="space-y-8">
  <KnowledgeArticleList articles={articles}
   onNew={() => router.push("/admin/conocimientos/articulos/nuevo")}
   onEdit={id => router.push("/admin/conocimientos/articulos/" + id)} />
  <KnowledgeSourceList sources={sources}
   onNew={() => router.push("/admin/conocimientos/fuentes/nueva")}
   onEdit={id => router.push("/admin/conocimientos/fuentes/" + id)} />
 </div>;
}
