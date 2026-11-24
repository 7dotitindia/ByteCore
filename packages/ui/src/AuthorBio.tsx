import Image from "next/image";
import type { Author } from "@bytescope/content";

export function AuthorBio({ author }: { author: Author }) {
  return (
    <div className="flex gap-4 border-t border-border pt-8">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-border">
        <Image src={author.avatar} alt={author.name} fill sizes="56px" className="object-cover" />
      </div>
      <div>
        <a href={`/authors/${author.slug}`} className="font-medium text-text transition-colors hover:text-accent">
          {author.name}
        </a>
        <p className="text-xs text-text-secondary">{author.title}</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">{author.bio}</p>
      </div>
    </div>
  );
}
