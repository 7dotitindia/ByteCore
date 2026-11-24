import { categories } from "@bytescope/content";
import type { CategorySlug } from "@bytescope/content";

export function CategoryLabel({ category }: { category: CategorySlug }) {
  const name = categories.find((c) => c.slug === category)?.name ?? category;
  return (
    <a
      href={`/${category}`}
      className="text-xs font-medium uppercase tracking-wide text-accent transition-opacity hover:opacity-80"
    >
      {name}
    </a>
  );
}
