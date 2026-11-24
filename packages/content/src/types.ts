export type CategorySlug =
  | "technology"
  | "ai-innovation"
  | "reviews"
  | "comparisons"
  | "tutorials"
  | "news";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface Author {
  slug: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: CategorySlug;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featuredImage: { src: string; alt: string; caption?: string };
  featured?: boolean;
  trendingRank?: number;
  content: ContentBlock[];
  relatedSoftware?: string;
}

export type Platform = "web" | "macos" | "windows" | "linux" | "ios" | "android";
export type PricingModel = "Free" | "Freemium" | "Paid";

export interface Screenshot {
  src: string;
  alt: string;
}

export interface SoftwareProduct {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  platforms: Platform[];
  pricingModel: PricingModel;
  priceFrom?: string;
  website: string;
  screenshots: Screenshot[];
  features: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
  spotlight?: boolean;
}

export interface AiTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  pricingModel: PricingModel;
  priceFrom?: string;
  website: string;
  screenshots: Screenshot[];
  features: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
}
