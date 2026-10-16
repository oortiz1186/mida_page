import "server-only";
import { supabase } from "@/lib/supabase";

export const KNOWLEDGE_CATEGORIES = [
  "producto", "comparativa", "licenciamiento", "precio",
  "promocion", "faq", "soporte",
] as const;
export type KnowledgeCategory = (typeof KNOWLEDGE_CATEGORIES)[number];
export type KnowledgeStatus = "draft" | "published" | "archived";

export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  category: KnowledgeCategory;
  product: string | null;
  product_version: string | null;
  content: string;
  status: KnowledgeStatus;
  source_id: string | null;
  reviewed_at: string | null;
  updated_at: string;
}

export function validateKnowledgeArticle(input: unknown): {
  valid: boolean;
  errors: string[];
} {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { valid: false, errors: ["Se requiere un artículo válido."] };
  }
  const article = input as Record<string, unknown>;
  const errors: string[] = [];
  if (typeof article.title !== "string" || article.title.trim().length < 5 || article.title.length > 180)
    errors.push("El título debe tener entre 5 y 180 caracteres.");
  if (typeof article.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) || article.slug.length > 180)
    errors.push("El slug debe usar letras minúsculas, números y guiones.");
  if (!KNOWLEDGE_CATEGORIES.includes(article.category as KnowledgeCategory))
    errors.push("Categoría no válida.");
  if (typeof article.content !== "string" || article.content.trim().length < 30 || article.content.length > 50000)
    errors.push("El contenido debe tener entre 30 y 50000 caracteres.");
  if (!["draft", "published", "archived"].includes(article.status as string))
    errors.push("Estado no válido.");
  if (article.status === "published" && (!article.source_id || !article.reviewed_at))
    errors.push("Publicar requiere fuente y fecha de revisión.");
  return { valid: errors.length === 0, errors };
}

/** Solo para llamadas server-side. Nunca exponer la service_role en el cliente. */
export async function findPublishedKnowledge(query: string, limit = 5): Promise<KnowledgeArticle[]> {
  const search = query.trim().slice(0, 120);
  if (search.length < 3) return [];
  const safeLimit = Math.min(Math.max(Math.trunc(limit), 1), 10);
  // Escape characters that can alter the PostgREST filter expression.
  const stopwords = new Set(["para", "como", "cual", "cuanto", "quiero", "necesito", "tengo", "sobre", "contpaqi", "ayuda", "puedo", "entre", "desde", "donde", "porque", "precio", "precios"]);
  const tokens = search
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 3 && !stopwords.has(token))
    .slice(0, 5);
  if (!tokens.length) return [];
  const filters = tokens.flatMap((token) => [
    `title.ilike.%${token}%`,
    `content.ilike.%${token}%`,
    `product.ilike.%${token}%`,
  ]).join(",");
  const { data, error } = await supabase
    .from("knowledge_articles")
    .select("id,title,slug,category,product,product_version,content,status,source_id,reviewed_at,updated_at")
    .eq("status", "published")
    .or(filters)
    .order("reviewed_at", { ascending: false })
    .limit(safeLimit);
  if (error) {
    console.error("Error consultando conocimiento publicado:", error.code);
    return [];
  }
  return (data ?? []) as KnowledgeArticle[];
}
