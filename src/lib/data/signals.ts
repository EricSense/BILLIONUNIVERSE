import type { Signal, SignalFilters } from "@/lib/types";
import { filterSignalsFromList, getAllSignals } from "@/lib/data/live-signals";

export const SIGNALS: Signal[] = [
  {
    id: "sig-001",
    severity: "critical",
    title: "Taiwan semiconductor export restrictions cascade",
    systems: ["macro", "supply", "political", "tech"],
    intersection: "Supply Chain × Political Systems × Technology",
    summary:
      "New export controls on advanced chip packaging create second-order effects across automotive supply chains and AI infrastructure buildout timelines.",
    confidence: 87,
    timestamp: "2026-05-31T09:12:00Z",
    anomaly: true,
    sources: ["Trade Policy Monitor", "Semiconductor Flow Index"],
    cascades: [
      {
        order: "1st order",
        systemId: "political",
        text: "Advanced packaging export restrictions tighten supply of AI accelerators",
        probability: 0.91,
      },
      {
        order: "2nd order",
        systemId: "supply",
        text: "Automotive OEMs delay EV platform launches due to chip allocation shifts",
        probability: 0.74,
      },
      {
        order: "3rd order",
        systemId: "macro",
        text: "Regional manufacturing incentives accelerate as governments race to onshore capacity",
        probability: 0.58,
      },
    ],
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
    timestamp: "2026-05-31T08:50:00Z",
    anomaly: true,
    sources: ["LNG Spot Index", "EU Industrial PMI"],
    cascades: [
      {
        order: "1st order",
        systemId: "energy",
        text: "European industrial energy costs diverge from Asian benchmarks",
        probability: 0.85,
      },
      {
        order: "2nd order",
        systemId: "supply",
        text: "Chemical and steel producers evaluate capacity relocation to lower-cost regions",
        probability: 0.71,
      },
      {
        order: "3rd order",
        systemId: "political",
        text: "EU considers carbon border adjustments in response to competitive pressure",
        probability: 0.52,
      },
    ],
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
    timestamp: "2026-05-31T07:30:00Z",
    anomaly: false,
    sources: ["Central Bank Tracker"],
    cascades: [
      {
        order: "1st order",
        systemId: "macro",
        text: "Currency volatility increases across G10 and emerging market pairs",
        probability: 0.82,
      },
      {
        order: "2nd order",
        systemId: "macro",
        text: "EM sovereign debt servicing costs rise in dollar-denominated obligations",
        probability: 0.68,
      },
      {
        order: "3rd order",
        systemId: "political",
        text: "Political pressure mounts on central banks as inflation-growth tradeoffs diverge",
        probability: 0.45,
      },
    ],
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
    timestamp: "2026-05-31T06:15:00Z",
    anomaly: true,
    sources: ["Critical Minerals Watch"],
    cascades: [
      {
        order: "1st order",
        systemId: "supply",
        text: "Rare earth processing bottlenecks constrain magnet supply for EV motors",
        probability: 0.88,
      },
      {
        order: "2nd order",
        systemId: "tech",
        text: "Battery manufacturers seek alternative chemistries to reduce rare earth dependency",
        probability: 0.65,
      },
      {
        order: "3rd order",
        systemId: "political",
        text: "Geopolitical alliances form around mineral processing capacity investments",
        probability: 0.55,
      },
    ],
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
    timestamp: "2026-05-31T05:00:00Z",
    anomaly: false,
    sources: ["Grid Capacity API", "Hyperscaler Capex Feed"],
    cascades: [
      {
        order: "1st order",
        systemId: "tech",
        text: "Regional grid operators revise capacity forecasts upward for datacenter corridors",
        probability: 0.79,
      },
      {
        order: "2nd order",
        systemId: "energy",
        text: "Utility rate structures shift toward demand-based pricing for high-load customers",
        probability: 0.62,
      },
      {
        order: "3rd order",
        systemId: "political",
        text: "Regulatory frameworks emerge for AI infrastructure energy accountability",
        probability: 0.48,
      },
    ],
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
    timestamp: "2026-05-31T04:22:00Z",
    anomaly: true,
    sources: ["Payments Flow Monitor", "Compliance Index"],
    cascades: [
      {
        order: "1st order",
        systemId: "political",
        text: "Cross-border payment settlement times increase for commodity traders",
        probability: 0.86,
      },
      {
        order: "2nd order",
        systemId: "supply",
        text: "Logistics financing costs rise as letters of credit face extended processing",
        probability: 0.72,
      },
      {
        order: "3rd order",
        systemId: "macro",
        text: "Alternative payment rails gain adoption in trade corridors affected by compliance friction",
        probability: 0.51,
      },
    ],
  },
];

export function getSignal(id: string): Signal | undefined {
  return getAllSignals().find((s) => s.id === id);
}

export function filterSignals(filters: SignalFilters): Signal[] {
  return filterSignalsFromList(getAllSignals(), {
    systemId: filters.systemId,
    severity: filters.severity,
    anomaliesOnly: filters.anomaliesOnly,
    query: filters.query,
  });
}

export function getSignalStats() {
  const all = getAllSignals();
  const anomalies = all.filter((s) => s.anomaly).length;
  const critical = all.filter((s) => s.severity === "critical").length;
  const avgConfidence = Math.round(
    all.reduce((sum, s) => sum + s.confidence, 0) / all.length
  );
  const liveCount = all.filter((s) => s.id.startsWith("live-")).length;
  return {
    total: all.length,
    anomalies,
    critical,
    avgConfidence,
    systemsMonitored: 5,
    liveCount,
    lastRefresh: new Date().toISOString(),
  };
}
