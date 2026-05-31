import { getLinkedSystems, getSystem, SYSTEM_LINKS } from "@/lib/data/systems";
import type {
  CascadeStep,
  ScenarioBranch,
  ScenarioInput,
  ScenarioResult,
  SystemId,
} from "@/lib/types";

const SCENARIO_TEMPLATES: Record<
  SystemId,
  { change: string; branches: Omit<ScenarioBranch, "id">[] }[]
> = {
  macro: [
    {
      change: "rates",
      branches: [
        {
          label: "Base case — gradual easing",
          probability: 0.45,
          cascades: [
            { order: "1st order", systemId: "macro", text: "Credit conditions loosen; yield curve steepens modestly" },
            { order: "2nd order", systemId: "supply", text: "Inventory rebuild accelerates as financing costs fall" },
            { order: "3rd order", systemId: "tech", text: "Growth equity multiples expand on lower discount rates" },
          ],
        },
        {
          label: "Upside — sticky inflation forces hold",
          probability: 0.35,
          cascades: [
            { order: "1st order", systemId: "macro", text: "Real rates stay elevated; dollar strengthens" },
            { order: "2nd order", systemId: "energy", text: "Demand destruction in energy-intensive manufacturing" },
            { order: "3rd order", systemId: "political", text: "Populist pressure on central bank independence rises" },
          ],
        },
        {
          label: "Tail — recession signal",
          probability: 0.2,
          cascades: [
            { order: "1st order", systemId: "macro", text: "Credit spreads widen sharply; unemployment inflects" },
            { order: "2nd order", systemId: "supply", text: "Destocking cycle deepens across retail and industrial" },
            { order: "3rd order", systemId: "political", text: "Fiscal stimulus debates accelerate in major economies" },
          ],
        },
      ],
    },
  ],
  supply: [
    {
      change: "disruption",
      branches: [
        {
          label: "Localized port closure",
          probability: 0.5,
          cascades: [
            { order: "1st order", systemId: "supply", text: "Lead times extend 2–4 weeks on affected lanes" },
            { order: "2nd order", systemId: "macro", text: "Input price pass-through to finished goods CPI" },
            { order: "3rd order", systemId: "energy", text: "Bunker fuel and freight rates spike regionally" },
          ],
        },
        {
          label: "Multi-node cascade",
          probability: 0.3,
          cascades: [
            { order: "1st order", systemId: "supply", text: "Just-in-time networks fail across tier-2 suppliers" },
            { order: "2nd order", systemId: "tech", text: "Hardware release schedules slip one quarter" },
            { order: "3rd order", systemId: "political", text: "Reshoring subsidies announced in US and EU" },
          ],
        },
        {
          label: "Rapid normalization",
          probability: 0.2,
          cascades: [
            { order: "1st order", systemId: "supply", text: "Alternate routing absorbs 80% of volume within 10 days" },
            { order: "2nd order", systemId: "macro", text: "Minimal GDP impact; transient inflation blip" },
          ],
        },
      ],
    },
  ],
  energy: [
    {
      change: "shock",
      branches: [
        {
          label: "Supply cut — OPEC+ discipline",
          probability: 0.4,
          cascades: [
            { order: "1st order", systemId: "energy", text: "Crude rallies 12–18%; refining margins compress" },
            { order: "2nd order", systemId: "macro", text: "Headline inflation expectations re-anchor upward" },
            { order: "3rd order", systemId: "political", text: "Strategic petroleum reserve release debates intensify" },
          ],
        },
        {
          label: "Demand shock — industrial slowdown",
          probability: 0.35,
          cascades: [
            { order: "1st order", systemId: "energy", text: "Power demand growth decelerates in manufacturing hubs" },
            { order: "2nd order", systemId: "supply", text: "Chemical and metals output cuts ripple upstream" },
          ],
        },
        {
          label: "Green transition acceleration",
          probability: 0.25,
          cascades: [
            { order: "1st order", systemId: "energy", text: "Renewable PPA signings outpace fossil additions" },
            { order: "2nd order", systemId: "tech", text: "Grid storage and transmission capex surge" },
            { order: "3rd order", systemId: "macro", text: "Stranded asset risk repriced in energy equities" },
          ],
        },
      ],
    },
  ],
  political: [
    {
      change: "policy",
      branches: [
        {
          label: "Escalation — new sanctions package",
          probability: 0.4,
          cascades: [
            { order: "1st order", systemId: "political", text: "Secondary sanctions expand to financial intermediaries" },
            { order: "2nd order", systemId: "macro", text: "Cross-border payment friction spikes; FX volatility rises" },
            { order: "3rd order", systemId: "supply", text: "Commodity rerouting increases freight and insurance costs" },
          ],
        },
        {
          label: "Détente — phased rollback",
          probability: 0.25,
          cascades: [
            { order: "1st order", systemId: "political", text: "Trade corridors reopen incrementally" },
            { order: "2nd order", systemId: "supply", text: "Backlog clearance reduces spot price pressure" },
          ],
        },
        {
          label: "Status quo — enforcement only",
          probability: 0.35,
          cascades: [
            { order: "1st order", systemId: "political", text: "Compliance costs remain elevated but stable" },
            { order: "2nd order", systemId: "macro", text: "Risk premium persists in affected asset classes" },
          ],
        },
      ],
    },
  ],
  tech: [
    {
      change: "breakthrough",
      branches: [
        {
          label: "AI capability leap — productivity surge",
          probability: 0.45,
          cascades: [
            { order: "1st order", systemId: "tech", text: "Enterprise AI adoption accelerates across knowledge work" },
            { order: "2nd order", systemId: "energy", text: "Datacenter power demand exceeds regional grid forecasts" },
            { order: "3rd order", systemId: "macro", text: "Labor productivity gains offset wage pressure in services" },
          ],
        },
        {
          label: "Export control tightening",
          probability: 0.35,
          cascades: [
            { order: "1st order", systemId: "tech", text: "Advanced chip access restricted on national security grounds" },
            { order: "2nd order", systemId: "supply", text: "Hardware lead times extend; capex plans revised down" },
            { order: "3rd order", systemId: "political", text: "Alliance-based technology blocs formalize" },
          ],
        },
        {
          label: "Regulatory friction — AI safety mandates",
          probability: 0.2,
          cascades: [
            { order: "1st order", systemId: "tech", text: "Model deployment timelines lengthen for high-risk use cases" },
            { order: "2nd order", systemId: "political", text: "Compliance frameworks diverge US vs EU" },
          ],
        },
      ],
    },
  ],
};

function buildGenericBranches(
  triggerSystemId: SystemId,
  change: string
): ScenarioBranch[] {
  const linked = getLinkedSystems(triggerSystemId);
  const trigger = getSystem(triggerSystemId);

  return [
    {
      id: "branch-a",
      label: "Primary propagation path",
      probability: 0.55,
      cascades: [
        {
          order: "1st order",
          systemId: triggerSystemId,
          text: `${change} in ${trigger?.name ?? triggerSystemId} — direct system impact`,
          probability: 0.9,
        },
        ...(linked[0]
          ? [
              {
                order: "2nd order" as const,
                systemId: linked[0],
                text: `Cross-system transmission via ${SYSTEM_LINKS.find((l) => l.from === triggerSystemId && l.to === linked[0])?.label ?? "coupling"}`,
                probability: 0.7,
              },
            ]
          : []),
        ...(linked[1]
          ? [
              {
                order: "3rd order" as const,
                systemId: linked[1],
                text: `Downstream effects materialize in ${getSystem(linked[1])?.name ?? linked[1]}`,
                probability: 0.5,
              },
            ]
          : []),
      ],
    },
    {
      id: "branch-b",
      label: "Contained / muted cascade",
      probability: 0.3,
      cascades: [
        {
          order: "1st order",
          systemId: triggerSystemId,
          text: `Localized impact of ${change}; buffers absorb shock`,
          probability: 0.75,
        },
        ...(linked[0]
          ? [
              {
                order: "2nd order" as const,
                systemId: linked[0],
                text: "Secondary effects remain below historical volatility bands",
                probability: 0.4,
              },
            ]
          : []),
      ],
    },
    {
      id: "branch-c",
      label: "Amplified tail scenario",
      probability: 0.15,
      cascades: [
        {
          order: "1st order",
          systemId: triggerSystemId,
          text: `Non-linear response to ${change} exceeds model confidence intervals`,
          probability: 0.35,
        },
        ...linked.slice(0, 3).map((sid, i) => ({
          order: (i === 0 ? "2nd order" : "3rd order") as CascadeStep["order"],
          systemId: sid,
          text: `Feedback loop intensifies in ${getSystem(sid)?.name ?? sid}`,
          probability: 0.25 - i * 0.05,
        })),
      ],
    },
  ];
}

export function runScenario(input: ScenarioInput): ScenarioResult {
  const templates = SCENARIO_TEMPLATES[input.triggerSystemId];
  const changeKey = input.change.toLowerCase().split(" ")[0] ?? "default";

  let branches: ScenarioBranch[] = [];

  if (templates) {
    const match =
      templates.find((t) => changeKey.includes(t.change) || t.change.includes(changeKey)) ??
      templates[0];
    branches = match.branches.map((b, i) => ({
      ...b,
      id: `branch-${i}`,
      cascades: b.cascades.map((c) => ({
        ...c,
        text: input.change ? `${c.text} (trigger: ${input.change})` : c.text,
      })),
    }));
  } else {
    branches = buildGenericBranches(input.triggerSystemId, input.change);
  }

  if (input.magnitude === "high") {
    branches = branches.map((b) => ({
      ...b,
      probability: b.label.includes("Amplified") ? Math.min(b.probability * 1.4, 0.35) : b.probability * 0.85,
    }));
  }

  const total = branches.reduce((s, b) => s + b.probability, 0);
  branches = branches.map((b) => ({ ...b, probability: Math.round((b.probability / total) * 100) / 100 }));

  return {
    id: `scenario-${Date.now()}`,
    input,
    branches,
    generatedAt: new Date().toISOString(),
  };
}
