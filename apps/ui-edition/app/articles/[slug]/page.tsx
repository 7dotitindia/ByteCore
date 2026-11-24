import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import {
  articles,
  getArticle,
  getAuthor,
  getCategory,
  getRelatedArticles,
} from "@bytescope/content";
import { defaultConfig } from "@bytescope/config";
import { JsonLd, articleSchema, breadcrumbSchema } from "@bytescope/seo";
import {
  AdSlot,
  AuthorBio,
  AuthorByline,
  Breadcrumbs,
  CategoryLabel,
  Container,
  Prose,
  RelatedArticles,
  ShareButtons,
  TableOfContents,
} from "@bytescope/ui";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultConfig.siteUrl;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `${siteUrl}/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage.src],
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const author = getAuthor(article.author);
  const category = getCategory(article.category);
  if (!author || !category) notFound();

  const related = getRelatedArticles(article);
  const articleUrl = `${siteUrl}/articles/${article.slug}`;

  return (
    <article>
      <JsonLd
        data={articleSchema({
          headline: article.title,
          description: article.excerpt,
          url: articleUrl,
          image: article.featuredImage.src,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          authorName: author.name,
          authorUrl: `${siteUrl}/authors/${author.slug}`,
          publisherName: defaultConfig.siteName,
          publisherLogo: `${siteUrl}${defaultConfig.logo}`,
          isNews: article.category === "news",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteUrl },
          { name: category.name, url: `${siteUrl}/${category.slug}` },
          { name: article.title, url: articleUrl },
        ])}
      />

      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: category.name, href: `/${category.slug}` },
            { label: article.title },
          ]}
        />

        <div className="mx-auto mt-6 max-w-article">
          <CategoryLabel category={article.category} />
          <h1 className="mt-3 font-serif text-4xl leading-tight text-text lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">{article.subtitle}</p>

          <div className="mt-6 flex items-center justify-between gap-6 border-y border-border py-4">
            <AuthorByline
              author={author}
              publishedAt={article.publishedAt}
              updatedAt={article.updatedAt}
              readingTime={article.readingTime}
            />
            <div className="hidden sm:block">
              <ShareButtons title={article.title} path={`/articles/${article.slug}`} />
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-8 aspect-[16/9] w-full max-w-4xl overflow-hidden bg-border">
          <Image
            src={article.featuredImage.src}
            alt={article.featuredImage.alt}
            fill
            priority
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
          />
        </div>
        {article.featuredImage.caption && (
          <p className="mx-auto mt-2 max-w-4xl text-sm text-text-secondary">
            {article.featuredImage.caption}
          </p>
        )}

        <AdSlot id="article_top" className="mx-auto mt-10 max-w-article" />

        <div className="mx-auto mt-10 grid max-w-5xl gap-12 lg:grid-cols-[1fr_200px]">
          <Prose blocks={article.content} />
          <TableOfContents blocks={article.content} />
        </div>

        <div className="mx-auto mt-10 max-w-article">
          <AdSlot id="article_bottom" className="mb-10" />
          <AuthorBio author={author} />
        </div>
      </Container>

      <div className="border-t border-border bg-bg-secondary py-14">
        <Container>
          <RelatedArticles articles={related} />
        </Container>
      </div>
    </article>
  );
}
