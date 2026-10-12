"use server";

import { revalidatePath } from "next/cache";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";
import { saveKnowledgeArticleForAdmin } from "@/lib/knowledge-admin";
import { saveKnowledgeSourceForAdmin } from "@/lib/knowledge-sources-admin";

/**
 * Every invocation checks the authenticated Supabase user and admin role.
 * Never accept a caller-supplied administrative context.
 */
export async function saveKnowledgeArticleAction(
  input: unknown,
  existingId?: string,
) {
  const context = await requireKnowledgeAdmin();
  const result = await saveKnowledgeArticleForAdmin(context, input, existingId);
  if (result.ok) revalidatePath("/admin/conocimientos");
  return result;
}

export async function saveKnowledgeSourceAction(
  input: unknown,
  existingId?: string,
) {
  const context = await requireKnowledgeAdmin();
  const result = await saveKnowledgeSourceForAdmin(context, input, existingId);
  if (result.ok) revalidatePath("/admin/conocimientos");
  return result;
}
