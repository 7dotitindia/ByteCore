import type { SoftwareProduct } from "./types";

function shot(seed: string, alt: string) {
  return { src: `https://picsum.photos/seed/${seed}/1200/750`, alt };
}

export const softwareCategories = [
  "Developer Tools",
  "Productivity",
  "Infrastructure",
  "Design",
] as const;

export const softwareProducts: SoftwareProduct[] = [
  {
    slug: "fieldnotes",
    name: "Fieldnotes",
    tagline: "A distraction-free writing app",
    description:
      "Fieldnotes is a demonstration software profile for this template, illustrating a single-column, keyboard-first writing editor with no AI sidebar and no collaboration cursors.",
    category: "Productivity",
    platforms: ["macos", "windows", "web"],
    pricingModel: "Freemium",
    priceFrom: "$6/mo",
    website: "https://example.com/fieldnotes",
    screenshots: [shot("fieldnotes-1", "Fieldnotes editor showing a single column of text"), shot("fieldnotes-2", "Fieldnotes focus mode with the sidebar collapsed")],
    features: ["Distraction-free editor", "Local-first storage", "Markdown export", "Word count on demand"],
    pros: ["Fast on large documents", "Clean, calm interface", "Works fully offline"],
    cons: ["No real-time collaboration", "Limited plugin ecosystem"],
    alternatives: ["queryloop"],
    spotlight: true,
  },
  {
    slug: "pipedash",
    name: "Pipedash",
    tagline: "CI/CD observability for small teams",
    description:
      "Pipedash is a demonstration software profile illustrating a CI/CD observability dashboard: build timings, flaky test detection, and deploy history in one view.",
    category: "Infrastructure",
    platforms: ["web"],
    pricingModel: "Paid",
    priceFrom: "$29/mo",
    website: "https://example.com/pipedash",
    screenshots: [shot("pipedash-1", "Pipedash dashboard showing build duration trends"), shot("pipedash-2", "Pipedash flaky test report")],
    features: ["Build time trends", "Flaky test detection", "Slack and email alerts", "Multi-provider support"],
    pros: ["Setup takes minutes", "Clear flaky-test signal"],
    cons: ["No self-hosted option", "Pricier at scale"],
    alternatives: ["driftcheck"],
    spotlight: true,
  },
  {
    slug: "queryloop",
    name: "Queryloop",
    tagline: "A Postgres-native query workbench",
    description:
      "Queryloop is a demonstration software profile illustrating a lightweight SQL workbench built specifically around Postgres conventions, with inline EXPLAIN plans.",
    category: "Developer Tools",
    platforms: ["macos", "windows", "linux"],
    pricingModel: "Free",
    website: "https://example.com/queryloop",
    screenshots: [shot("queryloop-1", "Queryloop query editor with an EXPLAIN plan panel")],
    features: ["Inline EXPLAIN plans", "Saved query library", "Schema browser", "CSV export"],
    pros: ["Genuinely free", "Fast schema browsing"],
    cons: ["Postgres only", "No team sharing yet"],
    alternatives: ["fieldnotes"],
    spotlight: true,
  },
  {
    slug: "driftcheck",
    name: "Driftcheck",
    tagline: "Infrastructure drift detection",
    description:
      "Driftcheck is a demonstration software profile illustrating continuous comparison between your Terraform state and live cloud infrastructure, flagging drift before it causes an incident.",
    category: "Infrastructure",
    platforms: ["web"],
    pricingModel: "Freemium",
    priceFrom: "$0",
    website: "https://example.com/driftcheck",
    screenshots: [shot("driftcheck-1", "Driftcheck drift report comparing state to live infrastructure")],
    features: ["Continuous drift scanning", "Terraform and OpenTofu support", "Slack alerts", "Audit log"],
    pros: ["Generous free tier", "Clear diff view"],
    cons: ["Limited to a few cloud providers today"],
    alternatives: ["pipedash"],
    spotlight: true,
  },
  {
    slug: "framewright",
    name: "Framewright",
    tagline: "A component-driven design tool",
    description:
      "Framewright is a demonstration software profile illustrating a design tool built around reusable, code-aware components rather than freeform canvases.",
    category: "Design",
    platforms: ["macos", "web"],
    pricingModel: "Paid",
    priceFrom: "$18/mo",
    website: "https://example.com/framewright",
    screenshots: [shot("framewright-1", "Framewright component library panel")],
    features: ["Code-aware components", "Design tokens sync", "Version history", "Dev handoff mode"],
    pros: ["Keeps design and code tokens in sync", "Fast handoff"],
    cons: ["Steeper learning curve", "Mac-first, web is newer"],
    alternatives: [],
  },
  {
    slug: "logbrook",
    name: "Logbrook",
    tagline: "Structured logging without the setup tax",
    description:
      "Logbrook is a demonstration software profile illustrating a structured-logging service with a generous free tier and a query language closer to SQL than to proprietary DSLs.",
    category: "Developer Tools",
    platforms: ["web"],
    pricingModel: "Freemium",
    priceFrom: "$0",
    website: "https://example.com/logbrook",
    screenshots: [shot("logbrook-1", "Logbrook query interface over structured logs")],
    features: ["SQL-like query language", "Live tail", "Retention policies", "Alerting rules"],
    pros: ["Query language feels familiar", "Reasonable free tier"],
    cons: ["No on-prem deployment"],
    alternatives: ["pipedash"],
  },
];

export function getSoftwareProduct(slug: string) {
  return softwareProducts.find((s) => s.slug === slug);
}

export function getSpotlightSoftware() {
  return softwareProducts.filter((s) => s.spotlight);
}

export function getSoftwareAlternatives(product: SoftwareProduct) {
  return softwareProducts.filter((s) => product.alternatives.includes(s.slug));
}
