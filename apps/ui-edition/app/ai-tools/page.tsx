import type { Metadata } from "next";
import { AdSlot, AiToolsDirectory, Breadcrumbs, Container } from "@bytescope/ui";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Curated AI tools, tested hands-on rather than taken at the vendor's word.",
};

export default function AiToolsDirectoryPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "AI Tools" }]} />

      <div className="mt-6 max-w-2xl border-b border-border pb-8">
        <h1 className="font-serif text-4xl text-text">AI Tools Directory</h1>
        <p className="mt-3 text-base text-text-secondary">
          Curated AI tools, organized by what they actually do rather than by hype.
        </p>
      </div>

      <AdSlot id="category_listing" className="my-10" />

      <AiToolsDirectory />
    </Container>
  );
}
