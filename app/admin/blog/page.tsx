import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const statusLabel: Record<string, string> = {
  draft: "Borrador",
  published: "Publicado",
  archived: "Archivado",
};

export default async function BlogAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase.from("blog_profiles").select("is_active").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_active) redirect("/admin/login?error=unauthorized");

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id,title,slug,status,updated_at,blog_categories(name)")
    .order("updated_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="text-sm font-semibold text-mida-primary">← Panel</Link>
            <h1 className="mt-2 text-3xl font-bold text-mida-deep">Artículos</h1>
            <p className="mt-2 text-slate-600">Administra el contenido del Blog MIDA.</p>
          </div>
          <Link href="/admin/blog/nuevo" className="rounded-xl bg-mida-primary px-5 py-3 font-bold text-white hover:bg-mida-deep">Nuevo artículo</Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {!posts?.length ? (
            <div className="p-10 text-center text-slate-600">Todavía no hay artículos. Crea el primero para comenzar.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {posts.map((post) => {
                const category = Array.isArray(post.blog_categories) ? post.blog_categories[0]?.name : post.blog_categories?.name;
                return (
                  <Link key={post.id} href={`/admin/blog/${post.id}`} className="grid gap-2 p-5 transition hover:bg-slate-50 md:grid-cols-[1fr_180px_150px] md:items-center">
                    <div>
                      <p className="font-bold text-slate-900">{post.title}</p>
                      <p className="mt-1 text-sm text-slate-500">/{post.slug}{category ? ` · ${category}` : ""}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-600">{statusLabel[post.status] ?? post.status}</span>
                    <span className="text-sm text-slate-500">{new Date(post.updated_at).toLocaleDateString("es-MX")}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
