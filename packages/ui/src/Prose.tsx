import Image from "next/image";
import type { ContentBlock } from "@bytescope/content";

export function Prose({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex max-w-article flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-lg leading-relaxed text-text">
                {block.text}
              </p>
            );
          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag
                key={i}
                id={block.id}
                className={block.level === 2 ? "mt-4 scroll-mt-24 font-serif text-2xl text-text" : "mt-2 scroll-mt-24 font-serif text-xl text-text"}
              >
                {block.text}
              </Tag>
            );
          }
          case "image":
            return (
              <figure key={i} className="my-2">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-border">
                  <Image src={block.src} alt={block.alt} fill sizes="(min-width: 1024px) 42rem, 100vw" className="object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-sm text-text-secondary">{block.caption}</figcaption>
                )}
              </figure>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-2 border-accent pl-6">
                <p className="font-serif text-xl leading-snug text-text">&ldquo;{block.text}&rdquo;</p>
                {block.attribution && (
                  <cite className="mt-2 block text-sm not-italic text-text-secondary">— {block.attribution}</cite>
                )}
              </blockquote>
            );
          case "code":
            return (
              <pre key={i} className="overflow-x-auto bg-graphite px-5 py-4 text-sm text-[#F5F1EB]">
                <code>{block.code}</code>
              </pre>
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className={`flex flex-col gap-2 pl-5 text-lg leading-relaxed text-text ${block.ordered ? "list-decimal" : "list-disc"}`}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </Tag>
            );
          }
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {block.headers.map((h) => (
                        <th key={h} className="px-3 py-2 text-left font-medium text-text-secondary">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-border last:border-none">
                        {row.map((cell, c) => (
                          <td key={c} className="px-3 py-2 text-text">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
