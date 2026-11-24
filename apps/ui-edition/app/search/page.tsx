import type { Metadata } from "next";
import { Container, SearchBox } from "@bytescope/ui";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Container className="py-10">
      <h1 className="font-serif text-3xl text-text">Search</h1>
      <div className="mt-6 max-w-2xl">
        <SearchBox initialQuery={q ?? ""} />
      </div>
    </Container>
  );
}
