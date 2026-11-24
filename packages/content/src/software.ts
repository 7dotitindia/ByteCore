export interface SoftwareEntry {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  pricing: "Free" | "Freemium" | "Paid";
  priceFrom?: string;
  url: string;
}

export const softwareSpotlight: SoftwareEntry[] = [
  { slug: "fieldnotes", name: "Fieldnotes", tagline: "A distraction-free writing app", logo: "/software/fieldnotes.svg", pricing: "Freemium", priceFrom: "$6/mo", url: "/software/fieldnotes" },
  { slug: "pipedash", name: "Pipedash", tagline: "CI/CD observability for small teams", logo: "/software/pipedash.svg", pricing: "Paid", priceFrom: "$29/mo", url: "/software/pipedash" },
  { slug: "queryloop", name: "Queryloop", tagline: "A Postgres-native query workbench", logo: "/software/queryloop.svg", pricing: "Free", url: "/software/queryloop" },
  { slug: "driftcheck", name: "Driftcheck", tagline: "Infrastructure drift detection", logo: "/software/driftcheck.svg", pricing: "Freemium", priceFrom: "$0", url: "/software/driftcheck" },
];
