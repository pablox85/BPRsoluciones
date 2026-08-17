import type { MetadataRoute } from "next";
import { blogArticles, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/servicios",
    "/blog",
    "/contacto",
    ...blogArticles.map((article) => `/blog/${article.slug}`),
  ];
  const now = new Date();

  return pages.map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/blog/") ? 0.7 : 0.8,
  }));
}
