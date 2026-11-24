import Image from "next/image";
import type { Author } from "@bytescope/content";
import { formatDate } from "@bytescope/content";

export function AuthorByline({
  author,
  publishedAt,
  updatedAt,
  readingTime,
}: {
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-border">
        <Image src={author.avatar} alt={author.name} fill sizes="40px" className="object-cover" />
      </div>
      <div className="text-sm">
        <a href={`/authors/${author.slug}`} className="font-medium text-text transition-colors hover:text-accent">
          {author.name}
        </a>
        <p className="text-text-secondary">
          {formatDate(publishedAt)}
          {updatedAt && <> &middot; Updated {formatDate(updatedAt)}</>}
          {" "}&middot; {readingTime} min read
        </p>
      </div>
    </div>
  );
}
