import { getSiteSettings } from "@bytescope/data";
import { defaultConfig } from "@bytescope/config";
import { createClient } from "@/lib/supabase/server";
import { updateSeoDefaultsAction } from "./actions";

export default async function AdminSeoPage() {
  const supabase = await createClient();
  const settings = await getSiteSettings(supabase);
  const config = settings?.config as
    | { siteUrl?: string; seo?: { defaultTitle?: string; defaultDescription?: string } }
    | undefined;

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">SEO</h1>
      <p className="mt-1 max-w-lg text-sm text-text-secondary">
        Sitewide defaults saved to <code>site_settings</code>. The Frontend Edition already
        generates per-page metadata, canonical URLs, a sitemap, <code>robots.txt</code>, and
        Article/SoftwareApplication/Person/Organization/BreadcrumbList structured data from{" "}
        <code>apps/ui-edition</code>'s own code — this form sets the values a connected public
        site reads for its base URL and fallback title/description.
      </p>

      <form action={updateSeoDefaultsAction} className="mt-8 flex max-w-lg flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Site URL</label>
          <input
            name="siteUrl"
            type="url"
            defaultValue={config?.siteUrl ?? defaultConfig.siteUrl}
            className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Default title</label>
          <input
            name="defaultTitle"
            defaultValue={config?.seo?.defaultTitle ?? `${defaultConfig.siteName} — ${defaultConfig.tagline}`}
            className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Default description</label>
          <textarea
            name="defaultDescription"
            rows={3}
            defaultValue={config?.seo?.defaultDescription}
            className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent"
          />
        </div>
        <button type="submit" className="mt-2 bg-text px-4 py-2.5 text-sm font-medium text-bg hover:opacity-90">
          Save
        </button>
      </form>
    </div>
  );
}
