# Supabase setup (ByteScope Pro)

This project ships schema and code, not a running database — you connect your own
Supabase project (hosted or local). No credentials are stored in this repo.

## 1. Create a project

Create a project at [supabase.com](https://supabase.com) (or run one locally with
`supabase start`, which needs Docker — skip this if you're going straight to a
hosted project). Note its project URL and anon key from Project Settings → API.

## 2. Apply the schema

From the repo root, with the Supabase CLI linked to your project:

```powershell
supabase link --project-ref <your-project-ref>
supabase db push
```

This runs `supabase/migrations/0001_init.sql`, which creates every table, the
`user_role`/`content_status`/`pricing_model` enums, RLS policies for each table,
and the `handle_new_user` trigger that mirrors new Supabase Auth users into
`public.users` as a `viewer` by default.

Alternatively, paste the contents of `supabase/migrations/0001_init.sql` into the
Supabase dashboard's SQL Editor and run it once.

## 3. Seed data (local/dev projects only)

`supabase/seed.sql` creates a known admin login
(`admin@bytescope.test` / `bytescope-admin`) and sample authors, categories,
software and an article. **Never run this against a production project** — it
creates a publicly-known password.

```powershell
supabase db execute -f supabase/seed.sql
```

## 4. Environment variables

Copy `.env.example` to `apps/pro-edition/.env.local` and fill in your project's
URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

`SUPABASE_SERVICE_ROLE_KEY` is only needed for server-side admin operations that
must bypass RLS (none are wired up yet) — never expose it to client code.

## 5. Run the admin app

```powershell
pnpm --filter @bytescope/pro-edition dev
```

Visit `http://localhost:3002/login` and sign in with the seed admin (local/dev)
or a user you've created in Supabase Auth and promoted to `admin` in the
`public.users` table.

## 6. Media uploads (not yet wired up)

The `media` table exists and the admin Media Library page lists it, but there's
no upload route yet. To add one: create a Storage bucket (e.g. `media`), make it
public or sign URLs as needed, and add a route handler that uploads to Storage
then inserts a row into `public.media`.

## What's not here yet

Analytics, sitewide SEO defaults (sitemap/robots/structured data), and the full
advertisement campaign-to-slot assignment flow are scheduled for Phase 6 — the
database schema already supports them, but the admin UI for the heavier pieces
isn't built.
