"use client";

import { softwareCategories, softwareProducts } from "@bytescope/content";
import { DirectoryCard } from "./DirectoryCard";
import { DirectoryFilters } from "./DirectoryFilters";

export function SoftwareDirectory() {
  return (
    <DirectoryFilters
      items={softwareProducts}
      categories={[...softwareCategories]}
      pricingOptions={["Free", "Freemium", "Paid"]}
      getSearchableText={(s) => `${s.name} ${s.tagline} ${s.category}`}
      getCategory={(s) => s.category}
      getPricing={(s) => s.pricingModel}
      emptyLabel="No software matches those filters."
      renderCard={(s) => (
        <DirectoryCard
          key={s.slug}
          href={`/software/${s.slug}`}
          name={s.name}
          tagline={s.tagline}
          category={s.category}
          pricingModel={s.pricingModel}
          priceFrom={s.priceFrom}
          platforms={s.platforms}
        />
      )}
    />
  );
}
