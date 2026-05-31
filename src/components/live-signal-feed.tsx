"use client";

import { SignalFeed } from "@/components/signal-feed";
import { useWorkspace } from "@/components/providers/workspace-provider";
import type { Signal } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

const POLL_MS = 60_000;

export function LiveSignalFeed({ initialSignals }: { initialSignals: Signal[] }) {
  const [signals, setSignals] = useState(initialSignals);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const { syncAlertsFromSignals } = useWorkspace();

  const fetchSignals = useCallback(async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/signals");
      if (!res.ok) return;
      const data = await res.json();
      setSignals(data.signals);
      setLastSync(data.stats?.lastRefresh ?? new Date().toISOString());
      syncAlertsFromSignals(data.signals);
    } finally {
      setSyncing(false);
    }
  }, [syncAlertsFromSignals]);

  useEffect(() => {
    syncAlertsFromSignals(initialSignals);
  }, [initialSignals, syncAlertsFromSignals]);

  useEffect(() => {
    const interval = setInterval(fetchSignals, POLL_MS);
    return () => clearInterval(interval);
  }, [fetchSignals]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-surface-card/50 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span
            className={`h-2 w-2 rounded-full ${syncing ? "animate-pulse bg-amber-400" : "bg-emerald-400"}`}
          />
          {syncing ? "Syncing feeds…" : "Live ingestion active"}
          {lastSync && (
            <span className="font-mono text-slate-500">
              · Last sync {new Date(lastSync).toLocaleTimeString()}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={fetchSignals}
          disabled={syncing}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-accent-bright hover:bg-surface-hover disabled:opacity-50"
        >
          Refresh now
        </button>
      </div>
      <SignalFeed initialSignals={signals} />
    </div>
  );
}
