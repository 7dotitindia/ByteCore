# ByteScope — Architecture

## Monorepo layout

```
apps/
  ui-edition/     Next.js app — Frontend Edition (mock data, no backend)
  pro-edition/    Next.js app — Full-stack Pro Edition (Supabase-backed) [Phase 5]
  demo-sites/     Three themed demo configurations [Phase 4]
packages/
  ui/             Shared React components (Header, Footer, article/card components, ...)
  theme/          Design tokens, CSS variables, Tailwind preset
  config/         Zod schemas for site configuration, defaults, theme presets
  content/        Content models + mock data provider [Phase 3]
  data/           Supabase client, queries, repositories [Phase 5]
  seo/            Metadata, JSON-LD, sitemap helpers [Phase 6]
  ads/            Ad slot components + config [Phase 6]
  email/          Newsletter templates/senders [Phase 6]
  utils/          Shared utilities
supabase/
  migrations/, policies/, seed.sql   [Phase 5]
docs/             Architecture, roadmap, customization & deployment docs
```

## Why this split

- `ui-edition` and `pro-edition` share every visual and structural package (`ui`,
  `theme`, `config`, `content`, `seo`, `ads`). Only `pro-edition` depends on
  `data` (Supabase) and ships the admin dashboard. This satisfies the "one
  shared core, two editions" requirement without forking the frontend.
- `config` is the commercial customization engine: a Zod-validated
  `SiteConfig` resolved as `defaultConfig -> preset -> admin overrides`. Both
  editions and all three demo sites consume the same resolver.
- `theme` only exports tokens and a Tailwind preset — no components — so it
  can be consumed by tooling (e.g. a future Storybook) without pulling in
  React.

## Build tooling

pnpm workspaces + Turborepo. Each package builds independently; `turbo.json`
declares `build`/`lint`/`typecheck`/`test` pipelines with dependency-aware
caching.

## Status (Phase 1 complete)

- [x] Monorepo + workspace tooling
- [x] `theme` package (tokens, CSS vars, Tailwind preset)
- [x] `config` package (schema, defaults, presets, resolver)
- [x] `ui` package: `Header`, `Footer`, `Container`, `Logo`, `ThemeToggle`, `MobileNav`
- [x] `ui-edition` app: root layout wired to Header/Footer/tokens, placeholder homepage
- [x] Editorial homepage, article templates, category pages — Phase 2
- [x] Software directory, AI tools directory, reviews, comparisons, tutorials, search — Phase 3
- [x] Theme presets applied end-to-end, three demo sites, richer mock data provider — Phase 4
- [x] Supabase, database migrations, auth, admin dashboard, CMS — Phase 5
- [x] Advertisement management, newsletter, analytics, SEO — Phase 6
- [ ] Testing, accessibility, performance, security, documentation — Phase 7

## Phase 6 additions

- `packages/seo` (new): JSON-LD builders (`organizationSchema`,
  `articleSchema`/`NewsArticle`, `softwareApplicationSchema`,
  `personSchema`, `breadcrumbSchema`) and a `JsonLd` script component. Note
  the schema builder file is named `schemas.ts`, not `jsonld.ts` — it
  originally was, but Windows' case-insensitive filesystem collided it with
  `JsonLd.tsx` during the build; renaming was the fix.
- `packages/config`: `SiteConfig` gained `analytics` (`provider`/`id`),
  `adsense` (`publisherId`), and `siteUrl` fields — never a hardcoded
  publisher ID, always sourced from config/env.
- `apps/ui-edition`: `app/sitemap.ts` and `app/robots.ts` (Next's built-in
  generators, enumerating every article/category/software/AI
  tool/author), `metadataBase` + title template + OG/Twitter defaults and
  an Organization JSON-LD script in the root layout, canonical URLs +
  Article/SoftwareApplication/BreadcrumbList JSON-LD on their respective
  detail pages, a new `/authors/[slug]` profile page with Person JSON-LD
  (this route was referenced by `AuthorByline`/`AuthorBio` since Phase 2 but
  never existed until now), basic pagination on category listings, and an
  env-driven `AnalyticsScript` component (Plausible or GA4, opt-in, renders
  nothing when unconfigured).
- `NewsletterSection` (`packages/ui`) now does a real `fetch` POST to an
  optional `endpoint` prop with loading/success/error states, falling back
  to a demo-only success state when no endpoint is configured — so the
  Frontend Edition still works standalone with mock data, per its own
  spec, while a connected deployment can pass a real endpoint.
- `apps/pro-edition`: `app/api/newsletter/route.ts` (public POST endpoint,
  CORS-open for local cross-port dev — tighten `Access-Control-Allow-Origin`
  to your real domain in production), and real admin forms for ad
  campaigns, creatives (auto-wrapped in an `advertisements` row), and
  slot assignments, plus a `getActiveAdForSlot` query for a future
  connected public site to call. The Analytics and SEO admin pages became
  real settings forms writing to `site_settings` (previously Phase 5
  placeholders), each documented as the source of truth once a public site
  reads `site_settings` directly — today the Frontend Edition reads
  equivalent values from environment variables instead.
- Same verification caveat as Phase 5: the ad/newsletter/analytics/SEO
  **admin** pages (pro-edition) are correct by build/type-check only, not
  verified against a live Supabase project. The **public-facing** SEO work
  in `apps/ui-edition` (sitemap, robots.txt, structured data, author page,
  pagination, newsletter demo state) was verified in-browser.

## Phase 5 additions

- `supabase/migrations/0001_init.sql`: every table from the brief's schema
  (users, authors, categories, tags, articles + join tables, media, software
  + features/categories, reviews, comparisons + items, the full ad stack,
  newsletter_subscribers, site_settings, redirects, audit_logs), UUID PKs,
  FKs, indexes, RLS enabled on every table, and `is_staff()`/`is_admin()`
  security-definer helpers so policies on `public.users` don't recurse. A
  trigger mirrors new Supabase Auth users into `public.users` as `viewer`.
- `supabase/seed.sql`: a local-only admin login plus sample authors,
  categories, software and one article — never run against a production
  project (documented in `docs/supabase-setup.md`).
- `packages/data`: a thin `createClient(url, key)` wrapper over
  `@supabase/supabase-js` plus typed query functions (`listArticles`,
  `createArticle`, `getDashboardOverview`, ...) that take a client instance
  as their first argument, so the same functions work from the browser
  client, the server client, or a future service-role client without
  rewriting queries.
- `apps/pro-edition` (new Next.js app, port 3002): Supabase Auth
  (`@supabase/ssr`, cookie-based sessions, middleware-enforced `/admin` auth
  guard), an admin shell with a sidebar covering every brief-listed section,
  a dashboard with live counts from the database, a full Articles flow
  (list, Tiptap-based editor with SEO/author/category/featured fields,
  draft/scheduled/published), and list+create pages for categories, tags,
  authors, software, newsletter subscribers, and user roles. A Site
  Customization page writes to `site_settings`, demonstrating the
  admin-override layer on top of `packages/config`'s default/preset
  resolution. Media upload, full ad campaign-to-slot assignment, analytics
  and sitewide SEO are left as honest placeholders pointing at Phase 6 —
  the schema already supports them, but the admin UI doesn't exist yet.
- **Not verified against a live database.** Docker wasn't available to run
  Supabase locally in this environment, and no hosted project credentials
  were provided, so the SQL and Next.js code are correct by construction and
  by build/type-check, but the actual migration run, RLS behavior, and
  data-backed admin pages haven't been exercised against real Postgres. The
  login page and the middleware's redirect-when-unauthenticated behavior
  were verified in-browser without a live connection. See
  `docs/supabase-setup.md` to connect a real project and verify the rest.

## Phase 4 additions

- `packages/config` gained `demoSites`: three `SiteConfig`s built through the
  existing `resolveConfig(preset, overrides)` resolver — Signal (editorial
  preset, orange), Wirefeed (minimal-blog preset repurposed as a news
  layout, blue), Stackfind (software-hub preset, green) — proving the
  default → preset → overrides resolution end-to-end rather than only in
  type definitions.
- `apps/demo-sites` (new Next.js app, port 3001): a picker page listing the
  three demos, and `app/[site]/layout.tsx` + `app/[site]/page.tsx` that
  render each demo's Header/Footer/homepage from its `SiteConfig` alone —
  siteName, tagline, accent color (applied as a CSS custom property
  override, no per-site CSS), navigation, and `homepageLayout`
  ("editorial" | "news" | "directory", each a distinct composition of the
  same `@bytescope/ui` components and `@bytescope/content` mock data).
  No page content or components are forked per demo.
- Known scope limit: demo nav links point to in-page anchors and the
  article/software cards link to `ui-edition`'s routes (`/articles/...`,
  `/software/...`), which don't exist inside `demo-sites` — acceptable for
  a homepage-configuration showcase, but full cross-page browsing per demo
  would need either shared route handlers or reverse-proxying the two apps
  together, which is out of scope for this phase.

## Phase 3 additions

- `packages/content` gained `SoftwareProduct` and `AiTool` models (features,
  pros/cons, platforms, pricing, screenshots, alternatives), a
  `relatedSoftware` link on `Article` (powers "related reviews" on a
  software profile), and `searchContent()`, a unified substring search
  across articles, software and AI tools.
- `packages/ui` gained directory primitives: `DirectoryCard`, `PricingBadge`,
  `ScreenshotGallery`, `ProsConsList`, `AlternativesList`, `SearchBox`, and
  a generic `DirectoryFilters` (search + category + pricing, client-side).
  `SoftwareDirectory` and `AiToolsDirectory` are self-contained client
  components wrapping `DirectoryFilters` with their own data — kept as
  dedicated components rather than passed as server-to-client function
  props, which React Server Components cannot serialize.
- `apps/ui-edition` routes: `/software` (directory) + `/software/[slug]`
  (profile: pricing, platforms, features, screenshots, pros/cons,
  alternatives, related reviews), `/ai-tools` + `/ai-tools/[slug]`
  (mirrors software, no platforms), `/search` (global search, reads the
  initial query from `?q=`). Reviews, comparisons and tutorials content
  continues to reuse the Phase 2 article template and category
  listing — only software and AI tools needed dedicated directory/profile
  templates, per the brief's "reusable templates" guidance.

## Phase 2 additions

- `packages/content`: typed `Article`/`Author`/`Category` models, a mock data
  provider (9 demo articles, 3 authors, 7 categories, 4 spotlighted software
  entries), and query helpers (`getLatestArticles`, `getTrendingArticles`,
  `getArticlesByCategory`, `getRelatedArticles`, ...). This is the seam that
  Phase 5 replaces with Supabase-backed queries without changing page code.
- `packages/ui` gained the editorial component set: `ArticleCard` (feature /
  secondary / grid / compact variants), `TrendingList`, `Prose` (renders
  typed `ContentBlock[]` — paragraph, heading, image, quote, code, list,
  table), `TableOfContents`, `AuthorByline`/`AuthorBio`, `ShareButtons`,
  `Breadcrumbs`, `RelatedArticles`, `SoftwareSpotlightCard`,
  `NewsletterSection`, and `AdSlot` (a labeled placeholder for the Phase 6 ad
  system, keyed by the slot IDs from the brief).
- `apps/ui-edition` routes: `/` (full editorial homepage), `/articles/[slug]`
  (article template), `/[category]` (generic category listing template,
  statically generated for all 7 categories).
