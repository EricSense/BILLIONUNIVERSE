export type SystemId = "macro" | "supply" | "energy" | "political" | "tech";

export type Severity = "critical" | "high" | "medium" | "low";

export interface System {
  id: SystemId;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface SystemLink {
  from: SystemId;
  to: SystemId;
  strength: number;
  label: string;
}

export interface CascadeStep {
  order: "1st order" | "2nd order" | "3rd order";
  systemId: SystemId;
  text: string;
  probability?: number;
}

export interface Signal {
  id: string;
  severity: Severity;
  title: string;
  systems: SystemId[];
  intersection: string;
  summary: string;
  confidence: number;
  timestamp: string;
  anomaly: boolean;
  cascades: CascadeStep[];
  sources?: string[];
}

export interface ScenarioInput {
  triggerSystemId: SystemId;
  change: string;
  magnitude?: "low" | "medium" | "high";
}

export interface ScenarioBranch {
  id: string;
  label: string;
  probability: number;
  cascades: CascadeStep[];
}

export interface ScenarioResult {
  id: string;
  input: ScenarioInput;
  branches: ScenarioBranch[];
  generatedAt: string;
}

export interface SignalFilters {
  systemId?: SystemId | "all";
  severity?: Severity | "all";
  anomaliesOnly?: boolean;
  query?: string;
}

export interface Watchlist {
  id: string;
  name: string;
  systemIds: SystemId[];
  minSeverity: Severity;
  anomaliesOnly: boolean;
  keywords: string[];
  createdAt: string;
}

export interface Alert {
  id: string;
  watchlistId: string;
  watchlistName: string;
  signalId: string;
  signalTitle: string;
  severity: Severity;
  createdAt: string;
  read: boolean;
}

export interface SavedScenario {
  id: string;
  name: string;
  result: ScenarioResult;
  savedAt: string;
}

export type SourceStatus = "live" | "degraded" | "offline" | "pending";

export interface DataSource {
  id: string;
  name: string;
  systemIds: SystemId[];
  status: SourceStatus;
  lastSync: string;
  latencyMs: number;
  coverage: string;
}
