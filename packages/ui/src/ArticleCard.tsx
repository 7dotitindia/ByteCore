import Image from "next/image";
import type { Article } from "@bytescope/content";
import { formatDate, readingTimeLabel } from "@bytescope/content";
import { CategoryLabel } from "./CategoryLabel";

export function ArticleCard({
  article,
  variant = "grid",
}: {
  article: Article;
  variant?: "feature" | "secondary" | "grid" | "compact";
}) {
  const href = `/articles/${article.slug}`;

  if (variant === "feature") {
    return (
      <article className="group">
        <a href={href} className="block">
          <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden bg-border">
            <Image
              src={article.featuredImage.src}
              alt={article.featuredImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </a>
        <CategoryLabel category={article.category} />
        <a href={href}>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-text transition-colors group-hover:text-accent lg:text-5xl">
            {article.title}
          </h2>
        </a>
        <p className="mt-4 max-w-xl text-base text-text-secondary">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-text-secondary">
          <span>{formatDate(article.publishedAt)}</span>
          <span aria-hidden>&middot;</span>
          <span>{readingTimeLabel(article.readingTime)}</span>
        </div>
      </article>
    );
  }

  if (variant === "secondary") {
    return (
      <article className="group flex gap-4">
        <a href={href} className="relative block aspect-square w-28 shrink-0 overflow-hidden bg-border">
          <Image src={article.featuredImage.src} alt={article.featuredImage.alt} fill sizes="112px" className="object-cover" />
        </a>
        <div>
          <CategoryLabel category={article.category} />
          <a href={href}>
            <h3 className="mt-1 font-serif text-lg leading-snug text-text transition-colors group-hover:text-accent">
              {article.title}
            </h3>
          </a>
          <p className="mt-1 text-xs text-text-secondary">{formatDate(article.publishedAt)}</p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article>
        <a href={href} className="group block">
          <h3 className="font-sans text-sm leading-snug text-text transition-colors group-hover:text-accent">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-text-secondary">{readingTimeLabel(article.readingTime)}</p>
        </a>
      </article>
    );
  }

  return (
    <article className="group">
      <a href={href} className="relative mb-4 block aspect-[4/3] w-full overflow-hidden bg-border">
        <Image
          src={article.featuredImage.src}
          alt={article.featuredImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </a>
      <CategoryLabel category={article.category} />
      <a href={href}>
        <h3 className="mt-2 font-serif text-xl leading-snug text-text transition-colors group-hover:text-accent">
          {article.title}
        </h3>
      </a>
      <p className="mt-2 text-xs text-text-secondary">{formatDate(article.publishedAt)}</p>
    </article>
  );
}
