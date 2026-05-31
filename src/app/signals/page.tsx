import { LiveSignalFeed } from "@/components/live-signal-feed";
import { StatCard } from "@/components/ui/stat-card";
import { filterSignals, getSignalStats } from "@/lib/data/signals";
import { Suspense } from "react";

function SignalsFallback() {
  return <p className="text-sm text-slate-500">Loading signal feed…</p>;
}

export default function SignalsPage() {
  const stats = getSignalStats();
  const signals = filterSignals({});

  return (
    <div className="space-y-8">
      <header>
        <div className="font-mono text-[10px] uppercase tracking-wider text-accent-bright">
          MVP 1 · Signal Intelligence
        </div>
        <h1 className="mt-1 font-display text-3xl text-white">Cross-System Signals</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          AI-synthesized anomalies where macro economy, supply chain, energy, political, and technology
          systems intersect.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active signals"
          value={stats.total}
          hint={`${stats.liveCount ?? 0} live overlay`}
          variant="success"
        />
        <StatCard label="Cross-system anomalies" value={stats.anomalies} hint="Intersection layer" />
        <StatCard label="Critical severity" value={stats.critical} hint="Requires attention" variant="alert" />
        <StatCard label="Avg. confidence" value={`${stats.avgConfidence}%`} hint="AI synthesis" />
      </div>

      <Suspense fallback={<SignalsFallback />}>
        <LiveSignalFeed initialSignals={signals} />
      </Suspense>
    </div>
  );
}
