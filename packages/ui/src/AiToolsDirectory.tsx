"use client";

import { aiToolCategories, aiTools } from "@bytescope/content";
import { DirectoryCard } from "./DirectoryCard";
import { DirectoryFilters } from "./DirectoryFilters";

export function AiToolsDirectory() {
  return (
    <DirectoryFilters
      items={aiTools}
      categories={[...aiToolCategories]}
      pricingOptions={["Free", "Freemium", "Paid"]}
      getSearchableText={(t) => `${t.name} ${t.tagline} ${t.category}`}
      getCategory={(t) => t.category}
      getPricing={(t) => t.pricingModel}
      emptyLabel="No tools match those filters."
      renderCard={(t) => (
        <DirectoryCard
          key={t.slug}
          href={`/ai-tools/${t.slug}`}
          name={t.name}
          tagline={t.tagline}
          category={t.category}
          pricingModel={t.pricingModel}
          priceFrom={t.priceFrom}
        />
      )}
    />
  );
}
