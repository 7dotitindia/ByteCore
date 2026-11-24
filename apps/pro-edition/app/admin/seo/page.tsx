export default function AdminSeoPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-text">SEO</h1>
      <p className="mt-3 max-w-lg text-sm text-text-secondary">
        Per-article SEO title/description are already set from the article editor (see Articles
        &rarr; New article). Sitewide defaults, the XML sitemap, <code>robots.txt</code>, and
        structured data (Article/NewsArticle/Organization/Person schema) are scheduled for Phase
        6, where they belong alongside the public-facing SEO work already done in{" "}
        <code>apps/ui-edition</code>.
      </p>
    </div>
  );
}
