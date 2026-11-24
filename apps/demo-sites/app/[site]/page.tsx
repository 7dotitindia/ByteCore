import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { demoSites, getDemoSite } from "@bytescope/config";
import {
  getArticlesByCategory,
  getFeaturedArticle,
  getLatestArticles,
  getSpotlightSoftware,
  getTrendingArticles,
  aiTools,
} from "@bytescope/content";
import {
  AiToolsDirectory,
  ArticleCard,
  Container,
  DirectoryCard,
  NewsletterSection,
  SectionHeading,
  SoftwareDirectory,
  TrendingList,
} from "@bytescope/ui";

export function generateStaticParams() {
  return demoSites.map((d) => ({ site: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ site: string }>;
}): Promise<Metadata> {
  const { site } = await params;
  const demo = getDemoSite(site);
  if (!demo) return {};
  return { title: `${demo.config.siteName} — ${demo.config.tagline}` };
}

export default async function DemoHomePage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const demo = getDemoSite(site);
  if (!demo) notFound();

  const { config } = demo;
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(8).filter((a) => a.slug !== featured.slug);
  const trending = getTrendingArticles();
  const reviews = getArticlesByCategory("reviews");
  const comparisons = getArticlesByCategory("comparisons");
  const spotlightSoftware = getSpotlightSoftware();

  if (config.homepageLayout === "news") {
    return (
      <Container className="py-8">
        <div id="breaking" className="mb-8 flex flex-col gap-2 border-y border-border py-3">
          <span className="text-xs font-medium uppercase tracking-wide text-accent">Breaking</span>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {latest.slice(0, 3).map((a) => (
              <a key={a.slug} href={`/articles/${a.slug}`} className="text-sm text-text transition-colors hover:text-accent">
                {a.title}
              </a>
            ))}
          </div>
        </div>

        <div id="latest" className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col divide-y divide-border">
            <ArticleCard article={featured} variant="secondary" />
            {latest.slice(3, 9).map((a) => (
              <div key={a.slug} className="py-6 first:pt-0">
                <ArticleCard article={a} variant="secondary" />
              </div>
            ))}
          </div>

          <aside id="trending" className="border-l border-border pl-8">
            <h2 className="mb-5 text-xs font-medium uppercase tracking-wide text-text-secondary">Trending now</h2>
            <TrendingList articles={trending} />
          </aside>
        </div>

        <NewsletterSection />
      </Container>
    );
  }

  if (config.homepageLayout === "directory") {
    return (
      <>
        <Container className="py-14">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              {config.siteName}
            </span>
            <h1 className="mt-3 font-serif text-5xl leading-tight text-text">{config.tagline}</h1>
            <p className="mt-4 text-base text-text-secondary">
              Search, filter and compare software and AI tools — curated, not paid placement.
            </p>
          </div>
        </Container>

        <div id="directory" className="border-t border-border py-14">
          <Container>
            <SectionHeading title="Software Directory" />
            <SoftwareDirectory />
          </Container>
        </div>

        <div id="ai-tools" className="border-t border-border bg-bg-secondary py-14">
          <Container>
            <SectionHeading title="AI Tools" />
            <AiToolsDirectory />
          </Container>
        </div>

        <div id="comparisons" className="border-t border-border py-14">
          <Container>
            <SectionHeading title="Comparisons" />
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {comparisons.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="grid" />
              ))}
            </div>
          </Container>
        </div>

        <NewsletterSection />
      </>
    );
  }

  return (
    <>
      <Container className="py-10 lg:py-14">
        <section className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ArticleCard article={featured} variant="feature" />
          <div className="flex flex-col gap-8 lg:border-l lg:border-border lg:pl-10">
            {latest.slice(0, 2).map((a) => (
              <ArticleCard key={a.slug} article={a} variant="secondary" />
            ))}
          </div>
        </section>
      </Container>

      <div id="latest">
        <Container className="py-14">
          <SectionHeading title="Latest Stories" />
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {latest.slice(2, 8).map((a) => (
              <ArticleCard key={a.slug} article={a} variant="grid" />
            ))}
          </div>
        </Container>
      </div>

      <div id="ai" className="border-t border-border bg-bg-secondary py-14">
        <Container>
          <SectionHeading title="AI &amp; Innovation" />
          <div className="grid gap-5 sm:grid-cols-3">
            {aiTools.slice(0, 3).map((tool) => (
              <DirectoryCard
                key={tool.slug}
                href={`/ai-tools/${tool.slug}`}
                name={tool.name}
                tagline={tool.tagline}
                category={tool.category}
                pricingModel={tool.pricingModel}
                priceFrom={tool.priceFrom}
              />
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-14">
        <SectionHeading title="Software Spotlight" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {spotlightSoftware.map((product) => (
            <DirectoryCard
              key={product.slug}
              href={`/software/${product.slug}`}
              name={product.name}
              tagline={product.tagline}
              category={product.category}
              pricingModel={product.pricingModel}
              priceFrom={product.priceFrom}
            />
          ))}
        </div>
      </Container>

      <div id="reviews" className="border-t border-border py-14">
        <Container>
          <SectionHeading title="Reviews" />
          <div className="grid gap-10 sm:grid-cols-3">
            {reviews.map((a) => (
              <ArticleCard key={a.slug} article={a} variant="grid" />
            ))}
          </div>
        </Container>
      </div>

      <div id="tutorials" className="border-t border-border bg-bg-secondary py-14">
        <Container>
          <SectionHeading title="Tutorials" />
          <div className="grid gap-10 sm:grid-cols-3">
            {getArticlesByCategory("tutorials").map((a) => (
              <ArticleCard key={a.slug} article={a} variant="grid" />
            ))}
          </div>
        </Container>
      </div>

      <NewsletterSection />
    </>
  );
}
