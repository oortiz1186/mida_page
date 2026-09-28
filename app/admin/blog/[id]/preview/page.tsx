import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function BlogPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase.from("blog_profiles").select("display_name,is_active").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_active) redirect("/admin/login?error=unauthorized");

  const { id } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("id,title,excerpt,content,featured_image_url,featured_image_alt,updated_at,category_id")
    .eq("id", id)
    .maybeSingle();
  if (!post) notFound();

  const { data: category } = post.category_id
    ? await supabase.from("blog_categories").select("name").eq("id", post.category_id).maybeSingle()
    : { data: null };

  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <p className="text-sm font-semibold text-amber-900">Vista previa privada · este artículo todavía no se muestra al público desde aquí.</p>
          <Link href={`/admin/blog/${post.id}`} className="shrink-0 text-sm font-bold text-mida-primary">Volver a editar</Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {category?.name && <p className="text-sm font-bold uppercase tracking-wider text-mida-primary">{category.name}</p>}
        <h1 className="mt-3 text-4xl font-bold leading-tight text-mida-deep md:text-5xl">{post.title}</h1>
        {post.excerpt && <p className="mt-5 text-xl leading-8 text-slate-600">{post.excerpt}</p>}
        <div className="mt-5 flex flex-wrap gap-x-3 text-sm text-slate-500">
          <span>Por {profile.display_name}</span>
          <span>·</span>
          <span>Actualizado {new Date(post.updated_at).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>

        {post.featured_image_url && (
          <img src={post.featured_image_url} alt={post.featured_image_alt || post.title} className="mt-9 max-h-[560px] w-full rounded-2xl object-cover shadow-sm" />
        )}

        <div className="blog-content mt-10 text-[17px] leading-8 text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  );
}
