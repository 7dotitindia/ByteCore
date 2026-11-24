import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getArticlesByCategory, getCategory } from "@bytescope/content";
import { AdSlot, ArticleCard, Breadcrumbs, Container } from "@bytescope/ui";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const categoryArticles = getArticlesByCategory(category.slug);

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />

      <div className="mt-6 max-w-2xl border-b border-border pb-8">
        <h1 className="font-serif text-4xl text-text">{category.name}</h1>
        <p className="mt-3 text-base text-text-secondary">{category.description}</p>
      </div>

      <AdSlot id="category_listing" className="my-10" />

      {categoryArticles.length === 0 ? (
        <p className="py-10 text-sm text-text-secondary">
          No stories published in this section yet.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-12 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="grid" />
          ))}
        </div>
      )}
    </Container>
  );
}
