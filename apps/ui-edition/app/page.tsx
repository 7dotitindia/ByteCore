import { defaultConfig } from "@bytescope/config";

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-content flex-col gap-6 px-6 py-24 lg:px-10">
      <span className="text-xs font-medium uppercase tracking-widest text-accent">
        Phase 1 — Foundation
      </span>
      <h1 className="max-w-2xl font-serif text-5xl leading-tight text-text">
        {defaultConfig.tagline}
      </h1>
      <p className="max-w-xl text-base text-text-secondary">
        The {defaultConfig.siteName} design system, global layout, header and
        footer are in place. The full editorial homepage, article templates
        and software directory land in Phase 2.
      </p>
    </section>
  );
}
