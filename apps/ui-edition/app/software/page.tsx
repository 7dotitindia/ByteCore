import type { Metadata } from "next";
import { AdSlot, Breadcrumbs, Container, SoftwareDirectory } from "@bytescope/ui";

export const metadata: Metadata = {
  title: "Software Directory",
  description: "A curated directory of software worth your attention.",
};

export default function SoftwareDirectoryPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Software" }]} />

      <div className="mt-6 max-w-2xl border-b border-border pb-8">
        <h1 className="font-serif text-4xl text-text">Software Directory</h1>
        <p className="mt-3 text-base text-text-secondary">
          A curated directory of software worth your attention — searchable by category and pricing.
        </p>
      </div>

      <AdSlot id="category_listing" className="my-10" />

      <SoftwareDirectory />
    </Container>
  );
}
