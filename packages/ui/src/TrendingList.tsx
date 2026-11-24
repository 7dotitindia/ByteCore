import type { Article } from "@bytescope/content";
import { readingTimeLabel } from "@bytescope/content";

export function TrendingList({ articles }: { articles: Article[] }) {
  return (
    <ol className="flex flex-col">
      {articles.map((article, i) => (
        <li key={article.slug} className="border-b border-border py-5 first:pt-0 last:border-none">
          <a href={`/articles/${article.slug}`} className="group flex items-start gap-4">
            <span className="font-serif text-3xl leading-none text-border transition-colors group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block font-serif text-lg leading-snug text-text transition-colors group-hover:text-accent">
                {article.title}
              </span>
              <span className="mt-1 block text-xs text-text-secondary">
                {readingTimeLabel(article.readingTime)}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
