"use client";

export function NewsletterSection() {
  return (
    <div id="newsletter" className="border-y border-border bg-bg-secondary py-14">
      <div className="mx-auto flex max-w-content flex-col items-start gap-5 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <h2 className="font-serif text-2xl text-text">Technology, in perspective — weekly.</h2>
          <p className="mt-2 max-w-md text-sm text-text-secondary">
            One email a week. The stories, tools and releases worth your attention — nothing else.
          </p>
        </div>
        <form className="flex w-full max-w-sm gap-2 lg:w-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="you@company.com"
            aria-label="Email address"
            className="w-full border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none placeholder:text-text-secondary focus:border-accent"
          />
          <button
            type="submit"
            className="shrink-0 bg-text px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
