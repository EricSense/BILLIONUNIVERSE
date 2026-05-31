"use client";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { SystemPill } from "@/components/ui/system-pill";
import { SYSTEMS } from "@/lib/data/systems";
import {
  createId,
  deleteWatchlist,
  getWatchlists,
  saveWatchlist,
} from "@/lib/storage/client-store";
import type { Severity, SystemId, Watchlist } from "@/lib/types";
import { useEffect, useState } from "react";

const SEVERITIES: Severity[] = ["critical", "high", "medium", "low"];

export function WatchlistManager() {
  const { refreshWatchlists } = useWorkspace();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [name, setName] = useState("");
  const [selectedSystems, setSelectedSystems] = useState<SystemId[]>(["macro", "supply"]);
  const [minSeverity, setMinSeverity] = useState<Severity>("high");
  const [anomaliesOnly, setAnomaliesOnly] = useState(false);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    setWatchlists(getWatchlists());
  }, []);

  function toggleSystem(id: SystemId) {
    setSelectedSystems((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || selectedSystems.length === 0) return;

    const watchlist: Watchlist = {
      id: createId("wl"),
      name: name.trim(),
      systemIds: selectedSystems,
      minSeverity,
      anomaliesOnly,
      keywords: keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    saveWatchlist(watchlist);
    setWatchlists(getWatchlists());
    setName("");
    setKeywords("");
    refreshWatchlists();
  }

  function handleDelete(id: string) {
    deleteWatchlist(id);
    setWatchlists(getWatchlists());
    refreshWatchlists();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
      <form
        onSubmit={handleCreate}
        className="space-y-4 rounded-xl border border-white/10 bg-surface-card p-5 h-fit"
      >
        <h2 className="text-sm font-semibold">New watchlist</h2>

        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Supply × Political critical"
            className="w-full rounded-lg border border-white/10 bg-surface-raised px-3 py-2 text-sm text-white"
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Systems (all must match)
          </label>
          <div className="flex flex-wrap gap-2">
            {SYSTEMS.map((sys) => (
              <button
                key={sys.id}
                type="button"
                onClick={() => toggleSystem(sys.id)}
                className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  selectedSystems.includes(sys.id)
                    ? "border-accent bg-accent/10 text-accent-bright"
                    : "border-white/10 text-slate-500"
                }`}
              >
                {sys.icon} {sys.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Min severity
          </label>
          <select
            value={minSeverity}
            onChange={(e) => setMinSeverity(e.target.value as Severity)}
            className="w-full rounded-lg border border-white/10 bg-surface-raised px-3 py-2 text-sm text-white"
          >
            {SEVERITIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-400">
          <input
            type="checkbox"
            checked={anomaliesOnly}
            onChange={(e) => setAnomaliesOnly(e.target.checked)}
          />
          Cross-system anomalies only
        </label>

        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Keywords (comma-separated)
          </label>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="semiconductor, sanctions"
            className="w-full rounded-lg border border-white/10 bg-surface-raised px-3 py-2 text-sm text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent/90"
        >
          Create watchlist
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-300">
          Active watchlists ({watchlists.length})
        </h2>

        {watchlists.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
            No watchlists yet. Create one to receive alerts when signals match your criteria.
          </p>
        ) : (
          watchlists.map((wl) => (
            <div
              key={wl.id}
              className="rounded-xl border border-white/10 bg-surface-card p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium text-white">{wl.name}</h3>
                  <p className="mt-1 font-mono text-[10px] text-slate-500">
                    Min {wl.minSeverity}
                    {wl.anomaliesOnly ? " · anomalies only" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(wl.id)}
                  className="text-xs text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {wl.systemIds.map((sid) => (
                  <SystemPill key={sid} systemId={sid} />
                ))}
              </div>
              {wl.keywords.length > 0 && (
                <p className="mt-2 text-xs text-slate-500">
                  Keywords: {wl.keywords.join(", ")}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
