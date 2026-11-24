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
- [ ] Theme presets applied end-to-end, three demo sites, richer mock data provider — Phase 4

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
