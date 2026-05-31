"use client";

import { getSystem } from "@/lib/data/systems";
import type { DataSource, SourceStatus } from "@/lib/types";
import { useEffect, useState } from "react";

const STATUS_STYLES: Record<SourceStatus, string> = {
  live: "bg-emerald-500/15 text-emerald-400",
  degraded: "bg-amber-500/15 text-amber-400",
  offline: "bg-red-500/15 text-red-400",
  pending: "bg-slate-500/15 text-slate-400",
};

function formatSync(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export function SourcesPanel() {
  const [sources, setSources] = useState<DataSource[]>([]);
  const [stats, setStats] = useState<{
    live: number;
    degraded: number;
    total: number;
    avgLatency: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/sources");
      const data = await res.json();
      setSources(data.sources);
      setStats(data.stats);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (loading && sources.length === 0) {
    return <p className="text-sm text-slate-500">Loading data sources…</p>;
  }

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-surface-card p-4">
            <div className="font-display text-2xl text-emerald-400">{stats.live}</div>
            <div className="text-xs text-slate-500">Live connectors</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface-card p-4">
            <div className="font-display text-2xl text-amber-400">{stats.degraded}</div>
            <div className="text-xs text-slate-500">Degraded</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface-card p-4">
            <div className="font-display text-2xl text-white">{stats.total}</div>
            <div className="text-xs text-slate-500">Total sources</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface-card p-4">
            <div className="font-display text-2xl text-cyan-signal">{stats.avgLatency}ms</div>
            <div className="text-xs text-slate-500">Avg. latency</div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-surface-raised text-left">
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Source
              </th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Systems
              </th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Last sync
              </th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Latency
              </th>
            </tr>
          </thead>
          <tbody>
            {sources.map((src) => (
              <tr key={src.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium text-white">{src.name}</div>
                  <div className="text-xs text-slate-500">{src.coverage}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {src.systemIds.map((id) => {
                      const sys = getSystem(id);
                      return (
                        <span
                          key={id}
                          className="rounded px-1.5 py-0.5 text-[10px]"
                          style={{
                            color: sys?.color,
                            backgroundColor: `${sys?.color}15`,
                          }}
                        >
                          {sys?.name.split(" ")[0]}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase ${STATUS_STYLES[src.status]}`}
                  >
                    {src.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">
                  {formatSync(src.lastSync)}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">
                  {src.latencyMs > 0 ? `${src.latencyMs}ms` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={load}
        className="text-sm text-accent-bright hover:underline"
      >
        Refresh connector status
      </button>
    </div>
  );
}
