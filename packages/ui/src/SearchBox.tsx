"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchContent, type SearchResult } from "@bytescope/content";

const typeLabels: Record<SearchResult["type"], string> = {
  article: "Article",
  software: "Software",
  "ai-tool": "AI Tool",
};

export function SearchBox({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchContent(query), [query]);

  return (
    <div>
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, software, AI tools..."
          aria-label="Search ByteScope"
          className="w-full border border-border bg-bg-secondary py-4 pl-12 pr-4 text-lg text-text outline-none placeholder:text-text-secondary focus:border-accent"
        />
      </div>

      {query.trim() && (
        <div className="mt-8">
          {results.length === 0 ? (
            <p className="text-sm text-text-secondary">No results for &ldquo;{query}&rdquo;.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {results.map((result) => (
                <li key={`${result.type}-${result.slug}`}>
                  <a href={result.href} className="group flex items-center justify-between gap-4 py-4">
                    <span>
                      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
                        {typeLabels[result.type]}
                      </span>
                      <span className="block text-base text-text group-hover:text-accent">{result.title}</span>
                      <span className="block text-sm text-text-secondary">{result.description}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
