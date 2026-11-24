import type { ContentBlock } from "@bytescope/content";

export function TableOfContents({ blocks }: { blocks: ContentBlock[] }) {
  const headings = blocks.filter(
    (b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading",
  );

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden border-l border-border pl-5 lg:block">
      <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-secondary">
        On this page
      </h2>
      <ul className="flex flex-col gap-2">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a href={`#${h.id}`} className="text-sm text-text-secondary transition-colors hover:text-text">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
