import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { authors, getArticlesByAuthor, getAuthor } from "@bytescope/content";
import { defaultConfig } from "@bytescope/config";
import { JsonLd, breadcrumbSchema, personSchema } from "@bytescope/seo";
import { ArticleCard, Breadcrumbs, Container } from "@bytescope/ui";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultConfig.siteUrl;

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: author.name,
    description: author.bio,
    alternates: { canonical: `${siteUrl}/authors/${author.slug}` },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const articlesByAuthor = getArticlesByAuthor(author.slug);
  const authorUrl = `${siteUrl}/authors/${author.slug}`;

  return (
    <Container className="py-10">
      <JsonLd data={personSchema({ name: author.name, url: authorUrl, jobTitle: author.title, image: `${siteUrl}${author.avatar}` })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteUrl },
          { name: author.name, url: authorUrl },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: author.name }]} />

      <div className="mt-6 flex items-center gap-5 border-b border-border pb-8">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-border">
          <Image src={author.avatar} alt={author.name} fill sizes="80px" className="object-cover" />
        </div>
        <div>
          <h1 className="font-serif text-3xl text-text">{author.name}</h1>
          <p className="text-sm text-text-secondary">{author.title}</p>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">{author.bio}</p>

      <h2 className="mb-6 mt-12 text-xs font-medium uppercase tracking-wide text-text-secondary">
        Articles by {author.name}
      </h2>

      {articlesByAuthor.length === 0 ? (
        <p className="text-sm text-text-secondary">No published articles yet.</p>
      ) : (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articlesByAuthor.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="grid" />
          ))}
        </div>
      )}
    </Container>
  );
}
