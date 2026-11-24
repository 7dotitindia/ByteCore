-- Local development seed data for ByteScope Pro.
-- Run automatically by `supabase db reset`, or manually via `supabase db execute -f supabase/seed.sql`.
-- Never run this against a production project — it creates a known admin login.

-- Seed Supabase Auth user. public.users row is created by the on_auth_user_created
-- trigger, then promoted to 'admin' below.
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
) values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'admin@bytescope.test',
  crypt('bytescope-admin', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"display_name":"Admin"}'
);

update public.users set role = 'admin' where email = 'admin@bytescope.test';

-- Authors
insert into public.authors (slug, name, title, avatar_url, bio) values
  ('mira-okafor', 'Mira Okafor', 'Senior Technology Editor', '/authors/mira-okafor.svg', 'Mira covers infrastructure, developer platforms and the business of software.'),
  ('daniel-kessler', 'Daniel Kessler', 'AI & Innovation Correspondent', '/authors/daniel-kessler.svg', 'Daniel reports on applied AI and the tools teams actually use in production.'),
  ('priya-nandakumar', 'Priya Nandakumar', 'Software Reviews Lead', '/authors/priya-nandakumar.svg', 'Priya runs ByteScope''s review process against a consistent rubric.');

-- Categories
insert into public.categories (slug, name, description) values
  ('technology', 'Technology', 'Deep reporting on the systems shaping the industry.'),
  ('ai-innovation', 'AI & Innovation', 'Curated coverage of AI tools, research and product launches.'),
  ('reviews', 'Reviews', 'Hands-on, independent product reviews.'),
  ('comparisons', 'Comparisons', 'Head-to-head breakdowns to help you choose.'),
  ('tutorials', 'Tutorials', 'Practical, step-by-step technical guides.'),
  ('news', 'News', 'Fast-moving technology news, in context.');

-- Tags
insert into public.tags (slug, name) values
  ('ai', 'AI'),
  ('infrastructure', 'Infrastructure'),
  ('developer-tools', 'Developer Tools'),
  ('productivity', 'Productivity'),
  ('tutorial', 'Tutorial');

-- Ad slots catalog
insert into public.ad_slots (id, label, description) values
  ('home_top', 'Homepage — top', 'First placement above the editorial hero.'),
  ('home_mid', 'Homepage — mid', 'Between homepage sections.'),
  ('article_top', 'Article — top', 'Below the article header, above the body.'),
  ('article_inline_1', 'Article — inline 1', 'First inline placement within the article body.'),
  ('article_inline_2', 'Article — inline 2', 'Second inline placement within the article body.'),
  ('article_sidebar', 'Article — sidebar', 'Sidebar placement alongside the article.'),
  ('article_bottom', 'Article — bottom', 'Below the article body, above related reading.'),
  ('category_listing', 'Category listing', 'Within a category or directory listing page.');

-- Software
insert into public.software (slug, name, tagline, description, category, pricing_model, price_from, website_url, pros, cons, platforms, status) values
  ('fieldnotes', 'Fieldnotes', 'A distraction-free writing app',
   'A demonstration software profile illustrating a single-column, keyboard-first writing editor.',
   'Productivity', 'freemium', '$6/mo', 'https://example.com/fieldnotes',
   array['Fast on large documents', 'Clean, calm interface'], array['No real-time collaboration'],
   array['macos', 'windows', 'web'], 'published'),
  ('pipedash', 'Pipedash', 'CI/CD observability for small teams',
   'A demonstration software profile illustrating a CI/CD observability dashboard.',
   'Infrastructure', 'paid', '$29/mo', 'https://example.com/pipedash',
   array['Setup takes minutes'], array['No self-hosted option'],
   array['web'], 'published');

-- Seed article (minimal body — the admin Tiptap editor is the primary way to author real content)
insert into public.articles (slug, title, subtitle, excerpt, content, status, author_id, primary_category_id, featured, reading_time_minutes, published_at, created_by)
select
  'edge-inference-rewrites-the-latency-budget',
  'Edge inference is rewriting the latency budget for AI products',
  'As models shrink and silicon improves, teams are moving inference off the cloud and onto the device.',
  'As models shrink and silicon improves, teams are moving inference off the cloud and onto the device.',
  '[{"type":"paragraph","text":"For most of the last decade, the default architecture for an AI feature was simple: collect the input, send it to a cloud endpoint, wait for a response."}]'::jsonb,
  'published',
  (select id from public.authors where slug = 'daniel-kessler'),
  (select id from public.categories where slug = 'ai-innovation'),
  true,
  7,
  now(),
  (select id from public.users where email = 'admin@bytescope.test');

insert into public.article_tags (article_id, tag_id)
select a.id, t.id from public.articles a, public.tags t
where a.slug = 'edge-inference-rewrites-the-latency-budget' and t.slug = 'ai';

-- Site settings (mirrors the default packages/config SiteConfig)
insert into public.site_settings (id, config) values (
  true,
  '{
    "siteName": "ByteScope",
    "tagline": "Technology, in perspective.",
    "defaultTheme": "light",
    "colors": { "primary": "#111111", "accent": "#E87535" }
  }'::jsonb
);

-- Newsletter subscribers
insert into public.newsletter_subscribers (email, source) values
  ('reader@example.com', 'homepage'),
  ('subscriber@example.com', 'article');
