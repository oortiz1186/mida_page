import "server-only";
import { supabase } from "@/lib/supabase";
import type { KnowledgeArticle } from "@/lib/knowledge";

const STOPWORDS = new Set(["para","como","cual","cuanto","quiero","necesito","tengo","sobre","contpaqi","ayuda","puedo","entre","desde","donde","porque","precio","precios","sistema","sistemas","este","esta","hacer","usar","tiene","puede"]);

export function knowledgeTokens(question: string): string[] {
  return Array.from(new Set(question.slice(0, 250).toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ").split(/\s+/)
    .filter(word => word.length >= 3 && !STOPWORDS.has(word)))).slice(0, 6);
}

function normalized(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function relevance(article: KnowledgeArticle, tokens: string[]) {
  const title = normalized(article.title);
  const product = normalized(article.product ?? "");
  const content = normalized(article.content);
  return tokens.reduce((score, token) =>
    score + (title.includes(token) ? 6 : 0)
          + (product.includes(token) ? 5 : 0)
          + (content.includes(token) ? 1 : 0), 0);
}

/** Search is server-only. Results must be treated as untrusted reference data. */
export async function searchKnowledge(question: string, limit = 5): Promise<KnowledgeArticle[]> {
  const tokens = knowledgeTokens(question);
  if (!tokens.length) return [];
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(10, Math.trunc(limit))) : 5;
  const filters = tokens.flatMap(token => [
    `title.ilike.%${token}%`,
    `product.ilike.%${token}%`,
    `content.ilike.%${token}%`,
  ]).join(",");
  const { data, error } = await supabase.from("knowledge_articles")
    .select("id,title,slug,category,product,product_version,content,status,source_id,reviewed_at,updated_at")
    .eq("status", "published")
    .not("source_id", "is", null)
    .not("reviewed_at", "is", null)
    .or(filters)
    .limit(60);
  if (error) {
    console.error("Error buscando conocimiento:", error.code);
    return [];
  }
  return ((data ?? []) as KnowledgeArticle[])
    .map(article => ({ article, score: relevance(article, tokens) }))
    .filter(entry => entry.score >= 5)
    .sort((a, b) => b.score - a.score || (b.article.reviewed_at ?? "").localeCompare(a.article.reviewed_at ?? ""))
    .slice(0, safeLimit).map(entry => entry.article);
}
