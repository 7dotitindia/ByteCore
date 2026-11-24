import { resolveConfig } from "./presets";
import type { SiteConfig } from "./schema";

export interface DemoSite {
  slug: string;
  label: string;
  description: string;
  preset: "editorial" | "dark-tech" | "software-hub" | "minimal-blog";
  config: SiteConfig;
}

export const demoSites: DemoSite[] = [
  {
    slug: "signal",
    label: "Signal",
    description: "Technology Magazine — the editorial baseline demo: warm paper background, black type, orange accent, large featured stories.",
    preset: "editorial",
    config: resolveConfig("editorial", {
      siteName: "Signal",
      tagline: "Technology, in perspective.",
      colors: { primary: "#111111", accent: "#E87535" },
      navigation: [
        { label: "Technology", href: "#latest" },
        { label: "AI & Innovation", href: "#ai" },
        { label: "Reviews", href: "#reviews" },
        { label: "Tutorials", href: "#tutorials" },
      ],
    }),
  },
  {
    slug: "wirefeed",
    label: "Wirefeed",
    description: "Tech News — a denser, breaking-news layout with a compact header and footer, built for fast-moving coverage.",
    preset: "minimal-blog",
    config: resolveConfig("minimal-blog", {
      siteName: "Wirefeed",
      tagline: "The wire, without the noise.",
      colors: { primary: "#111111", accent: "#2563EB" },
      navigation: [
        { label: "Breaking", href: "#breaking" },
        { label: "Technology", href: "#latest" },
        { label: "Markets", href: "#trending" },
      ],
    }),
  },
  {
    slug: "stackfind",
    label: "Stackfind",
    description: "Software Directory — a product-discovery homepage built around search, filters and software cards rather than articles.",
    preset: "software-hub",
    config: resolveConfig("software-hub", {
      siteName: "Stackfind",
      tagline: "Find the software that fits.",
      colors: { primary: "#111111", accent: "#1F9D55" },
      navigation: [
        { label: "Software", href: "#directory" },
        { label: "AI Tools", href: "#ai-tools" },
        { label: "Comparisons", href: "#comparisons" },
      ],
    }),
  },
];

export function getDemoSite(slug: string) {
  return demoSites.find((d) => d.slug === slug);
}
