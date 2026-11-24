import type { Category } from "./types";

export const categories: Category[] = [
  { slug: "technology", name: "Technology", description: "Deep reporting on the systems shaping the industry." },
  { slug: "ai-innovation", name: "AI & Innovation", description: "Curated coverage of AI tools, research and product launches." },
  { slug: "reviews", name: "Reviews", description: "Hands-on, independent product reviews." },
  { slug: "comparisons", name: "Comparisons", description: "Head-to-head breakdowns to help you choose." },
  { slug: "tutorials", name: "Tutorials", description: "Practical, step-by-step technical guides." },
  { slug: "news", name: "News", description: "Fast-moving technology news, in context." },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
