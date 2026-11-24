export type AdSlotId =
  | "home_top"
  | "home_mid"
  | "article_top"
  | "article_inline_1"
  | "article_inline_2"
  | "article_sidebar"
  | "article_bottom"
  | "category_listing";

/**
 * Placeholder container until the ad management system lands (Phase 6).
 * Keeps layout space and disclosure reserved so later wiring doesn't reflow pages.
 */
export function AdSlot({ id, className = "" }: { id: AdSlotId; className?: string }) {
  return (
    <div
      data-ad-slot={id}
      className={`flex min-h-[90px] items-center justify-center border border-dashed border-border text-xs text-text-secondary ${className}`}
    >
      Advertisement
    </div>
  );
}
