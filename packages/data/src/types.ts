export type UserRole = "admin" | "editor" | "author" | "viewer";
export type ContentStatus = "draft" | "scheduled" | "published";
export type PricingModel = "free" | "freemium" | "paid";
export type AdCampaignStatus = "draft" | "active" | "paused" | "ended";

export interface UserRow {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AuthorRow {
  id: string;
  user_id: string | null;
  slug: string;
  name: string;
  title: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface TagRow {
  id: string;
  slug: string;
  name: string;
  created_at: string;
}

export interface MediaRow {
  id: string;
  storage_path: string;
  url: string;
  alt_text: string | null;
  content_type: string | null;
  size_bytes: number | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: unknown;
  status: ContentStatus;
  author_id: string | null;
  primary_category_id: string | null;
  featured_image_id: string | null;
  featured: boolean;
  trending_rank: number | null;
  reading_time_minutes: number | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  scheduled_for: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SoftwareRow {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  category: string | null;
  pricing_model: PricingModel;
  price_from: string | null;
  website_url: string | null;
  logo_media_id: string | null;
  pros: string[];
  cons: string[];
  platforms: string[];
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriberRow {
  id: string;
  email: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
  source: string | null;
}

export interface SiteSettingsRow {
  id: true;
  config: Record<string, unknown>;
  updated_at: string;
}

export interface AdSlotRow {
  id: string;
  label: string;
  description: string | null;
}
