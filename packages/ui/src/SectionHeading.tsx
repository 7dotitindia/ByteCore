import type { ReactNode } from "react";

export function SectionHeading({
  title,
  href,
  hrefLabel = "View all",
  children,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
      <h2 className="font-serif text-2xl text-text">{title}</h2>
      {href ? (
        <a
          href={href}
          className="shrink-0 text-sm text-text-secondary transition-colors hover:text-accent"
        >
          {hrefLabel} &rarr;
        </a>
      ) : (
        children
      )}
    </div>
  );
}
