import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Uses the existing MIDA Supabase session and blog_profiles authorization.
 * Never trusts a role or user id received from the browser.
 */
export async function requireKnowledgeAdmin() {
  const client = await createClient();
  const { data: { user }, error: authError } = await client.auth.getUser();
  if (authError || !user) redirect("/admin/login");

  const { data: profile, error: profileError } = await client
    .from("blog_profiles")
    .select("role,is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError || !profile?.is_active || profile.role !== "admin") {
    redirect("/admin?error=forbidden");
  }

  return { userId: user.id, isAuthorizedAdmin: true as const };
}
