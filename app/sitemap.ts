import { MetadataRoute } from "next";
import { infoEmpresa } from "../components/config/empresa";
import { seoPages } from "../lib/seoPages";
import { supabase } from "../lib/supabase";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = infoEmpresa.dominio.replace(/\/$/, "");
  const routes = ["", "/servicios", "/contpaqi", "/equipamiento", "/contacto", "/cursos", "/promociones", ...seoPages.map((page) => `/${page.slug}`)];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route.includes("contpaqi") ? 0.9 : 0.8,
  }));

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug,updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[sitemap] Error loading published blog posts:", error);
  }

  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...(posts ?? []).map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const { data: promotions, error: promotionsError } = await supabase
    .from("commercial_notices")
    .select("slug,updated_at")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (promotionsError) console.error("[sitemap] Error loading published promotions:", promotionsError);

  const promotionEntries: MetadataRoute.Sitemap = (promotions ?? []).map((promotion) => ({
    url: `${baseUrl}/promociones/${promotion.slug}`,
    lastModified: promotion.updated_at ? new Date(promotion.updated_at) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries, ...promotionEntries];
}
