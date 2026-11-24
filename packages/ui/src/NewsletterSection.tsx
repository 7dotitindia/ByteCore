"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterSection({ endpoint }: { endpoint?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!endpoint) {
      // No backend configured (e.g. the Frontend Edition on its own) — demo only.
      setStatus("success");
      return;
    }

    const email = new FormData(e.currentTarget).get("email");
    setStatus("loading");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="newsletter" className="border-y border-border bg-bg-secondary py-14">
      <div className="mx-auto flex max-w-content flex-col items-start gap-5 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <h2 className="font-serif text-2xl text-text">Technology, in perspective — weekly.</h2>
          <p className="mt-2 max-w-md text-sm text-text-secondary">
            One email a week. The stories, tools and releases worth your attention — nothing else.
          </p>
        </div>

        {status === "success" ? (
          <p className="text-sm font-medium text-accent">You&apos;re on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2 lg:w-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              aria-label="Email address"
              className="w-full border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none placeholder:text-text-secondary focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 bg-text px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-accent">Something went wrong — try again in a moment.</p>
        )}
      </div>
    </div>
  );
}
