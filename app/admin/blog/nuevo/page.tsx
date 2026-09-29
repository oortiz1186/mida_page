import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostForm from "../PostForm";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase.from("blog_profiles").select("role,is_active").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_active) redirect("/admin/login?error=unauthorized");

  const { data: categories } = await supabase.from("blog_categories").select("id,name").eq("is_active", true).order("name");
  const params = await searchParams;

  return <main className="min-h-screen bg-slate-50"><PostForm categories={categories ?? []} isAdmin={profile.role === "admin"} error={params.error} /></main>;
}
