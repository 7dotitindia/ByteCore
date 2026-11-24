import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { aiTools, getAiTool, getAiToolAlternatives } from "@bytescope/content";
import {
  AdSlot,
  AlternativesList,
  Breadcrumbs,
  Container,
  PricingBadge,
  ProsConsList,
  ScreenshotGallery,
} from "@bytescope/ui";

export function generateStaticParams() {
  return aiTools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getAiTool(slug);
  if (!tool) return {};
  return { title: tool.name, description: tool.tagline };
}

export default async function AiToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getAiTool(slug);
  if (!tool) notFound();

  const alternatives = getAiToolAlternatives(tool).map((a) => ({
    slug: a.slug,
    name: a.name,
    tagline: a.tagline,
    href: `/ai-tools/${a.slug}`,
  }));

  return (
    <article>
      <Container className="py-10">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "AI Tools", href: "/ai-tools" }, { label: tool.name }]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-wide text-accent">{tool.category}</span>
            <h1 className="mt-3 font-serif text-4xl text-text">{tool.name}</h1>
            <p className="mt-3 text-lg text-text-secondary">{tool.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-text">{tool.description}</p>
          </div>

          <aside className="flex flex-col gap-4 border border-border p-5">
            <PricingBadge pricingModel={tool.pricingModel} priceFrom={tool.priceFrom} />
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-text px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Visit website <ExternalLink size={14} />
            </a>
            <div>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">Features</h3>
              <ul className="flex flex-col gap-1 text-sm text-text">
                {tool.features.map((f) => (
                  <li key={f}>&bull; {f}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-12 max-w-4xl">
          <ScreenshotGallery screenshots={tool.screenshots} />
        </div>

        <div className="mt-12 max-w-4xl">
          <ProsConsList pros={tool.pros} cons={tool.cons} />
        </div>

        <AdSlot id="article_bottom" className="mt-12 max-w-4xl" />

        {alternatives.length > 0 && (
          <div className="mt-12 max-w-md">
            <AlternativesList items={alternatives} />
          </div>
        )}
      </Container>
    </article>
  );
}
