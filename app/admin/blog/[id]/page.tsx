import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostForm from "../PostForm";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase.from("blog_profiles").select("role,is_active").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_active) redirect("/admin/login?error=unauthorized");

  const { id } = await params;
  const [{ data: post }, { data: categories }] = await Promise.all([
    supabase.from("blog_posts").select("id,title,slug,excerpt,content,category_id,status,seo_title,seo_description,related_service_slug").eq("id", id).maybeSingle(),
    supabase.from("blog_categories").select("id,name").eq("is_active", true).order("name"),
  ]);

  if (!post) notFound();
  const query = await searchParams;

  return <main className="min-h-screen bg-slate-50"><PostForm post={post} categories={categories ?? []} isAdmin={profile.role === "admin"} saved={query.saved === "1"} error={query.error} /></main>;
}
