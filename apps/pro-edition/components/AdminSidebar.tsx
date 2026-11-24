import { signOut } from "@/app/admin/actions";

const sections: { label: string; href: string }[] = [
  { label: "Overview", href: "/admin" },
  { label: "Articles", href: "/admin/articles" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Tags", href: "/admin/tags" },
  { label: "Authors", href: "/admin/authors" },
  { label: "Media Library", href: "/admin/media" },
  { label: "Software", href: "/admin/software" },
  { label: "Advertisements", href: "/admin/advertisements" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "SEO", href: "/admin/seo" },
  { label: "Site Customization", href: "/admin/customization" },
  { label: "Users & Roles", href: "/admin/users" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar({ email }: { email: string }) {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-bg-secondary">
      <div className="border-b border-border px-5 py-4">
        <span className="font-sans text-sm font-semibold text-text">ByteScope Pro</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        <ul className="flex flex-col">
          {sections.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="block px-5 py-2 text-sm text-text-secondary transition-colors hover:bg-border/40 hover:text-text"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border px-5 py-4">
        <p className="mb-2 truncate text-xs text-text-secondary">{email}</p>
        <form action={signOut}>
          <button type="submit" className="text-xs font-medium text-accent hover:opacity-80">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
