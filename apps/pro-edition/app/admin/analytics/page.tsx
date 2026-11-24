import { getSiteSettings } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { updateAnalyticsAction } from "./actions";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();
  const settings = await getSiteSettings(supabase);
  const analytics = (settings?.config as { analytics?: { provider?: string; id?: string } } | undefined)?.analytics ?? {
    provider: "none",
  };

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Analytics</h1>
      <p className="mt-1 max-w-lg text-sm text-text-secondary">
        Saves to <code>site_settings.config.analytics</code>. The Frontend and Pro editions'
        public pages read the equivalent <code>NEXT_PUBLIC_ANALYTICS_PROVIDER</code> /{" "}
        <code>NEXT_PUBLIC_ANALYTICS_ID</code> environment variables at build time (never a
        hardcoded ID) — set this here as the source of truth once a public site reads
        <code> site_settings</code> directly, or mirror these two values into that site's
        environment today.
      </p>

      <form action={updateAnalyticsAction} className="mt-8 flex max-w-sm flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Provider</label>
          <select name="provider" defaultValue={analytics.provider} className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
            <option value="none">None</option>
            <option value="plausible">Plausible</option>
            <option value="ga4">Google Analytics 4</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">
            Domain (Plausible) / Measurement ID (GA4)
          </label>
          <input name="id" defaultValue={analytics.id} className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <button type="submit" className="mt-2 bg-text px-4 py-2.5 text-sm font-medium text-bg hover:opacity-90">
          Save
        </button>
      </form>

      <p className="mt-8 max-w-lg text-sm text-text-secondary">
        Pageview dashboards aren't built here — that data lives with the analytics provider you
        configure above. The <code>advertisements</code> table's impressions/clicks counters are
        the only metrics this admin currently surfaces directly (see Advertisements).
      </p>
    </div>
  );
}
