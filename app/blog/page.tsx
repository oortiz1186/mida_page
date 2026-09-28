import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";


export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Blog MIDA | CONTPAQi, SQL, servidores y soporte TI",
  description: "Guías, recomendaciones y novedades sobre CONTPAQi, facturación, nóminas, SQL Server, servidores y soporte TI.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog MIDA", description: "Contenido práctico sobre CONTPAQi y tecnología para empresas.", url: "/blog", type: "website" },
};

export default async function BlogPage() {
  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select("id,title,slug,excerpt,featured_image_url,featured_image_alt,published_at,category_id")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const categoryIds = [...new Set((posts ?? []).map((post) => post.category_id).filter(Boolean))];
  const { data: categories } = categoryIds.length
    ? await supabase.from("blog_categories").select("id,name").in("id", categoryIds)
    : { data: [] as { id: string; name: string }[] };
  const categoryById = new Map((categories ?? []).map((category) => [category.id, category.name]));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-28">
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-wider text-mida-primary">Blog MIDA</p>
            <h1 className="mt-3 text-4xl font-bold text-mida-deep md:text-5xl">Información útil para tu empresa</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">Guías y recomendaciones sobre CONTPAQi, facturación, nóminas, SQL Server, infraestructura y soporte TI.</p>
          </div>

          {!posts?.length ? (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">Próximamente encontrarás nuevos artículos.</div>
          ) : (
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <Link href={`/blog/${post.slug}`}>
                    {post.featured_image_url ? (
                      <img src={post.featured_image_url} alt={post.featured_image_alt || post.title} className="h-56 w-full object-cover" />
                    ) : <div className="h-56 bg-slate-100" />}
                    <div className="p-6">
                      {post.category_id && <p className="text-xs font-bold uppercase tracking-wider text-mida-primary">{categoryById.get(post.category_id)}</p>}
                      <h2 className="mt-2 text-2xl font-bold leading-tight text-mida-deep">{post.title}</h2>
                      {post.excerpt && <p className="mt-3 line-clamp-3 leading-7 text-slate-600">{post.excerpt}</p>}
                      <p className="mt-5 text-sm font-bold text-mida-primary">Leer artículo →</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
