import "server-only";
import { supabase } from "@/lib/supabase";
import type { KnowledgeAdminContext } from "@/lib/knowledge-admin";

/**
 * Backend-only source management.
 * IMPORTANT: The calling route must validate the existing administrator session
 * and role on the server. This module does not authenticate the caller.
 */
function requireAdmin(context: KnowledgeAdminContext) {
  if (!context || context.isAuthorizedAdmin !== true || !context.userId?.trim()) {
    throw new Error("Acceso administrativo no autorizado.");
  }
}

export type KnowledgeSourceInput = {
  title: string;
  source_type: "official_url" | "manual" | "internal" | "faq";
  url?: string | null;
  product?: string | null;
  version?: string | null;
  reviewed_at?: string | null;
};

export function validateKnowledgeSource(input: unknown): string[] {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return ["La fuente debe ser un objeto."];
  const source = input as Record<string, unknown>;
  const errors: string[] = [];
  if (typeof source.title !== "string" || source.title.trim().length < 5 || source.title.length > 180)
    errors.push("El título debe tener entre 5 y 180 caracteres.");
  if (!["official_url", "manual", "internal", "faq"].includes(String(source.source_type)))
    errors.push("El tipo de fuente no es válido.");
  if (source.source_type === "official_url" && !source.url)
    errors.push("Una fuente oficial requiere URL.");
  if (source.url != null && source.url !== "") {
    try {
      const url = new URL(String(source.url));
      if (url.protocol !== "https:" || url.username || url.password || url.href.length > 2048)
        errors.push("La URL debe ser HTTPS, sin credenciales y de hasta 2048 caracteres.");
    } catch {
      errors.push("La URL no es válida.");
    }
  }
  if (source.reviewed_at != null && source.reviewed_at !== "") {
    if (typeof source.reviewed_at !== "string" ||
        !Number.isFinite(Date.parse(source.reviewed_at)) ||
        Date.parse(source.reviewed_at) > Date.now())
      errors.push("La fecha de revisión no es válida.");
  }
  for (const field of ["product", "version"] as const) {
    if (source[field] != null && (typeof source[field] !== "string" || source[field].length > 120))
      errors.push(`El campo ${field} debe ser texto de hasta 120 caracteres.`);
  }
  return errors;
}

export async function listKnowledgeSourcesForAdmin(context: KnowledgeAdminContext) {
  requireAdmin(context);
  const { data, error } = await supabase.from("knowledge_sources")
    .select("id,title,source_type,url,product,version,reviewed_at,created_at")
    .order("created_at", { ascending: false }).limit(100);
  if (error) throw new Error("No se pudieron consultar las fuentes.");
  return (data ?? []) as Array<{
    id: string;
    title: string;
    source_type: KnowledgeSourceInput["source_type"];
    url: string | null;
    product: string | null;
    version: string | null;
    reviewed_at: string | null;
    created_at: string;
  }>;
}

export async function saveKnowledgeSourceForAdmin(
  context: KnowledgeAdminContext,
  input: unknown,
  existingId?: string,
) {
  requireAdmin(context);
  const errors = validateKnowledgeSource(input);
  if (errors.length) return { ok: false as const, errors };
  const source = input as KnowledgeSourceInput;
  const payload = {
    title: source.title.trim(),
    source_type: source.source_type,
    url: source.url?.trim() || null,
    product: source.product?.trim() || null,
    version: source.version?.trim() || null,
    reviewed_at: source.reviewed_at || null,
  };
  const query = existingId
    ? supabase.from("knowledge_sources").update(payload).eq("id", existingId)
    : supabase.from("knowledge_sources").insert(payload);
  const { data, error } = await query.select("id").single();
  if (error) return { ok: false as const, errors: ["No se pudo guardar la fuente."] };
  return { ok: true as const, id: data.id as string };
}
