"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";

export function DirectoryFilters<T>({
  items,
  categories,
  pricingOptions,
  getSearchableText,
  getCategory,
  getPricing,
  renderCard,
  emptyLabel = "No results match those filters.",
}: {
  items: T[];
  categories: string[];
  pricingOptions: string[];
  getSearchableText: (item: T) => string;
  getCategory: (item: T) => string;
  getPricing: (item: T) => string;
  renderCard: (item: T) => ReactNode;
  emptyLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [pricing, setPricing] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (q && !getSearchableText(item).toLowerCase().includes(q)) return false;
      if (category !== "all" && getCategory(item) !== category) return false;
      if (pricing !== "all" && getPricing(item) !== pricing) return false;
      return true;
    });
  }, [items, query, category, pricing, getSearchableText, getCategory, getPricing]);

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            aria-label="Search"
            className="w-full border border-border bg-bg py-2.5 pl-9 pr-4 text-sm text-text outline-none placeholder:text-text-secondary focus:border-accent"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          className="border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={pricing}
          onChange={(e) => setPricing(e.target.value)}
          aria-label="Filter by pricing"
          className="border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"
        >
          <option value="all">All pricing</option>
          {pricingOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-sm text-text-secondary">{emptyLabel}</p>
      ) : (
        <div className="grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => renderCard(item))}
        </div>
      )}
    </div>
  );
}
