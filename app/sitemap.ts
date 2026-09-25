import { MetadataRoute } from "next";
import { infoEmpresa } from "../components/config/empresa";
import { seoPages } from "../lib/seoPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = infoEmpresa.dominio;
  const routes = ["", "/servicios", "/contpaqi", "/equipamiento", "/contacto", "/cursos", ...seoPages.map((page) => `/${page.slug}`)];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.includes("contpaqi") ? 0.9 : 0.8,
  }));
}
