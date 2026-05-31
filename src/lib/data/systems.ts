import type { System, SystemId, SystemLink } from "@/lib/types";

export const SYSTEMS: System[] = [
  {
    id: "macro",
    name: "Macro Economy",
    color: "#3b82f6",
    icon: "◈",
    description: "Rates, inflation, FX, GDP, labor markets",
  },
  {
    id: "supply",
    name: "Supply Chain",
    color: "#8b5cf6",
    icon: "⬡",
    description: "Logistics, manufacturing, trade flows, inventory",
  },
  {
    id: "energy",
    name: "Energy Markets",
    color: "#f59e0b",
    icon: "◉",
    description: "Oil, gas, power grids, renewables, commodities",
  },
  {
    id: "political",
    name: "Political Systems",
    color: "#ef4444",
    icon: "◆",
    description: "Policy, regulation, sanctions, elections",
  },
  {
    id: "tech",
    name: "Technology Shifts",
    color: "#10b981",
    icon: "◇",
    description: "AI, semiconductors, cloud, automation",
  },
];

export const SYSTEM_LINKS: SystemLink[] = [
  { from: "macro", to: "supply", strength: 0.92, label: "Trade flows" },
  { from: "supply", to: "energy", strength: 0.78, label: "Input costs" },
  { from: "energy", to: "macro", strength: 0.85, label: "Inflation" },
  { from: "political", to: "supply", strength: 0.88, label: "Regulation" },
  { from: "political", to: "macro", strength: 0.71, label: "Policy" },
  { from: "tech", to: "supply", strength: 0.76, label: "Demand shift" },
  { from: "tech", to: "energy", strength: 0.69, label: "Power draw" },
  { from: "macro", to: "political", strength: 0.64, label: "Election cycles" },
  { from: "political", to: "energy", strength: 0.73, label: "Energy policy" },
  { from: "macro", to: "tech", strength: 0.67, label: "Capital allocation" },
];

export function getSystem(id: string): System | undefined {
  return SYSTEMS.find((s) => s.id === id);
}

export function getLinkedSystems(systemId: string): SystemId[] {
  const linked = new Set<SystemId>();
  for (const link of SYSTEM_LINKS) {
    if (link.from === systemId) linked.add(link.to as SystemId);
    if (link.to === systemId) linked.add(link.from as SystemId);
  }
  return [...linked];
}
