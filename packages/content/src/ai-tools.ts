import type { AiTool } from "./types";

function shot(seed: string, alt: string) {
  return { src: `https://picsum.photos/seed/${seed}/1200/750`, alt };
}

export const aiToolCategories = ["Coding", "Writing", "Image Generation", "Research"] as const;

export const aiTools: AiTool[] = [
  {
    slug: "pairforge",
    name: "Pairforge",
    tagline: "An AI pair programmer that reads your whole repo",
    description:
      "Pairforge is a demonstration AI tool profile illustrating a coding agent that indexes a full repository before suggesting changes, rather than working from a single open file.",
    category: "Coding",
    pricingModel: "Freemium",
    priceFrom: "$20/mo",
    website: "https://example.com/pairforge",
    screenshots: [shot("pairforge-1", "Pairforge showing a suggested diff across three files")],
    features: ["Whole-repo indexing", "Multi-file diffs", "Test generation", "PR descriptions"],
    pros: ["Understands cross-file context well", "Generates usable test coverage"],
    cons: ["Slower on very large monorepos", "Occasional over-confident refactors"],
    alternatives: ["codemesh"],
  },
  {
    slug: "codemesh",
    name: "Codemesh",
    tagline: "Lightweight AI code review in your existing PR flow",
    description:
      "Codemesh is a demonstration AI tool profile illustrating an automated reviewer that comments directly on pull requests instead of running as a separate editor extension.",
    category: "Coding",
    pricingModel: "Paid",
    priceFrom: "$15/seat/mo",
    website: "https://example.com/codemesh",
    screenshots: [shot("codemesh-1", "Codemesh leaving inline review comments on a pull request")],
    features: ["Inline PR comments", "Severity scoring", "Custom rule packs", "GitHub and GitLab support"],
    pros: ["Fits existing review habits", "Low false-positive rate"],
    cons: ["GitHub/GitLab only today"],
    alternatives: ["pairforge"],
  },
  {
    slug: "draftline",
    name: "Draftline",
    tagline: "An editor that keeps your voice, not the model's",
    description:
      "Draftline is a demonstration AI tool profile illustrating a writing assistant tuned to preserve a learned personal voice profile rather than defaulting to generic AI phrasing.",
    category: "Writing",
    pricingModel: "Freemium",
    priceFrom: "$12/mo",
    website: "https://example.com/draftline",
    screenshots: [shot("draftline-1", "Draftline voice-matching suggestion panel")],
    features: ["Personal voice profile", "Tone-preserving rewrites", "Google Docs plugin", "Version comparison"],
    pros: ["Noticeably less generic output", "Good tone control"],
    cons: ["Voice profile needs a few samples to calibrate"],
    alternatives: [],
  },
  {
    slug: "framegen",
    name: "Framegen",
    tagline: "Product photography generation from a single reference shot",
    description:
      "Framegen is a demonstration AI tool profile illustrating an image-generation workflow aimed specifically at product photography consistency across a catalog.",
    category: "Image Generation",
    pricingModel: "Paid",
    priceFrom: "$39/mo",
    website: "https://example.com/framegen",
    screenshots: [shot("framegen-1", "Framegen generating consistent product shots from one reference image")],
    features: ["Reference-shot consistency", "Batch generation", "Background removal", "Catalog export"],
    pros: ["Strong consistency across a product line", "Fast batch mode"],
    cons: ["Occasional artifacts on reflective surfaces"],
    alternatives: [],
  },
  {
    slug: "citewell",
    name: "Citewell",
    tagline: "Research synthesis that shows its sources inline",
    description:
      "Citewell is a demonstration AI tool profile illustrating a research assistant that keeps every claim linked to its source passage, rather than producing an unsourced summary.",
    category: "Research",
    pricingModel: "Freemium",
    priceFrom: "$10/mo",
    website: "https://example.com/citewell",
    screenshots: [shot("citewell-1", "Citewell summary with inline source citations")],
    features: ["Inline source linking", "PDF and web import", "Contradiction flags", "Export to Markdown"],
    pros: ["Sourcing is genuinely verifiable", "Good at flagging contradictions"],
    cons: ["Slower than summary-only tools"],
    alternatives: [],
  },
];

export function getAiTool(slug: string) {
  return aiTools.find((t) => t.slug === slug);
}

export function getAiToolAlternatives(tool: AiTool) {
  return aiTools.filter((t) => tool.alternatives.includes(t.slug));
}
