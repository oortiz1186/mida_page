"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const field = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const slugify = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);

export async function saveSuccessStory(form: FormData) {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await client.from("blog_profiles").select("is_active,role").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_active || profile.role !== "admin") redirect("/admin?error=forbidden");
  const id = field(form, "id");
  const title = field(form, "title");
  const slug = slugify(field(form, "slug") || title);
  const status = field(form, "status") || "draft";
  const consent = form.get("consent_confirmed") === "on";
  const clientName = field(form, "client_name");
  const challenge = field(form, "challenge");
  const solution = field(form, "solution");
  const results = field(form, "results");
  if (!title || !slug || !["draft","published","archived"].includes(status) ||
    (status === "published" && (!consent || !clientName || !challenge || !solution || !results))) {
    redirect("/admin/casos-de-exito?error=invalid");
  }
  const payload = { title, slug, client_name: clientName || null, client_logo_url: field(form,"client_logo_url") || null,
    sector: field(form,"sector") || null, challenge: challenge || null, solution: solution || null,
    results: results || null, testimonial: field(form,"testimonial") || null,
    consent_confirmed: consent, status, updated_at: new Date().toISOString() };
  const query = id
    ? client.from("mida_success_stories").update(payload).eq("id", id)
    : client.from("mida_success_stories").insert(payload);
  const { error } = await query;
  if (error) { console.error("[success-stories] Save failed", error.code); redirect("/admin/casos-de-exito?error=save"); }
  revalidatePath("/"); revalidatePath("/casos-de-exito"); revalidatePath("/admin/casos-de-exito");
  redirect("/admin/casos-de-exito?saved=1");
}
