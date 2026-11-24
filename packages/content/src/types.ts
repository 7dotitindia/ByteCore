export type CategorySlug =
  | "technology"
  | "ai-innovation"
  | "software"
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
}
