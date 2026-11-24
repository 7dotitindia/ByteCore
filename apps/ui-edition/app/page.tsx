import {
  getArticlesByCategory,
  getFeaturedArticle,
  getLatestArticles,
  getTrendingArticles,
  softwareSpotlight,
} from "@bytescope/content";
import {
  AdSlot,
  ArticleCard,
  Container,
  NewsletterSection,
  SectionHeading,
  SoftwareSpotlightCard,
  TrendingList,
} from "@bytescope/ui";

export default function HomePage() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(7).filter((a) => a.slug !== featured.slug);
  const secondary = latest.slice(0, 2);
  const latestGrid = latest.slice(2, 8);
  const trending = getTrendingArticles();
  const aiArticles = getArticlesByCategory("ai-innovation");
  const reviews = getArticlesByCategory("reviews");
  const comparisons = getArticlesByCategory("comparisons");
  const tutorials = getArticlesByCategory("tutorials");

  return (
    <>
      <Container className="py-10 lg:py-14">
        <AdSlot id="home_top" className="mb-10" />

        <section className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ArticleCard article={featured} variant="feature" />
          <div className="flex flex-col gap-8 lg:border-l lg:border-border lg:pl-10">
            {secondary.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="secondary" />
            ))}
          </div>
        </section>
      </Container>

      <Container className="py-14">
        <SectionHeading title="Latest Stories" href="/technology" />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latestGrid.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="grid" />
          ))}
        </div>
      </Container>

      <div className="border-t border-border bg-bg-secondary py-14">
        <Container>
          <SectionHeading title="Trending" />
          <div className="max-w-2xl">
            <TrendingList articles={trending} />
          </div>
        </Container>
      </div>

      <Container className="py-14">
        <SectionHeading title="Software Spotlight" href="/software" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {softwareSpotlight.map((entry) => (
            <SoftwareSpotlightCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </Container>

      <div className="border-t border-border py-14">
        <Container>
          <SectionHeading title="AI &amp; Innovation" href="/ai-innovation" />
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {aiArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="grid" />
            ))}
          </div>
        </Container>
      </div>

      <div className="border-t border-border bg-bg-secondary py-14">
        <Container>
          <SectionHeading title="Reviews &amp; Comparisons" href="/reviews" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              {reviews.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="secondary" />
              ))}
            </div>
            <div className="flex flex-col gap-8 lg:border-l lg:border-border lg:pl-10">
              {comparisons.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="secondary" />
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-14">
        <SectionHeading title="Tutorials" href="/tutorials" />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="grid" />
          ))}
        </div>
      </Container>

      <NewsletterSection />
    </>
  );
}
