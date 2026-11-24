export function AlternativesList({
  items,
}: {
  items: { slug: string; name: string; tagline: string; href: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 text-xs font-medium uppercase tracking-wide text-text-secondary">Alternatives</h3>
      <div className="flex flex-col divide-y divide-border border-y border-border">
        {items.map((item) => (
          <a
            key={item.slug}
            href={item.href}
            className="group flex items-center justify-between gap-4 py-3 transition-colors hover:text-accent"
          >
            <span>
              <span className="block text-sm font-medium text-text group-hover:text-accent">{item.name}</span>
              <span className="block text-xs text-text-secondary">{item.tagline}</span>
            </span>
            <span className="text-xs text-text-secondary group-hover:text-accent">View &rarr;</span>
          </a>
        ))}
      </div>
    </div>
  );
}
