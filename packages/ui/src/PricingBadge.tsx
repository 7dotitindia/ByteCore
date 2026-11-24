import type { PricingModel } from "@bytescope/content";

export function PricingBadge({ pricingModel, priceFrom }: { pricingModel: PricingModel; priceFrom?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wide text-text-secondary">
      {pricingModel}
      {priceFrom && <span className="normal-case">&middot; from {priceFrom}</span>}
    </span>
  );
}
