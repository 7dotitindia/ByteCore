import type { Author } from "./types";

export const authors: Author[] = [
  {
    slug: "mira-okafor",
    name: "Mira Okafor",
    title: "Senior Technology Editor",
    avatar: "/authors/mira-okafor.svg",
    bio: "Mira covers infrastructure, developer platforms and the business of software. Previously a backend engineer, she now writes about the systems she used to build.",
  },
  {
    slug: "daniel-kessler",
    name: "Daniel Kessler",
    title: "AI & Innovation Correspondent",
    avatar: "/authors/daniel-kessler.svg",
    bio: "Daniel reports on applied AI, model releases and the tools teams actually use in production, cutting through vendor claims with hands-on testing.",
  },
  {
    slug: "priya-nandakumar",
    name: "Priya Nandakumar",
    title: "Software Reviews Lead",
    avatar: "/authors/priya-nandakumar.svg",
    bio: "Priya runs ByteScope's review process, evaluating software against a consistent rubric of performance, pricing and support.",
  },
];

export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}
