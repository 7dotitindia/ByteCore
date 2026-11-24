export function organizationSchema(opts: { name: string; url: string; logo?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: opts.name,
    url: opts.url,
    ...(opts.logo ? { logo: opts.logo } : {}),
  };
}

export function personSchema(opts: { name: string; url: string; jobTitle?: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    url: opts.url,
    ...(opts.jobTitle ? { jobTitle: opts.jobTitle } : {}),
    ...(opts.image ? { image: opts.image } : {}),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl: string;
  publisherName: string;
  publisherLogo: string;
  isNews?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.isNews ? "NewsArticle" : "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    image: [opts.image],
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Person", name: opts.authorName, url: opts.authorUrl },
    publisher: {
      "@type": "Organization",
      name: opts.publisherName,
      logo: { "@type": "ImageObject", url: opts.publisherLogo },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
  };
}

export function softwareApplicationSchema(opts: {
  name: string;
  description: string;
  url: string;
  category: string;
  operatingSystem?: string;
  priceCurrency?: string;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: opts.category,
    operatingSystem: opts.operatingSystem ?? "Web",
    ...(opts.price
      ? {
          offers: {
            "@type": "Offer",
            price: opts.price,
            priceCurrency: opts.priceCurrency ?? "USD",
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
