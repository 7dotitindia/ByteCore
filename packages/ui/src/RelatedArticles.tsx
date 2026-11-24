import type { Article } from "@bytescope/content";
import { ArticleCard } from "./ArticleCard";
import { SectionHeading } from "./SectionHeading";

export function RelatedArticles({ articles, title = "Related reading" }: { articles: Article[]; title?: string }) {
  if (articles.length === 0) return null;

  return (
    <div className="border-t border-border pt-10">
      <SectionHeading title={title} />
      <div className="grid gap-10 sm:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} variant="grid" />
        ))}
      </div>
    </div>
  );
}
