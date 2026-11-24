import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getArticlesByCategory, getCategory } from "@bytescope/content";
import { defaultConfig } from "@bytescope/config";
import { JsonLd, breadcrumbSchema } from "@bytescope/seo";
import { AdSlot, ArticleCard, Breadcrumbs, Container } from "@bytescope/ui";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultConfig.siteUrl;
const PAGE_SIZE = 9;

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
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `${siteUrl}/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category: categorySlug } = await params;
  const { page: pageParam } = await searchParams;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const allArticles = getArticlesByCategory(category.slug);
  const page = Math.max(1, Number(pageParam) || 1);
  const totalPages = Math.max(1, Math.ceil(allArticles.length / PAGE_SIZE));
  const pageArticles = allArticles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Container className="py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteUrl },
          { name: category.name, url: `${siteUrl}/${category.slug}` },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />

      <div className="mt-6 max-w-2xl border-b border-border pb-8">
        <h1 className="font-serif text-4xl text-text">{category.name}</h1>
        <p className="mt-3 text-base text-text-secondary">{category.description}</p>
      </div>

      <AdSlot id="category_listing" className="my-10" />

      {pageArticles.length === 0 ? (
        <p className="py-10 text-sm text-text-secondary">
          No stories published in this section yet.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-12 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {pageArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="grid" />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-between border-t border-border pt-6">
          <a
            href={page > 1 ? `/${category.slug}?page=${page - 1}` : undefined}
            aria-disabled={page <= 1}
            className={`text-sm ${page <= 1 ? "pointer-events-none text-text-secondary/40" : "text-text-secondary hover:text-text"}`}
          >
            &larr; Previous
          </a>
          <span className="text-xs text-text-secondary">
            Page {page} of {totalPages}
          </span>
          <a
            href={page < totalPages ? `/${category.slug}?page=${page + 1}` : undefined}
            aria-disabled={page >= totalPages}
            className={`text-sm ${page >= totalPages ? "pointer-events-none text-text-secondary/40" : "text-text-secondary hover:text-text"}`}
          >
            Next &rarr;
          </a>
        </nav>
      )}
    </Container>
  );
}
