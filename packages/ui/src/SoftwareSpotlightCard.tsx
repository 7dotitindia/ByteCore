import type { SoftwareEntry } from "@bytescope/content";

export function SoftwareSpotlightCard({ entry }: { entry: SoftwareEntry }) {
  return (
    <a
      href={entry.url}
      className="group flex flex-col gap-3 border border-border p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-sm font-semibold text-text">
          {entry.name.charAt(0)}
        </span>
        <span className="text-xs uppercase tracking-wide text-text-secondary">{entry.pricing}</span>
      </div>
      <div>
        <h3 className="font-sans text-base font-medium text-text transition-colors group-hover:text-accent">
          {entry.name}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{entry.tagline}</p>
      </div>
      {entry.priceFrom && (
        <span className="text-xs text-text-secondary">From {entry.priceFrom}</span>
      )}
    </a>
  );
}
