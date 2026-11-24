import { articles } from "./articles";
import { softwareProducts } from "./software";
import { aiTools } from "./ai-tools";

export interface SearchResult {
  type: "article" | "software" | "ai-tool";
  slug: string;
  title: string;
  description: string;
  href: string;
}

export function searchContent(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const articleResults: SearchResult[] = articles
    .filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    )
    .map((a) => ({
      type: "article",
      slug: a.slug,
      title: a.title,
      description: a.excerpt,
      href: `/articles/${a.slug}`,
    }));

  const softwareResults: SearchResult[] = softwareProducts
    .filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q),
    )
    .map((s) => ({
      type: "software",
      slug: s.slug,
      title: s.name,
      description: s.tagline,
      href: `/software/${s.slug}`,
    }));

  const aiToolResults: SearchResult[] = aiTools
    .filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    )
    .map((t) => ({
      type: "ai-tool",
      slug: t.slug,
      title: t.name,
      description: t.tagline,
      href: `/ai-tools/${t.slug}`,
    }));

  return [...articleResults, ...softwareResults, ...aiToolResults];
}
