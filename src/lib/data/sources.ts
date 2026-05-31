import type { DataSource } from "@/lib/types";

export const DATA_SOURCES: DataSource[] = [
  {
    id: "macro-fed",
    name: "Central Bank Tracker",
    systemIds: ["macro", "political"],
    status: "live",
    lastSync: new Date(Date.now() - 2 * 60_000).toISOString(),
    latencyMs: 120,
    coverage: "G10 + 24 EM economies",
  },
  {
    id: "supply-freight",
    name: "Global Freight Index",
    systemIds: ["supply"],
    status: "live",
    lastSync: new Date(Date.now() - 5 * 60_000).toISOString(),
    latencyMs: 340,
    coverage: "47 trade corridors",
  },
  {
    id: "energy-grid",
    name: "Grid Capacity API",
    systemIds: ["energy", "tech"],
    status: "degraded",
    lastSync: new Date(Date.now() - 18 * 60_000).toISOString(),
    latencyMs: 890,
    coverage: "US + EU regional grids",
  },
  {
    id: "political-sanctions",
    name: "Sanctions & Policy Monitor",
    systemIds: ["political", "macro"],
    status: "live",
    lastSync: new Date(Date.now() - 8 * 60_000).toISOString(),
    latencyMs: 210,
    coverage: "180 jurisdictions",
  },
  {
    id: "tech-semis",
    name: "Semiconductor Flow Index",
    systemIds: ["tech", "supply"],
    status: "live",
    lastSync: new Date(Date.now() - 3 * 60_000).toISOString(),
    latencyMs: 175,
    coverage: "Fab + packaging nodes",
  },
  {
    id: "compliance-payments",
    name: "Cross-Border Payments Flow",
    systemIds: ["macro", "political", "supply"],
    status: "pending",
    lastSync: new Date(Date.now() - 45 * 60_000).toISOString(),
    latencyMs: 0,
    coverage: "Onboarding — ETA 72h",
  },
];

export function getSourceStats() {
  const live = DATA_SOURCES.filter((s) => s.status === "live").length;
  const degraded = DATA_SOURCES.filter((s) => s.status === "degraded").length;
  const offline = DATA_SOURCES.filter((s) => s.status === "offline").length;
  const pending = DATA_SOURCES.filter((s) => s.status === "pending").length;
  const avgLatency = Math.round(
    DATA_SOURCES.filter((s) => s.latencyMs > 0).reduce((sum, s) => sum + s.latencyMs, 0) /
      DATA_SOURCES.filter((s) => s.latencyMs > 0).length
  );
  return { live, degraded, offline, pending, total: DATA_SOURCES.length, avgLatency };
}
