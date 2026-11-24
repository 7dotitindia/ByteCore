import type { PricingModel, Platform } from "@bytescope/content";
import { PricingBadge } from "./PricingBadge";

const platformLabels: Record<Platform, string> = {
  web: "Web",
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
  ios: "iOS",
  android: "Android",
};

export function DirectoryCard({
  href,
  name,
  tagline,
  category,
  pricingModel,
  priceFrom,
  platforms,
}: {
  href: string;
  name: string;
  tagline: string;
  category: string;
  pricingModel: PricingModel;
  priceFrom?: string;
  platforms?: Platform[];
}) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-3 border border-border p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border text-sm font-semibold text-text">
          {name.charAt(0)}
        </span>
        <span className="text-xs uppercase tracking-wide text-text-secondary">{category}</span>
      </div>

      <div>
        <h3 className="font-sans text-base font-medium text-text transition-colors group-hover:text-accent">
          {name}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{tagline}</p>
      </div>

      {platforms && platforms.length > 0 && (
        <p className="text-xs text-text-secondary">{platforms.map((p) => platformLabels[p]).join(" · ")}</p>
      )}

      <PricingBadge pricingModel={pricingModel} priceFrom={priceFrom} />
    </a>
  );
}
