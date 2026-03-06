import type { Signal } from '@/types/signal';

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

function severityStyle(s: Signal['severity']) {
  switch (s) {
    case 'high':
      return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    case 'medium':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default:
      return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
  }
}

export function SignalCard({ signal }: { signal: Signal }) {
  return (
    <article className="rounded-xl border border-universe-border bg-universe-card p-5 transition hover:border-zinc-600">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-base font-medium text-white">{signal.title}</h2>
        <span
          className={`rounded border px-2 py-0.5 text-xs font-medium ${severityStyle(
            signal.severity
          )}`}
        >
          {signal.severity}
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{signal.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
        <span>{formatTime(signal.timestamp)}</span>
        <span className="flex flex-wrap gap-1">
          {signal.systems.map((sys) => (
            <span
              key={sys}
              className="rounded bg-universe-dark px-2 py-0.5 text-zinc-500"
            >
              {sys}
            </span>
          ))}
        </span>
        {signal.sourceHint && (
          <span className="italic">Sources: {signal.sourceHint}</span>
        )}
      </div>
    </article>
  );
}
