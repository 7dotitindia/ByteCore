import { demoSites } from "@bytescope/config";

export default function DemoPickerPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-10 px-6 py-24">
      <div>
        <span className="text-xs font-medium uppercase tracking-widest text-[#E87535]">
          ByteScope Demo Sites
        </span>
        <h1 className="mt-3 font-serif text-4xl text-[#111111]">
          Three brands, one component library.
        </h1>
        <p className="mt-3 max-w-xl text-base text-[#686868]">
          Each demo reconfigures the same ByteScope core — colors, typography, navigation and
          homepage layout — through the site configuration engine, not a forked codebase.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {demoSites.map((demo) => (
          <a
            key={demo.slug}
            href={`/${demo.slug}`}
            className="group flex flex-col gap-3 border border-[#E5E0D8] p-5 transition-colors hover:border-[#E87535]"
          >
            <span
              className="h-8 w-8 rounded-sm"
              style={{ backgroundColor: demo.config.colors.accent }}
              aria-hidden
            />
            <h2 className="font-sans text-lg font-medium text-[#111111] group-hover:text-[#E87535]">
              {demo.label}
            </h2>
            <p className="text-sm text-[#686868]">{demo.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
