import "server-only";
import { supabase } from "@/lib/supabase";
import { findPublishedKnowledge } from "@/lib/knowledge";
import type { KnowledgeArticle } from "@/lib/knowledge";

const STOPWORDS = new Set(["para","como","cual","cuanto","quiero","necesito","tengo","sobre","contpaqi","ayuda","puedo","entre","desde","donde","porque","precio","precios","sistema","sistemas","este","esta","hacer","usar","tiene","puede","empresa","empresas","los","las","una","que","por","del","con","mas","informacion","saber","explica"]);

export function knowledgeTokens(question: string): string[] {
  return Array.from(new Set(question.slice(0, 250).toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ").split(/\s+/)
    .filter(word => word.length >= 3 && !STOPWORDS.has(word)))).slice(0, 6);
}

function normalized(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function plainText(html: string) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ").trim();
}

/** Lee el Blog MIDA sin copiar artículos a knowledge_articles.
 * Sólo contenido publicado; se devuelve como referencia no confiable para el modelo.
 */
export async function searchKnowledge(question: string, limit = 5): Promise<KnowledgeArticle[]> {
  const tokens = knowledgeTokens(question);
  if (!tokens.length) return [];
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(10, Math.trunc(limit))) : 5;
  // Recuperamos un conjunto acotado de publicaciones y comparamos sin acentos
  // en JavaScript. ILIKE sobre texto original no garantiza coincidencia
  // entre "automatizacion" y "automatización".
  const { data, error } = await supabase.from("blog_posts")
    .select("id,title,slug,excerpt,content,status,published_at,updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(100);
  if (error) {
    console.error("Error buscando artículos publicados del blog:", error.code);
    return [];
  }
  const blogResults = (data ?? []).map(post => {
    const content = plainText(String(post.content ?? ""));
    const excerpt = plainText(String(post.excerpt ?? ""));
    const titleText = normalized(String(post.title ?? ""));
    const excerptText = normalized(excerpt);
    const contentText = normalized(content);
    const titleMatches = tokens.filter(token => titleText.includes(token)).length;
    const excerptMatches = tokens.filter(token => excerptText.includes(token)).length;
    const contentMatches = tokens.filter(token => contentText.includes(token)).length;
    // La coincidencia en título prevalece; una mención aislada en el cuerpo
    // no convierte un artículo de otro tema en una referencia relevante.
    const score = titleMatches * 10 + excerptMatches * 3 + contentMatches;
    const article: KnowledgeArticle = {
      id: post.id, title: post.title, slug: post.slug,
      category: "faq", product: null, product_version: null,
      content: `Origen: https://mida.mx/blog/${post.slug}\\n${excerpt}\\n${content}`.slice(0, 7000),
      status: "published", source_id: null,
      reviewed_at: post.published_at ?? null, updated_at: post.updated_at,
    };
    return { article, score, titleMatches, excerptMatches, contentMatches };
  }).filter(item => item.titleMatches > 0 || item.excerptMatches > 0 || item.contentMatches >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, safeLimit).map(item => item.article);\n  const aiArticles = await findPublishedKnowledge(question, safeLimit);\n  return [...aiArticles, ...blogResults].slice(0, safeLimit);
}
