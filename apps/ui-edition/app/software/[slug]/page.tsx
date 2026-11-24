import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import {
  softwareProducts,
  getSoftwareProduct,
  getSoftwareAlternatives,
  getReviewsForSoftware,
} from "@bytescope/content";
import {
  AdSlot,
  AlternativesList,
  Breadcrumbs,
  Container,
  PricingBadge,
  ProsConsList,
  RelatedArticles,
  ScreenshotGallery,
} from "@bytescope/ui";

export function generateStaticParams() {
  return softwareProducts.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getSoftwareProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function SoftwareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getSoftwareProduct(slug);
  if (!product) notFound();

  const alternatives = getSoftwareAlternatives(product).map((a) => ({
    slug: a.slug,
    name: a.name,
    tagline: a.tagline,
    href: `/software/${a.slug}`,
  }));
  const relatedReviews = getReviewsForSoftware(product.slug);

  return (
    <article>
      <Container className="py-10">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Software", href: "/software" }, { label: product.name }]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-wide text-accent">{product.category}</span>
            <h1 className="mt-3 font-serif text-4xl text-text">{product.name}</h1>
            <p className="mt-3 text-lg text-text-secondary">{product.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-text">{product.description}</p>
          </div>

          <aside className="flex flex-col gap-4 border border-border p-5">
            <PricingBadge pricingModel={product.pricingModel} priceFrom={product.priceFrom} />
            <a
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-text px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Visit website <ExternalLink size={14} />
            </a>
            <div>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">Platforms</h3>
              <p className="text-sm text-text">{product.platforms.join(", ")}</p>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">Features</h3>
              <ul className="flex flex-col gap-1 text-sm text-text">
                {product.features.map((f) => (
                  <li key={f}>&bull; {f}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-12 max-w-4xl">
          <ScreenshotGallery screenshots={product.screenshots} />
        </div>

        <div className="mt-12 max-w-4xl">
          <ProsConsList pros={product.pros} cons={product.cons} />
        </div>

        <AdSlot id="article_bottom" className="mt-12 max-w-4xl" />

        {alternatives.length > 0 && (
          <div className="mt-12 max-w-md">
            <AlternativesList items={alternatives} />
          </div>
        )}
      </Container>

      {relatedReviews.length > 0 && (
        <div className="border-t border-border bg-bg-secondary py-14">
          <Container>
            <RelatedArticles articles={relatedReviews} title="Related reviews" />
          </Container>
        </div>
      )}
    </article>
  );
}
