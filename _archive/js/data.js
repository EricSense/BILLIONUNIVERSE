export const META = {
  name: "Billion Universe",
  tagline: "Multi-system intelligence platform",
  thesis:
    "A world defined by intersecting forces — mapping how complex systems interact.",
  stage: "Pre-seed",
  frameworks: 10,
  domain: "AI × Systems Theory",
  foundingQuote:
    "The moment AI became capable of reasoning across systems — not just within them — the opportunity arrived.",
};

export const SECTIONS = [
  { id: "why-now", num: "01", title: "Why Now" },
  { id: "pain-points", num: "02", title: "Needs / Pain Points" },
  { id: "customers", num: "03", title: "Target Customers" },
  { id: "north-star", num: "04", title: "North Star" },
  { id: "competitive", num: "05", title: "Competitive Landscape" },
  { id: "value-prop", num: "06", title: "Gap / Value Proposition" },
  { id: "market-size", num: "07", title: "Market Size" },
  { id: "mvps", num: "08", title: "MVPs" },
  { id: "business-models", num: "09", title: "Business Models" },
  { id: "risks", num: "10", title: "Key Risks / Open Qs" },
];

export const WHY_NOW = [
  {
    label: "Technology Shift",
    title: "LLMs crossed the multi-domain threshold",
    body: "Models trained on billions of cross-domain documents now exhibit genuine multi-system pattern recognition. APIs, cheap compute, and fine-tuning tools have made building on top of this accessible to startups for the first time.",
    signal: "2024–2026",
  },
  {
    label: "Market Timing",
    title: "Complexity is overwhelming organizations",
    body: "Enterprises are drowning in siloed data, fragmented tools, and decisions that span multiple systems. No single analytics tool connects macro trends, internal data, competitor signals, and regulatory shifts into a unified view.",
    signal: "$420B AI market by 2030",
  },
  {
    label: "Macro Conditions",
    title: "Geopolitical & economic entanglement",
    body: "Supply chains, financial markets, energy grids, and political systems are more deeply intertwined than ever. Actors who model cross-system cascades will hold decisive advantages over those who cannot.",
    signal: "Urgency signal",
  },
  {
    label: "Cultural Moment",
    title: "McCarthy's 1956 bet is finally paying off",
    body: "70 years after the Dartmouth workshop proposed that every feature of intelligence could be simulated, the world is ready to ask: what happens when you apply that to billions of interacting systems — not just one?",
    signal: "Founding thesis",
  },
];

export const PAIN_POINTS = {
  quote:
    "Decision-makers operate on single-system models in a multi-system world.",
  context:
    "A financial analyst models one market. A logistics team optimizes one supply chain. A policy advisor studies one regulatory environment. But the outcomes they're responsible for are determined by the interaction of all these systems at once.",
  items: [
    {
      id: "PAIN 01",
      title: "Blind spots at intersections",
      body: "The most consequential events — crises, breakthroughs, disruptions — happen where systems collide, not inside any single one. Nobody is watching the seams.",
    },
    {
      id: "PAIN 02",
      title: "No parallel scenario modeling",
      body: 'Existing tools answer "what happened" or "what will likely happen." Nobody is systematically exploring the full space of what could happen across system interactions.',
    },
    {
      id: "PAIN 03",
      title: "Intelligence is siloed",
      body: "Teams, tools, and data live in separate universes. Synthesizing cross-system intelligence requires armies of analysts — and still produces partial pictures.",
    },
  ],
};

export const CUSTOMERS = [
  {
    tier: "Primary · High Priority",
    title: "Strategic Intelligence Teams",
    body: "Chief Strategy Officers, corporate intelligence units at Fortune 500s, and management consultancies paid to see what others miss. High willingness to pay; already spending on fragmented tools.",
    acv: "$30K–$500K ACV",
    tags: ["Enterprise", "Finance"],
    priority: "high",
  },
  {
    tier: "Secondary",
    title: "Institutional Investors",
    body: "Hedge funds, sovereign wealth funds, and macro traders making multi-billion-dollar bets on how global systems interact. Information edge is worth enormous premiums.",
    acv: "Data-driven",
    tags: ["Finance"],
    priority: "medium",
  },
  {
    tier: "Tertiary",
    title: "Policy & Defense Analysts",
    body: "Government agencies, think tanks, and defense contractors modeling geopolitical and economic system interactions. Long sales cycles but massive contracts.",
    acv: "High stakes",
    tags: ["Government"],
    priority: "low",
  },
];

export const NORTH_STAR = {
  vision:
    "An intelligence layer that maps every consequential system on Earth — and their interactions — in real time.",
  promise:
    'The end state is a platform where any decision-maker can ask: "If X changes in system A, what are the second and third-order effects across systems B, C, and D?" — and receive a rigorous, AI-generated multi-system answer in seconds.',
  belief:
    "Just as McCarthy believed intelligence could be precisely described and simulated, Billion Universe operates from the belief that every system can be modeled precisely enough to predict their intersections.",
  systems: [
    "Economic Systems",
    "Political Systems",
    "Supply Chains",
    "Technology Shifts",
  ],
  userPromise:
    "From hours of analyst work across fragmented tools, to a single query that surfaces cross-system insight in real time.",
};

export const COMPETITORS = {
  headers: [
    "Player",
    "Category",
    "Multi-System",
    "AI-Native",
    "Scenario Modeling",
    "Accessible Pricing",
  ],
  rows: [
    {
      player: "Palantir / Primer",
      category: "Strategic Intel",
      multi: "partial",
      ai: "partial",
      scenario: "limited",
      pricing: false,
      pricingNote: "$M+",
    },
    {
      player: "Tableau / Power BI",
      category: "Business Intelligence",
      multi: false,
      ai: false,
      scenario: false,
      pricing: true,
      pricingNote: "$30–200/mo",
    },
    {
      player: "ChatGPT / Perplexity",
      category: "AI Research Agents",
      multi: "partial",
      ai: true,
      scenario: false,
      pricing: true,
      pricingNote: "$20–200/mo",
    },
    {
      player: "Prewave / Crayon",
      category: "Niche Intel Tools",
      multi: false,
      ai: "partial",
      scenario: "basic",
      pricing: "partial",
      pricingNote: "$15–50K/yr",
    },
    {
      player: "Billion Universe",
      category: "Multi-system Intel",
      multi: true,
      ai: true,
      scenario: true,
      pricing: true,
      pricingNote: "$10K–$500K",
      highlight: true,
    },
  ],
};

export const DIFFERENTIATORS = {
  quote:
    "No one owns the intersection layer. Every competitor is optimized for depth within one system.",
  context:
    "Billion Universe's unique position is the cross-system intelligence layer — the connective tissue that maps how systems influence each other, enabling causal, not just correlational, multi-system reasoning.",
  items: [
    {
      id: "01",
      title: "Multi-system by design",
      body: "Not bolted on. The entire architecture is built around modeling relationships between systems — not within them. This is a structural advantage competitors cannot easily replicate.",
    },
    {
      id: "02",
      title: "Parallel possibility engine",
      body: "Generate and rank billions of scenario branches simultaneously — not just the single most-likely path. Decision-makers see the full space of outcomes, not a single prediction.",
    },
    {
      id: "03",
      title: "Accessible intelligence",
      body: "Democratize what Palantir does for governments — making it available to any strategic team at a fraction of the cost, with an intuitive, AI-native interface.",
    },
  ],
};

export const MARKET_SIZE = {
  tam: { label: "TAM — AI & Analytics (2030 proj.)", value: "$420B" },
  sam: { label: "SAM — Strategic & BI Intelligence", value: "$85B" },
  som: { label: "SOM — Beachhead Target (Year 5)", value: "$4.2B" },
  context:
    "The addressable opportunity sits at the intersection of the $28B BI market, the $12B strategic intelligence market, and the rapidly growing AI decision-support category. With enterprises increasing AI spend at 38% CAGR and explicit demand for cross-domain synthesis tools, the timing for a multi-system intelligence platform is optimal.",
};

export const MVPS = [
  {
    id: "mvp-1",
    title: "Multi-System Signal Dashboard",
    timeline: "Month 0–4",
    body: "A curated intelligence feed that pulls signals from 3–5 interconnected systems (e.g., macro economy + supply chain + energy markets) and uses AI to surface cross-system anomalies and intersections.",
    goal: "Validates core value prop with early adopters. Freemium entry point.",
    status: "active",
  },
  {
    id: "mvp-2",
    title: "Scenario Simulation Engine (Beta)",
    timeline: "Month 4–9",
    body: "Users define a change in one system and receive AI-modeled second and third-order effects across connected systems. First paid product tier.",
    goal: "Target: 10 design partners, $10K–50K pilots.",
    status: "planned",
  },
  {
    id: "mvp-3",
    title: "Billion Universe Graph Platform",
    timeline: "Month 9–18",
    body: "Full knowledge graph of interconnected systems with real-time data ingestion, causal inference layer, and team collaboration. Enterprise SaaS product.",
    goal: "Target: $500K ARR, 3–5 enterprise contracts.",
    status: "planned",
  },
];

export const BUSINESS_MODELS = [
  {
    label: "Primary Model",
    title: "Enterprise SaaS Subscription",
    body: "Annual contracts for team access to the Billion Universe platform. Tiered by seat count and system coverage.",
    comparable: "Palantir AIP ($250K–$5M+/yr), Crayon ($30K–$150K/yr).",
    pricing: "$30K–$500K ACV",
    note: "Annual contract",
    tier: "high",
  },
  {
    label: "Secondary Model",
    title: "Intelligence Reports",
    body: "High-value, on-demand multi-system scenario reports sold to specific industries. Transaction-based.",
    comparable: "Validates demand, feeds product roadmap, and generates revenue pre-platform.",
    pricing: "$5K–$50K per report",
    tier: "medium",
  },
  {
    label: "Growth Model",
    title: "API Access (Developer Tier)",
    body: "Expose the multi-system intelligence graph via API for other SaaS products, consultancies, and builders to integrate. Usage-based pricing.",
    comparable: "Builds ecosystem and defensibility.",
    pricing: "Usage-based",
    tier: "medium",
  },
  {
    label: "Long-term Model",
    title: "Data & Intelligence Marketplace",
    body: "As the graph grows, position as a two-sided marketplace where organizations contribute proprietary system data in exchange for cross-system intelligence.",
    comparable: "Network effects accelerate moat.",
    pricing: "Platform play",
    tier: "long",
  },
];

export const RISKS = [
  {
    level: "HIGH",
    title: "Technical feasibility of real-time multi-system modeling",
    body: 'Causal inference across live, high-dimensional systems is an unsolved research problem. Must define what "good enough" looks like for V1 and avoid over-promising to early customers.',
  },
  {
    level: "HIGH",
    title: "Enterprise sales cycle length vs. runway",
    body: "Strategic intelligence is a considered purchase — 9 to 18 month cycles could threaten runway. Mitigate with freemium entry, design partner programs, and an SMB-first go-to-market.",
  },
  {
    level: "MED",
    title: "Well-funded incumbents entering the space",
    body: "Palantir, Salesforce, or a well-funded AI startup could pivot toward multi-system modeling. Speed of adoption and data network effects are the primary defensive moats.",
  },
  {
    level: "MED",
    title: "Defining the right beachhead market",
    body: "Multi-system thinking applies to dozens of verticals. Without sharp focus, go-to-market will be too diffuse. Open question: which vertical has the highest pain, willingness to pay, and shortest sales cycle?",
  },
  {
    level: "LOW",
    title: "Data access and licensing costs",
    body: "Modeling economic, political, and supply chain systems requires licensed data feeds. Costs could constrain margins. Mitigate via partnerships and user-contributed data.",
  },
];

export const SYSTEMS = [
  { id: "macro", name: "Macro Economy", color: "#3b82f6", icon: "◈" },
  { id: "supply", name: "Supply Chain", color: "#8b5cf6", icon: "⬡" },
  { id: "energy", name: "Energy Markets", color: "#f59e0b", icon: "◉" },
  { id: "political", name: "Political Systems", color: "#ef4444", icon: "◆" },
  { id: "tech", name: "Technology Shifts", color: "#10b981", icon: "◇" },
];

export const SIGNALS = [
  {
    id: "sig-001",
    severity: "critical",
    title: "Taiwan semiconductor export restrictions cascade",
    systems: ["macro", "supply", "political", "tech"],
    intersection: "Supply Chain × Political Systems × Technology",
    summary:
      "New export controls on advanced chip packaging create second-order effects across automotive supply chains and AI infrastructure buildout timelines.",
    confidence: 87,
    timestamp: "12m ago",
    anomaly: true,
  },
  {
    id: "sig-002",
    severity: "high",
    title: "European energy price divergence from Asian LNG",
    systems: ["energy", "macro", "supply"],
    intersection: "Energy Markets × Macro Economy",
    summary:
      "15% price spread widening beyond historical norms — signals potential manufacturing relocation pressure in chemical and steel sectors.",
    confidence: 79,
    timestamp: "34m ago",
    anomaly: true,
  },
  {
    id: "sig-003",
    severity: "medium",
    title: "Central bank policy divergence accelerating",
    systems: ["macro", "political"],
    intersection: "Macro Economy × Political Systems",
    summary:
      "Fed hold vs ECB cut trajectory creates currency volatility that propagates into emerging market debt servicing costs.",
    confidence: 72,
    timestamp: "1h ago",
    anomaly: false,
  },
  {
    id: "sig-004",
    severity: "high",
    title: "Rare earth processing bottleneck emerging",
    systems: ["supply", "energy", "political"],
    intersection: "Supply Chain × Energy Markets × Political",
    summary:
      "Processing capacity constraints in Southeast Asia intersect with EV battery demand forecasts — 6-month lag before price transmission.",
    confidence: 81,
    timestamp: "2h ago",
    anomaly: true,
  },
  {
    id: "sig-005",
    severity: "medium",
    title: "AI datacenter power demand exceeding grid forecasts",
    systems: ["tech", "energy", "macro"],
    intersection: "Technology × Energy × Macro Economy",
    summary:
      "Hyperscaler capex plans imply 40% higher regional power draw than utility projections — regulatory and pricing responses likely within 18 months.",
    confidence: 68,
    timestamp: "3h ago",
    anomaly: false,
  },
  {
    id: "sig-006",
    severity: "critical",
    title: "Cross-border payment friction spike",
    systems: ["macro", "political", "supply"],
    intersection: "Macro × Political × Supply Chain",
    summary:
      "Sanctions-adjacent compliance tightening creates settlement delays propagating through commodity trading desks and logistics financing.",
    confidence: 84,
    timestamp: "4h ago",
    anomaly: true,
  },
];

export const INTERSECTIONS = [
  { from: "macro", to: "supply", strength: 0.92, label: "Trade flows" },
  { from: "supply", to: "energy", strength: 0.78, label: "Input costs" },
  { from: "energy", to: "macro", strength: 0.85, label: "Inflation" },
  { from: "political", to: "supply", strength: 0.88, label: "Regulation" },
  { from: "political", to: "macro", strength: 0.71, label: "Policy" },
  { from: "tech", to: "supply", strength: 0.76, label: "Demand shift" },
  { from: "tech", to: "energy", strength: 0.69, label: "Power draw" },
  { from: "macro", to: "political", strength: 0.64, label: "Election cycles" },
];
