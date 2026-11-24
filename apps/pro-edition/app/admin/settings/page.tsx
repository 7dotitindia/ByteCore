export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Settings</h1>
      <p className="mt-3 max-w-lg text-sm text-text-secondary">
        Branding, colors, theme and homepage layout now live under{" "}
        <a href="/admin/customization" className="text-accent hover:opacity-80">
          Site Customization
        </a>
        . General environment settings (Supabase project, site URL, newsletter provider keys) are
        configured via environment variables — see <code>.env.example</code> and{" "}
        <code>docs/supabase-setup.md</code> — rather than stored in the database, so they're never
        exposed through this UI.
      </p>
    </div>
  );
}
