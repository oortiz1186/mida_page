import type { Metadata } from "next";
import sanitizeHtml from "sanitize-html";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { infoEmpresa } from "@/components/config/empresa";


export const dynamic = "force-dynamic";
async function getPost(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,slug,excerpt,content,featured_image_url,featured_image_alt,seo_title,seo_description,related_service_slug,published_at,updated_at,category_id,author_id")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) console.error(`[blog/${slug}] Error loading post:`, error);
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || "Artículo del Blog MIDA.";
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      images: post.featured_image_url ? [{ url: post.featured_image_url, alt: post.featured_image_alt || post.title }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: post.featured_image_url ? [post.featured_image_url] : undefined },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { data: category } = post.category_id
    ? await supabase.from("blog_categories").select("name").eq("id", post.category_id).maybeSingle()
    : { data: null };

  const relatedServiceHref = post.related_service_slug ? `/${post.related_service_slug}` : "/contacto";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo_description || post.excerpt || undefined,
    image: post.featured_image_url || undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || undefined,
    author: { "@type": "Organization", name: "MIDA", url: infoEmpresa.dominio },
    publisher: { "@type": "Organization", name: infoEmpresa.nombre, url: infoEmpresa.dominio },
    mainEntityOfPage: `${infoEmpresa.dominio}/blog/${post.slug}`,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          {category?.name && <p className="text-sm font-bold uppercase tracking-wider text-mida-primary">{category.name}</p>}
          <h1 className="mt-3 text-4xl font-bold leading-tight text-mida-deep md:text-5xl">{post.title}</h1>
          {post.excerpt && <p className="mt-5 text-xl leading-8 text-slate-600">{post.excerpt}</p>}
          <div className="mt-5 flex flex-wrap gap-x-3 text-sm text-slate-500">
            <span>Por MIDA</span><span>·</span>
            <span>{post.published_at ? new Date(post.published_at).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }) : ""}</span>
          </div>
          {post.featured_image_url && <img src={post.featured_image_url} alt={post.featured_image_alt || post.title} className="mt-9 max-h-[560px] w-full rounded-2xl object-cover shadow-sm" />}
          <div className="blog-content mt-10 text-[17px] leading-8 text-slate-700" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} />
          <div className="mt-12 rounded-2xl bg-slate-50 p-7">
            <h2 className="text-2xl font-bold text-mida-deep">
              {post.related_service_slug ? "¿Quieres conocer esta solución?" : "¿Necesitas ayuda con tu sistema o infraestructura?"}
            </h2>
            <p className="mt-2 text-slate-600">
              {post.related_service_slug
                ? "Conoce cómo MIDA puede ayudarte con el producto o servicio relacionado con este artículo."
                : "En MIDA podemos ayudarte con CONTPAQi, SQL Server, servidores y soporte TI."}
            </p>
            <a href={relatedServiceHref} className="mt-5 inline-block rounded-full bg-mida-primary px-6 py-3 font-bold text-white">
              {post.related_service_slug ? "Ver producto o servicio" : "Contactar a MIDA"}
            </a>
          </div>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </main>
      <Footer />
    </>
  );
}
