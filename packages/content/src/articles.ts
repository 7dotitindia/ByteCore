import type { Article } from "./types";

function img(seed: string) {
  return `https://picsum.photos/seed/${seed}/1600/1000`;
}

export const articles: Article[] = [
  {
    slug: "edge-inference-rewrites-the-latency-budget",
    title: "Edge inference is rewriting the latency budget for AI products",
    subtitle:
      "As models shrink and silicon improves, teams are moving inference off the cloud and onto the device — and rethinking what \"fast enough\" means.",
    excerpt:
      "As models shrink and silicon improves, teams are moving inference off the cloud and onto the device.",
    category: "ai-innovation",
    tags: ["AI", "Edge Computing", "Infrastructure"],
    author: "daniel-kessler",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-20",
    readingTime: 7,
    featuredImage: { src: img("edge-inference"), alt: "A server rack bathed in blue light", caption: "On-device inference is shifting where the compute happens — and who pays for it." },
    featured: true,
    trendingRank: 1,
    content: [
      { type: "paragraph", text: "For most of the last decade, the default architecture for an AI feature was simple: collect the input, send it to a cloud endpoint, wait for a response. That round trip is now the bottleneck teams are racing to remove." },
      { type: "heading", level: 2, text: "Why latency became the metric that matters", id: "why-latency-matters" },
      { type: "paragraph", text: "Model quality improvements have plateaued relative to user expectations. A response that arrives a second late reads as broken, regardless of how accurate it is. That shift in expectation is pushing inference closer to the user." },
      { type: "quote", text: "We didn't move inference to the device to save money. We moved it because 200 milliseconds of network round trip was the single biggest driver of task abandonment in our funnel.", attribution: "VP of Engineering, mid-size productivity software company" },
      { type: "heading", level: 2, text: "What changed on the hardware side", id: "hardware-side" },
      { type: "paragraph", text: "Consumer-grade NPUs now handle quantized models that would have needed a dedicated GPU three years ago. That has made on-device inference viable for a much wider set of products, not just flagship phones." },
      { type: "table", headers: ["Approach", "Typical latency", "Where it fits"], rows: [["Cloud inference", "150–400ms", "Heavy models, infrequent calls"], ["Edge gateway", "30–80ms", "Regional compliance, moderate load"], ["On-device", "<20ms", "Interactive UI, offline-first"]] },
      { type: "heading", level: 2, text: "The trade-offs nobody puts in the keynote", id: "trade-offs" },
      { type: "paragraph", text: "Smaller models mean accuracy trade-offs, and device fragmentation means testing matrices multiply fast. Teams that have shipped this successfully describe it less as a model problem and more as a release-engineering problem." },
      { type: "list", items: ["Model size vs. accuracy budget has to be decided per feature, not per product", "Fallback to cloud inference is still required for low-end devices", "Update cadence for on-device models is slower than for server-side ones"] },
    ],
  },
  {
    slug: "the-return-of-the-boring-database",
    title: "The return of the boring database",
    subtitle: "After a decade of NewSQL experimentation, more teams are quietly going back to Postgres — and staying there.",
    excerpt: "After a decade of NewSQL experimentation, more teams are quietly going back to Postgres.",
    category: "technology",
    tags: ["Databases", "Infrastructure"],
    author: "mira-okafor",
    publishedAt: "2026-11-15",
    readingTime: 6,
    featuredImage: { src: img("boring-database"), alt: "Rows of server hardware in a data center" },
    trendingRank: 2,
    content: [
      { type: "paragraph", text: "It is a strange thing to watch an industry rediscover boredom as a feature. But that is roughly what has happened with the database layer over the last two years." },
      { type: "heading", level: 2, text: "What teams actually ran into", id: "what-teams-ran-into" },
      { type: "paragraph", text: "Distributed SQL promised to remove the operational ceiling of a single-node database. In practice, many teams hit that ceiling much later than vendors suggested, and paid an operational tax getting there early." },
      { type: "code", language: "sql", code: "CREATE INDEX CONCURRENTLY idx_orders_customer_created\n  ON orders (customer_id, created_at DESC);" },
      { type: "paragraph", text: "Extensions like pg_partman and pg_cron have closed much of the gap that used to require a managed distributed system, for a large share of workloads." },
    ],
  },
  {
    slug: "inside-the-new-wave-of-ai-coding-agents",
    title: "Inside the new wave of AI coding agents",
    subtitle: "They read your codebase, open pull requests, and run your tests. What are they actually good at, today?",
    excerpt: "They read your codebase, open pull requests, and run your tests. What are they actually good at, today?",
    category: "ai-innovation",
    tags: ["AI", "Developer Tools"],
    author: "daniel-kessler",
    publishedAt: "2026-11-10",
    readingTime: 9,
    featuredImage: { src: img("coding-agents"), alt: "A code editor showing a diff view" },
    featured: true,
    content: [
      { type: "paragraph", text: "Coding agents have moved from novelty to daily tool for a meaningful slice of professional developers in under two years. The honest answer to \"are they good\" depends entirely on the shape of the task." },
      { type: "heading", level: 2, text: "Where they earn their keep", id: "where-they-earn-it" },
      { type: "list", ordered: true, items: ["Mechanical refactors across many files", "Writing the first draft of test coverage for existing code", "Tracing a bug through an unfamiliar codebase"] },
      { type: "heading", level: 2, text: "Where they still need a human", id: "still-need-a-human" },
      { type: "paragraph", text: "Architectural decisions, anything touching billing or auth, and ambiguous product requirements remain squarely human territory — not because the models can't produce an answer, but because the cost of a confident wrong answer is high." },
    ],
  },
  {
    slug: "a-practical-guide-to-shipping-your-first-mcp-server",
    title: "A practical guide to shipping your first MCP server",
    subtitle: "A step-by-step walkthrough of designing, building and deploying a Model Context Protocol server.",
    excerpt: "A step-by-step walkthrough of designing, building and deploying a Model Context Protocol server.",
    category: "tutorials",
    tags: ["Tutorial", "AI", "Developer Tools"],
    author: "daniel-kessler",
    publishedAt: "2026-11-05",
    readingTime: 11,
    featuredImage: { src: img("mcp-tutorial"), alt: "A terminal window with a running server process" },
    content: [
      { type: "paragraph", text: "This guide walks through building a minimal MCP server from scratch, covering tool definitions, schema validation and the handshake an agent client expects." },
      { type: "heading", level: 2, text: "1. Define your tool surface", id: "define-tool-surface" },
      { type: "paragraph", text: "Start with the smallest possible set of tools. Every tool you expose is a decision the model has to make correctly, so fewer, well-scoped tools outperform a large sprawling surface." },
      { type: "code", language: "typescript", code: "server.tool(\"search_articles\", { query: z.string() }, async ({ query }) => {\n  return await searchIndex.query(query);\n});" },
      { type: "heading", level: 2, text: "2. Validate everything at the boundary", id: "validate-boundary" },
      { type: "paragraph", text: "Treat every tool input as untrusted, even when it comes from your own agent. Schema validation at the boundary catches far more bugs than it should." },
    ],
  },
  {
    slug: "linear-stripe-and-the-discipline-of-restraint",
    title: "Linear, Stripe, and the discipline of restraint",
    subtitle: "What a decade of interface design at two of software's most-copied companies actually teaches.",
    excerpt: "What a decade of interface design at two of software's most-copied companies actually teaches.",
    category: "technology",
    tags: ["Design", "Product"],
    author: "mira-okafor",
    publishedAt: "2026-10-29",
    readingTime: 5,
    featuredImage: { src: img("design-restraint"), alt: "A minimalist desk setup with a single monitor" },
    content: [
      { type: "paragraph", text: "Restraint is the hardest design skill to teach, because it never shows up as a feature. It shows up as the absence of one." },
      { type: "paragraph", text: "Both companies share a pattern: every new surface is held to the visual language of the ones that shipped before it, even when a trend would argue otherwise." },
    ],
  },
  {
    slug: "notion-vs-obsidian-vs-craft-2026",
    title: "Notion vs. Obsidian vs. Craft: which one should you actually use in 2026",
    subtitle: "A hands-on comparison across note-taking, collaboration, and long-term data ownership.",
    excerpt: "A hands-on comparison across note-taking, collaboration, and long-term data ownership.",
    category: "comparisons",
    tags: ["Comparison", "Productivity"],
    author: "priya-nandakumar",
    publishedAt: "2026-10-22",
    readingTime: 8,
    featuredImage: { src: img("notion-obsidian-craft"), alt: "A laptop displaying a notes application" },
    content: [
      { type: "paragraph", text: "We spent three weeks moving the same workflow between Notion, Obsidian and Craft to see where each one actually breaks down in daily use." },
      { type: "table", headers: ["", "Notion", "Obsidian", "Craft"], rows: [["Collaboration", "Strong", "Limited", "Good"], ["Offline-first", "No", "Yes", "Partial"], ["Data portability", "Moderate", "Excellent", "Moderate"]] },
      { type: "paragraph", text: "None of the three wins outright — the right choice depends heavily on whether portability or collaboration matters more to your workflow." },
    ],
  },
  {
    slug: "fieldnotes-review-a-focused-writing-app",
    title: "Fieldnotes review: a genuinely focused writing app",
    subtitle: "No AI sidebar, no collaboration cursors — just a fast editor that gets out of the way.",
    excerpt: "No AI sidebar, no collaboration cursors — just a fast editor that gets out of the way.",
    category: "reviews",
    tags: ["Review", "Productivity"],
    author: "priya-nandakumar",
    publishedAt: "2026-10-14",
    readingTime: 4,
    featuredImage: { src: img("fieldnotes-review"), alt: "A distraction-free writing interface on a laptop screen" },
    content: [
      { type: "paragraph", text: "Fieldnotes is a demonstration review for this template — illustrative content, not a verified product assessment." },
      { type: "paragraph", text: "The pitch is almost defiantly plain: a single column, a monospaced font by default, and a word count that only appears when you ask for it." },
    ],
  },
  {
    slug: "what-a-50-person-team-learned-moving-off-kubernetes",
    title: "What a 50-person team learned moving off Kubernetes",
    subtitle: "Not every team needs an orchestrator. Here's how one decided it didn't, and what replaced it.",
    excerpt: "Not every team needs an orchestrator. Here's how one decided it didn't, and what replaced it.",
    category: "technology",
    tags: ["Infrastructure", "DevOps"],
    author: "mira-okafor",
    publishedAt: "2026-10-08",
    readingTime: 10,
    featuredImage: { src: img("kubernetes-offramp"), alt: "A engineer looking at a dashboard of deployment metrics" },
    content: [
      { type: "paragraph", text: "This account is illustrative, composited from common patterns teams report when re-evaluating infrastructure complexity relative to team size." },
      { type: "heading", level: 2, text: "The actual cost they were paying", id: "actual-cost" },
      { type: "paragraph", text: "Operational overhead rarely shows up as a single line item — it shows up as the senior engineer who quietly becomes the only person who can debug a failed deploy." },
    ],
  },
  {
    slug: "breaking-a-major-cloud-provider-outage-explained",
    title: "A major cloud provider outage, explained",
    subtitle: "What failed, what it affected, and what it means for multi-region architecture going forward.",
    excerpt: "What failed, what it affected, and what it means for multi-region architecture going forward.",
    category: "news",
    tags: ["News", "Infrastructure"],
    author: "mira-okafor",
    publishedAt: "2026-11-21",
    readingTime: 5,
    featuredImage: { src: img("cloud-outage"), alt: "A status dashboard showing degraded service indicators" },
    trendingRank: 3,
    content: [
      { type: "paragraph", text: "This is demonstration news content for the ByteScope template, illustrating the news article layout rather than reporting a real event." },
      { type: "paragraph", text: "A regional control-plane failure cascaded into dependent services faster than most customers' failover plans assumed it would." },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string) {
  return articles.filter((a) => a.category === category);
}

export function getLatestArticles(limit?: number) {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getTrendingArticles() {
  return [...articles]
    .filter((a) => typeof a.trendingRank === "number")
    .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0));
}

export function getFeaturedArticle() {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getRelatedArticles(article: Article, limit = 3) {
  return articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, limit);
}
