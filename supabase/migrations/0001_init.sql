-- ByteScope Pro — initial schema, RLS policies, and triggers.
-- Run via `supabase db reset` (local) or `supabase db push` (hosted project).

create extension if not exists "pgcrypto";

create type user_role as enum ('admin', 'editor', 'author', 'viewer');
create type content_status as enum ('draft', 'scheduled', 'published');
create type pricing_model as enum ('free', 'freemium', 'paid');
create type ad_campaign_status as enum ('draft', 'active', 'paused', 'ended');

-- ---------------------------------------------------------------------------
-- Core identity
-- ---------------------------------------------------------------------------

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  avatar_url text,
  role user_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.authors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id) on delete set null,
  slug text not null unique,
  name text not null,
  title text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Taxonomy
-- ---------------------------------------------------------------------------

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Media
-- ---------------------------------------------------------------------------

create table public.media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  url text not null,
  alt_text text,
  content_type text,
  size_bytes integer,
  uploaded_by uuid references public.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index media_uploaded_by_idx on public.media (uploaded_by);

-- ---------------------------------------------------------------------------
-- Articles
-- ---------------------------------------------------------------------------

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  excerpt text,
  content jsonb not null default '[]'::jsonb,
  status content_status not null default 'draft',
  author_id uuid references public.authors (id) on delete set null,
  primary_category_id uuid references public.categories (id) on delete set null,
  featured_image_id uuid references public.media (id) on delete set null,
  featured boolean not null default false,
  trending_rank integer,
  reading_time_minutes integer,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  scheduled_for timestamptz,
  created_by uuid references public.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_status_idx on public.articles (status);
create index articles_published_at_idx on public.articles (published_at desc);
create index articles_primary_category_idx on public.articles (primary_category_id);

create table public.article_categories (
  article_id uuid not null references public.articles (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  primary key (article_id, category_id)
);

create table public.article_tags (
  article_id uuid not null references public.articles (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (article_id, tag_id)
);

create table public.article_media (
  article_id uuid not null references public.articles (id) on delete cascade,
  media_id uuid not null references public.media (id) on delete cascade,
  position integer not null default 0,
  caption text,
  primary key (article_id, media_id)
);

-- ---------------------------------------------------------------------------
-- Software directory
-- ---------------------------------------------------------------------------

create table public.software (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  category text,
  pricing_model pricing_model not null default 'free',
  price_from text,
  website_url text,
  logo_media_id uuid references public.media (id) on delete set null,
  pros text[] not null default '{}',
  cons text[] not null default '{}',
  platforms text[] not null default '{}',
  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index software_status_idx on public.software (status);

create table public.software_features (
  id uuid primary key default gen_random_uuid(),
  software_id uuid not null references public.software (id) on delete cascade,
  label text not null,
  position integer not null default 0
);

create table public.software_categories (
  software_id uuid not null references public.software (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  primary key (software_id, category_id)
);

-- ---------------------------------------------------------------------------
-- Reviews & comparisons (thin wrappers linking an article to product(s))
-- ---------------------------------------------------------------------------

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  software_id uuid references public.software (id) on delete set null,
  rating numeric(2, 1),
  created_at timestamptz not null default now()
);

create table public.comparisons (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.comparison_items (
  id uuid primary key default gen_random_uuid(),
  comparison_id uuid not null references public.comparisons (id) on delete cascade,
  software_id uuid not null references public.software (id) on delete cascade,
  position integer not null default 0,
  verdict text
);

-- ---------------------------------------------------------------------------
-- Advertising
-- ---------------------------------------------------------------------------

create table public.ad_slots (
  id text primary key,
  label text not null,
  description text
);

create table public.ad_campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  advertiser text,
  status ad_campaign_status not null default 'draft',
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.ad_creatives (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.ad_campaigns (id) on delete cascade,
  media_id uuid references public.media (id) on delete set null,
  headline text,
  destination_url text,
  created_at timestamptz not null default now()
);

create table public.advertisements (
  id uuid primary key default gen_random_uuid(),
  creative_id uuid not null references public.ad_creatives (id) on delete cascade,
  enabled boolean not null default true,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  created_at timestamptz not null default now()
);

create table public.ad_slot_assignments (
  id uuid primary key default gen_random_uuid(),
  slot_id text not null references public.ad_slots (id) on delete cascade,
  advertisement_id uuid not null references public.advertisements (id) on delete cascade,
  priority integer not null default 0,
  created_at timestamptz not null default now()
);

create index ad_slot_assignments_slot_idx on public.ad_slot_assignments (slot_id);

-- ---------------------------------------------------------------------------
-- Newsletter, settings, redirects, audit
-- ---------------------------------------------------------------------------

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  source text
);

-- Single-row table holding the resolved SiteConfig (packages/config) for the
-- admin-configurable layer; default/preset values stay in code.
create table public.site_settings (
  id boolean primary key default true check (id),
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text not null unique,
  to_path text not null,
  permanent boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.users (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index audit_logs_actor_idx on public.audit_logs (actor_id);
create index audit_logs_created_at_idx on public.audit_logs (created_at desc);

-- ---------------------------------------------------------------------------
-- Helper functions (security definer so RLS on `users` doesn't recurse)
-- ---------------------------------------------------------------------------

create or replace function public.is_staff()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role in ('admin', 'editor', 'author')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.users for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.authors for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.articles for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.software for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

-- Mirrors a new Supabase Auth user into public.users as a 'viewer' by default.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, display_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.users enable row level security;
alter table public.authors enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.media enable row level security;
alter table public.articles enable row level security;
alter table public.article_categories enable row level security;
alter table public.article_tags enable row level security;
alter table public.article_media enable row level security;
alter table public.software enable row level security;
alter table public.software_features enable row level security;
alter table public.software_categories enable row level security;
alter table public.reviews enable row level security;
alter table public.comparisons enable row level security;
alter table public.comparison_items enable row level security;
alter table public.ad_slots enable row level security;
alter table public.ad_campaigns enable row level security;
alter table public.ad_creatives enable row level security;
alter table public.advertisements enable row level security;
alter table public.ad_slot_assignments enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.site_settings enable row level security;
alter table public.redirects enable row level security;
alter table public.audit_logs enable row level security;

-- users
create policy "users read own profile" on public.users for select using (id = auth.uid());
create policy "admins read all profiles" on public.users for select using (public.is_admin());
create policy "admins manage profiles" on public.users for all using (public.is_admin()) with check (public.is_admin());

-- authors (public byline info)
create policy "authors are publicly readable" on public.authors for select using (true);
create policy "staff manage authors" on public.authors for all using (public.is_staff()) with check (public.is_staff());

-- taxonomy
create policy "categories are publicly readable" on public.categories for select using (true);
create policy "staff manage categories" on public.categories for all using (public.is_staff()) with check (public.is_staff());

create policy "tags are publicly readable" on public.tags for select using (true);
create policy "staff manage tags" on public.tags for all using (public.is_staff()) with check (public.is_staff());

-- media
create policy "media is publicly readable" on public.media for select using (true);
create policy "staff manage media" on public.media for all using (public.is_staff()) with check (public.is_staff());

-- articles
create policy "published articles are publicly readable" on public.articles
  for select using (status = 'published' or public.is_staff());
create policy "staff manage articles" on public.articles for all using (public.is_staff()) with check (public.is_staff());

create policy "article_categories follow article visibility" on public.article_categories
  for select using (
    exists (select 1 from public.articles a where a.id = article_categories.article_id and (a.status = 'published' or public.is_staff()))
  );
create policy "staff manage article_categories" on public.article_categories for all using (public.is_staff()) with check (public.is_staff());

create policy "article_tags follow article visibility" on public.article_tags
  for select using (
    exists (select 1 from public.articles a where a.id = article_tags.article_id and (a.status = 'published' or public.is_staff()))
  );
create policy "staff manage article_tags" on public.article_tags for all using (public.is_staff()) with check (public.is_staff());

create policy "article_media follow article visibility" on public.article_media
  for select using (
    exists (select 1 from public.articles a where a.id = article_media.article_id and (a.status = 'published' or public.is_staff()))
  );
create policy "staff manage article_media" on public.article_media for all using (public.is_staff()) with check (public.is_staff());

-- software
create policy "published software is publicly readable" on public.software
  for select using (status = 'published' or public.is_staff());
create policy "staff manage software" on public.software for all using (public.is_staff()) with check (public.is_staff());

create policy "software_features follow software visibility" on public.software_features
  for select using (
    exists (select 1 from public.software s where s.id = software_features.software_id and (s.status = 'published' or public.is_staff()))
  );
create policy "staff manage software_features" on public.software_features for all using (public.is_staff()) with check (public.is_staff());

create policy "software_categories follow software visibility" on public.software_categories
  for select using (
    exists (select 1 from public.software s where s.id = software_categories.software_id and (s.status = 'published' or public.is_staff()))
  );
create policy "staff manage software_categories" on public.software_categories for all using (public.is_staff()) with check (public.is_staff());

-- reviews & comparisons
create policy "reviews follow article visibility" on public.reviews
  for select using (
    exists (select 1 from public.articles a where a.id = reviews.article_id and (a.status = 'published' or public.is_staff()))
  );
create policy "staff manage reviews" on public.reviews for all using (public.is_staff()) with check (public.is_staff());

create policy "comparisons follow article visibility" on public.comparisons
  for select using (
    exists (select 1 from public.articles a where a.id = comparisons.article_id and (a.status = 'published' or public.is_staff()))
  );
create policy "staff manage comparisons" on public.comparisons for all using (public.is_staff()) with check (public.is_staff());

create policy "comparison_items follow comparison visibility" on public.comparison_items
  for select using (
    exists (
      select 1 from public.comparisons c
      join public.articles a on a.id = c.article_id
      where c.id = comparison_items.comparison_id and (a.status = 'published' or public.is_staff())
    )
  );
create policy "staff manage comparison_items" on public.comparison_items for all using (public.is_staff()) with check (public.is_staff());

-- advertising (staff manage; enabled creatives/assignments are publicly readable for ad rendering)
create policy "staff manage ad_slots" on public.ad_slots for all using (public.is_staff()) with check (public.is_staff());
create policy "ad_slots are publicly readable" on public.ad_slots for select using (true);

create policy "staff manage ad_campaigns" on public.ad_campaigns for all using (public.is_staff()) with check (public.is_staff());

create policy "staff manage ad_creatives" on public.ad_creatives for all using (public.is_staff()) with check (public.is_staff());
create policy "ad_creatives are publicly readable" on public.ad_creatives for select using (true);

create policy "staff manage advertisements" on public.advertisements for all using (public.is_staff()) with check (public.is_staff());
create policy "enabled advertisements are publicly readable" on public.advertisements for select using (enabled = true or public.is_staff());

create policy "staff manage ad_slot_assignments" on public.ad_slot_assignments for all using (public.is_staff()) with check (public.is_staff());
create policy "ad_slot_assignments are publicly readable" on public.ad_slot_assignments for select using (true);

-- newsletter
create policy "anyone can subscribe" on public.newsletter_subscribers for insert with check (true);
create policy "staff view subscribers" on public.newsletter_subscribers for select using (public.is_staff());
create policy "staff manage subscribers" on public.newsletter_subscribers for update using (public.is_staff());
create policy "staff delete subscribers" on public.newsletter_subscribers for delete using (public.is_staff());

-- settings & redirects
create policy "site settings are publicly readable" on public.site_settings for select using (true);
create policy "admins manage site settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "redirects are publicly readable" on public.redirects for select using (true);
create policy "staff manage redirects" on public.redirects for all using (public.is_staff()) with check (public.is_staff());

-- audit log: append-only, admin-readable
create policy "admins read audit logs" on public.audit_logs for select using (public.is_admin());
create policy "staff write audit logs" on public.audit_logs for insert with check (public.is_staff());
