import type { Signal, SystemId } from "@/lib/types";
import { SIGNALS } from "./signals";

const LIVE_TEMPLATES: Omit<Signal, "id" | "timestamp">[] = [
  {
    severity: "high",
    title: "Shipping lane congestion index spikes in Red Sea corridor",
    systems: ["supply", "energy", "political"],
    intersection: "Supply Chain × Energy × Political",
    summary:
      "Vessel rerouting increases transit times 11 days avg — insurance premiums rising on affected lanes.",
    confidence: 76,
    anomaly: true,
    sources: ["Global Freight Index"],
    cascades: [
      { order: "1st order", systemId: "supply", text: "Container availability tightens on Asia-Europe routes" },
      { order: "2nd order", systemId: "energy", text: "Bunker fuel consumption rises from extended voyages" },
      { order: "3rd order", systemId: "macro", text: "Import price pressure on manufactured goods" },
    ],
  },
  {
    severity: "medium",
    title: "USD liquidity stress in emerging market FX forwards",
    systems: ["macro", "political"],
    intersection: "Macro Economy × Political Systems",
    summary:
      "Offshore dollar funding costs widen for 8 EM currencies — correlation with policy uncertainty index at 18-month high.",
    confidence: 71,
    anomaly: false,
    sources: ["Central Bank Tracker"],
    cascades: [
      { order: "1st order", systemId: "macro", text: "EM FX forward points deteriorate across high-beta currencies" },
      { order: "2nd order", systemId: "political", text: "Capital controls risk repriced in 3 frontier markets" },
    ],
  },
  {
    severity: "critical",
    title: "Hyperscaler chip allocation shift detected in supply contracts",
    systems: ["tech", "supply", "macro"],
    intersection: "Technology × Supply Chain × Macro",
    summary:
      "Contract amendments show 22% reallocation from consumer to datacenter SKUs — downstream OEM lead times extending.",
    confidence: 83,
    anomaly: true,
    sources: ["Semiconductor Flow Index"],
    cascades: [
      { order: "1st order", systemId: "tech", text: "GPU and accelerator allocation prioritized over consumer silicon" },
      { order: "2nd order", systemId: "supply", text: "Tier-2 automotive suppliers face allocation cuts" },
      { order: "3rd order", systemId: "macro", text: "CapEx guidance revisions expected in Q3 earnings cycle" },
    ],
  },
];

function bucketIndex(): number {
  const minutes = Math.floor(Date.now() / (5 * 60_000));
  return minutes % LIVE_TEMPLATES.length;
}

export function getLiveOverlaySignals(): Signal[] {
  const idx = bucketIndex();
  const template = LIVE_TEMPLATES[idx];
  const prev = LIVE_TEMPLATES[(idx + LIVE_TEMPLATES.length - 1) % LIVE_TEMPLATES.length];

  return [
    {
      ...template,
      id: `live-${idx}-${Math.floor(Date.now() / (5 * 60_000))}`,
      timestamp: new Date().toISOString(),
    },
    {
      ...prev,
      id: `live-prev-${Math.floor(Date.now() / (5 * 60_000)) - 1}`,
      timestamp: new Date(Date.now() - 12 * 60_000).toISOString(),
    },
  ];
}

export function getAllSignals(includeLive = true): Signal[] {
  const base = [...SIGNALS];
  if (!includeLive) return base.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const live = getLiveOverlaySignals();
  const merged = [...live, ...base];
  const seen = new Set<string>();
  return merged
    .filter((s) => {
      if (seen.has(s.title)) return false;
      seen.add(s.title);
      return true;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function filterSignalsFromList(
  signals: Signal[],
  filters: {
    systemId?: SystemId | "all";
    severity?: string;
    anomaliesOnly?: boolean;
    query?: string;
  }
): Signal[] {
  let results = [...signals];

  if (filters.systemId && filters.systemId !== "all") {
    const systemId = filters.systemId;
    results = results.filter((s) => s.systems.includes(systemId));
  }
  if (filters.severity && filters.severity !== "all") {
    results = results.filter((s) => s.severity === filters.severity);
  }
  if (filters.anomaliesOnly) {
    results = results.filter((s) => s.anomaly);
  }
  if (filters.query?.trim()) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.intersection.toLowerCase().includes(q)
    );
  }

  return results;
}
