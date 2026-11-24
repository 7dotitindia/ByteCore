import { getSiteSettings } from "@bytescope/data";
import { defaultConfig } from "@bytescope/config";
import { createClient } from "@/lib/supabase/server";
import { updateCustomizationAction } from "./actions";

export default async function AdminCustomizationPage() {
  const supabase = await createClient();
  const settings = await getSiteSettings(supabase);
  const config = { ...defaultConfig, ...(settings?.config ?? {}) } as typeof defaultConfig;

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Site Customization</h1>
      <p className="mt-1 max-w-xl text-sm text-text-secondary">
        Writes to <code>site_settings</code>, the admin-configurable layer on top of the default
        config and theme presets in <code>packages/config</code> — see <code>docs/architecture.md</code>.
      </p>

      <form action={updateCustomizationAction} className="mt-8 flex max-w-lg flex-col gap-5">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Site name</label>
          <input name="siteName" defaultValue={config.siteName} className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Tagline</label>
          <input name="tagline" defaultValue={config.tagline} className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Primary color</label>
            <input name="primaryColor" type="text" defaultValue={config.colors.primary} className="w-32 border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Accent color</label>
            <input name="accentColor" type="text" defaultValue={config.colors.accent} className="w-32 border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Default theme</label>
          <select name="defaultTheme" defaultValue={config.defaultTheme} className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Homepage layout</label>
          <select name="homepageLayout" defaultValue={config.homepageLayout} className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
            <option value="editorial">Editorial</option>
            <option value="news">News</option>
            <option value="directory">Directory</option>
          </select>
        </div>
        <button type="submit" className="mt-2 bg-text px-4 py-2.5 text-sm font-medium text-bg hover:opacity-90">
          Save
        </button>
      </form>
    </div>
  );
}
