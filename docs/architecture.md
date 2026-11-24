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
- [ ] Editorial homepage, article templates, category pages — Phase 2
