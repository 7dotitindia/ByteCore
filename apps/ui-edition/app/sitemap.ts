import type { MetadataRoute } from "next";
import { articles, authors, categories, aiTools, softwareProducts } from "@bytescope/content";
import { defaultConfig } from "@bytescope/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultConfig.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/search`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/software`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/ai-tools`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/articles/${a.slug}`,
    lastModified: a.updatedAt ?? a.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${siteUrl}/authors/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const softwareRoutes: MetadataRoute.Sitemap = softwareProducts.map((s) => ({
    url: `${siteUrl}/software/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const aiToolRoutes: MetadataRoute.Sitemap = aiTools.map((t) => ({
    url: `${siteUrl}/ai-tools/${t.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes, ...authorRoutes, ...softwareRoutes, ...aiToolRoutes];
}
