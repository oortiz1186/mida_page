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

type BlogSearchParams = Promise<{ q?: string; categoria?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: BlogSearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const selectedCategory = (params.categoria ?? "").trim();

  const { data: categories, error: categoriesError } = await supabase
    .from("blog_categories")
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (categoriesError) console.error("[blog] Error loading categories:", categoriesError);

  const category = (categories ?? []).find((item) => item.slug === selectedCategory);

  let postsQuery = supabase
    .from("blog_posts")
    .select("id,title,slug,excerpt,featured_image_url,featured_image_alt,published_at,category_id")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (category) postsQuery = postsQuery.eq("category_id", category.id);
  if (query) {
    const safeQuery = query.replace(/[%_,()]/g, " ").replace(/\s+/g, " ").trim();
    if (safeQuery) postsQuery = postsQuery.or(`title.ilike.%${safeQuery}%,excerpt.ilike.%${safeQuery}%`);
  }

  const { data: posts, error: postsError } = await postsQuery;
  if (postsError) console.error("[blog] Error loading posts:", postsError);

  const categoryById = new Map((categories ?? []).map((item) => [item.id, item.name]));
  const buildHref = (categoria?: string) => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (categoria) next.set("categoria", categoria);
    const qs = next.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

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

          <div className="mt-9 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <form action="/blog" method="get" className="flex flex-col gap-3 md:flex-row">
              {selectedCategory && <input type="hidden" name="categoria" value={selectedCategory} />}
              <label htmlFor="blog-search" className="sr-only">Buscar artículos</label>
              <input id="blog-search" name="q" defaultValue={query} placeholder="Buscar artículos..." className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-mida-primary focus:ring-2 focus:ring-mida-primary/20" />
              <button type="submit" className="rounded-xl bg-mida-primary px-6 py-3 font-bold text-white transition hover:opacity-90">Buscar</button>
              {(query || selectedCategory) && <Link href="/blog" className="rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-600 transition hover:bg-slate-50">Limpiar</Link>}
            </form>

            <div className="mt-5 flex flex-wrap gap-2" aria-label="Filtrar por categoría">
              <Link href={buildHref()} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!selectedCategory ? "bg-mida-deep text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Todos</Link>
              {(categories ?? []).map((item) => (
                <Link key={item.id} href={buildHref(item.slug)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedCategory === item.slug ? "bg-mida-deep text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {postsError ? (
            <div className="mt-12 rounded-2xl border border-red-200 bg-white p-10 text-center text-slate-600">No pudimos cargar los artículos en este momento.</div>
          ) : !posts?.length ? (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="font-semibold text-slate-700">{query || selectedCategory ? "No encontramos artículos con esos filtros." : "Próximamente encontrarás nuevos artículos."}</p>
              {(query || selectedCategory) && <Link href="/blog" className="mt-4 inline-block font-bold text-mida-primary">Ver todos los artículos →</Link>}
            </div>
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
