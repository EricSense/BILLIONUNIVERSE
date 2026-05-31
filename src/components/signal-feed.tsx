"use client";

import { CascadePanel } from "@/components/cascade-panel";
import { SystemGraph } from "@/components/system-graph";
import { SeverityBadge } from "@/components/ui/severity-badge";
import { SystemPill } from "@/components/ui/system-pill";
import { SYSTEMS } from "@/lib/data/systems";
import type { Signal, Severity, SystemId } from "@/lib/types";
import Link from "next/link";
import { useMemo, useState } from "react";

function formatTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function SignalFeed({ initialSignals }: { initialSignals: Signal[] }) {
  const [signals] = useState(initialSignals);
  const [selectedId, setSelectedId] = useState<string | null>(initialSignals[0]?.id ?? null);
  const [systemFilter, setSystemFilter] = useState<SystemId | "all">("all");
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");
  const [anomaliesOnly, setAnomaliesOnly] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return signals.filter((s) => {
      if (systemFilter !== "all" && !s.systems.includes(systemFilter)) return false;
      if (severityFilter !== "all" && s.severity !== severityFilter) return false;
      if (anomaliesOnly && !s.anomaly) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !s.title.toLowerCase().includes(q) &&
          !s.summary.toLowerCase().includes(q) &&
          !s.intersection.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [signals, systemFilter, severityFilter, anomaliesOnly, query]);

  const selected = filtered.find((s) => s.id === selectedId) ?? filtered[0];
  const highlightSystemIds = selected?.systems ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSystemFilter("all")}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              systemFilter === "all"
                ? "border-accent bg-accent/10 text-accent-bright"
                : "border-white/10 text-slate-400 hover:border-white/20"
            }`}
          >
            All Systems
          </button>
          {SYSTEMS.map((sys) => (
            <button
              key={sys.id}
              type="button"
              onClick={() => setSystemFilter(sys.id)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                systemFilter === sys.id
                  ? "border-accent bg-accent/10 text-accent-bright"
                  : "border-white/10 text-slate-400 hover:border-white/20"
              }`}
            >
              {sys.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search signals..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-[200px] rounded-lg border border-white/10 bg-surface-card px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
          />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as Severity | "all")}
            className="rounded-lg border border-white/10 bg-surface-card px-3 py-2 text-sm text-slate-300"
          >
            <option value="all">All severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={anomaliesOnly}
              onChange={(e) => setAnomaliesOnly(e.target.checked)}
              className="rounded border-white/20"
            />
            Anomalies only
          </label>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-card">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No signals match your filters.</p>
          ) : (
            <ul className="divide-y divide-white/10">
              {filtered.map((signal) => (
                <li key={signal.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(signal.id)}
                    className={`w-full px-4 py-4 text-left transition-colors hover:bg-surface-hover ${
                      selected?.id === signal.id ? "bg-surface-hover" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-medium leading-snug text-white">{signal.title}</h3>
                      <SeverityBadge severity={signal.severity} />
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-cyan-signal">{signal.intersection}</p>
                    <p className="mt-2 line-clamp-2 text-xs text-slate-400">{signal.summary}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {signal.systems.map((sid) => (
                        <SystemPill key={sid} systemId={sid} />
                      ))}
                      {signal.anomaly && (
                        <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent-bright">
                          ◈ Anomaly
                        </span>
                      )}
                      <span className="ml-auto font-mono text-[10px] text-slate-500">
                        {signal.confidence}% · {formatTime(signal.timestamp)}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
        {selected ? (
          <>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-card">
              <div className="border-b border-white/10 bg-surface-raised px-4 py-3">
                <h2 className="text-sm font-semibold">Cascade Analysis</h2>
              </div>
              <div className="p-4">
                <CascadePanel cascades={selected.cascades} />
                <Link
                  href={`/signals/${selected.id}`}
                  className="mt-4 inline-block text-xs text-accent-bright hover:underline"
                >
                  Open full signal →
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-card">
              <div className="border-b border-white/10 bg-surface-raised px-4 py-3">
                <h2 className="text-sm font-semibold">System Intersections</h2>
              </div>
              <SystemGraph highlightSystemIds={highlightSystemIds} width={328} height={280} />
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-500">Select a signal to view analysis.</p>
        )}
      </div>
    </div>
  );
}
