import "server-only";
import { supabase } from "@/lib/supabase";
import { validateKnowledgeArticle } from "@/lib/knowledge";

/**
 * Server-only admin operations. Caller MUST establish an authenticated admin
 * using the existing app's authorization flow BEFORE invoking these methods.
 * Do not expose these functions directly through public API routes.
 */
export type KnowledgeAdminContext = { userId: string; isAuthorizedAdmin: true };

function assertAdmin(context: KnowledgeAdminContext) {
  if (!context || context.isAuthorizedAdmin !== true || !context.userId?.trim()) {
    throw new Error("Acceso administrativo no autorizado.");
  }
}

export async function listKnowledgeArticlesForAdmin(context: KnowledgeAdminContext) {
  assertAdmin(context);
  const { data, error } = await supabase
    .from("knowledge_articles")
    .select("id,title,slug,category,product,status,source_id,reviewed_at,updated_at")
    .order("updated_at", { ascending: false })
    .limit(100);
  if (error) throw new Error("No se pudieron consultar los artículos.");
  return data ?? [];
}

export async function saveKnowledgeArticleForAdmin(
  context: KnowledgeAdminContext,
  input: unknown,
  existingId?: string,
) {
  assertAdmin(context);
  const result = validateKnowledgeArticle(input);
  if (!result.valid) return { ok: false as const, errors: result.errors };
  const article = input as Record<string, unknown>;
  // A published article must reference a source actually present in the DB.
  if (article.status === "published") {
    const sourceId = article.source_id;
    if (typeof sourceId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sourceId)) {
      return { ok: false as const, errors: ["La fuente debe tener un identificador válido."] };
    }
    const { data: source, error: sourceError } = await supabase
      .from("knowledge_sources")
      .select("id,reviewed_at")
      .eq("id", sourceId)
      .maybeSingle();
    if (sourceError || !source || !source.reviewed_at) {
      return { ok: false as const, errors: ["La fuente debe existir y estar revisada antes de publicar."] };
    }
    const reviewedAt = article.reviewed_at;
    if (typeof reviewedAt !== "string" || !Number.isFinite(Date.parse(reviewedAt)) || Date.parse(reviewedAt) > Date.now()) {
      return { ok: false as const, errors: ["La fecha de revisión del artículo no es válida."] };
    }
  }
  const payload = {
    title: String(article.title).trim(),
    slug: String(article.slug).trim(),
    category: article.category,
    product: typeof article.product === "string" ? article.product.trim() : null,
    product_version: typeof article.product_version === "string" ? article.product_version.trim() : null,
    content: String(article.content).trim(),
    status: article.status,
    source_id: article.source_id || null,
    reviewed_at: article.reviewed_at || null,
    updated_at: new Date().toISOString(),
  };
  const query = existingId
    ? supabase.from("knowledge_articles").update(payload).eq("id", existingId)
    : supabase.from("knowledge_articles").insert(payload);
  const { data, error } = await query.select("id").single();
  if (error) return { ok: false as const, errors: ["No se pudo guardar el artículo. Revisa el origen, slug y permisos."] };
  return { ok: true as const, id: data.id as string };
}
