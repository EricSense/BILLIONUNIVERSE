import { CascadePanel } from "@/components/cascade-panel";
import { SystemGraph } from "@/components/system-graph";
import { SeverityBadge } from "@/components/ui/severity-badge";
import { SystemPill } from "@/components/ui/system-pill";
import { getSignal } from "@/lib/data/signals";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function SignalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const signal = getSignal(id);

  if (!signal) notFound();

  return (
    <div className="space-y-8">
      <div>
        <Link href="/signals" className="text-sm text-accent-bright hover:underline">
          ← Back to signals
        </Link>
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-start gap-3">
          <SeverityBadge severity={signal.severity} />
          {signal.anomaly && (
            <span className="rounded bg-accent/10 px-2 py-0.5 text-xs text-accent-bright">
              ◈ Cross-system anomaly
            </span>
          )}
          <span className="font-mono text-xs text-slate-500">{signal.confidence}% confidence</span>
        </div>
        <h1 className="font-display text-3xl text-white">{signal.title}</h1>
        <p className="font-mono text-sm text-cyan-signal">{signal.intersection}</p>
        <p className="max-w-3xl text-slate-300">{signal.summary}</p>
        <div className="flex flex-wrap gap-2">
          {signal.systems.map((sid) => (
            <SystemPill key={sid} systemId={sid} />
          ))}
        </div>
        <p className="text-xs text-slate-500">{formatTime(signal.timestamp)}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-surface-card p-5">
          <h2 className="mb-4 text-sm font-semibold">Cascade Analysis</h2>
          <CascadePanel cascades={signal.cascades} />
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-card">
          <div className="border-b border-white/10 bg-surface-raised px-4 py-3">
            <h2 className="text-sm font-semibold">Affected Systems</h2>
          </div>
          <SystemGraph highlightSystemIds={signal.systems} width={480} height={360} />
        </div>
      </div>

      {signal.sources && signal.sources.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-surface-card p-5">
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Data sources
          </h2>
          <ul className="flex flex-wrap gap-2">
            {signal.sources.map((src) => (
              <li
                key={src}
                className="rounded border border-white/10 bg-surface-raised px-3 py-1.5 text-xs text-slate-400"
              >
                {src}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-cyan-signal/20 bg-cyan-signal/5 p-5">
        <p className="text-sm text-slate-300">
          Model this signal as a scenario — explore parallel branches across connected systems.
        </p>
        <Link
          href={`/scenarios?trigger=${signal.systems[0]}&change=${encodeURIComponent(signal.title)}`}
          className="mt-3 inline-block rounded-lg border border-cyan-signal/30 bg-cyan-signal/10 px-4 py-2 text-sm text-cyan-signal hover:bg-cyan-signal/20"
        >
          Open in Scenario Engine →
        </Link>
      </div>
    </div>
  );
}
