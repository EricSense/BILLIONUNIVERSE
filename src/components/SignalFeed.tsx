'use client';

import { useEffect, useMemo, useState } from 'react';
import { SignalCard } from './SignalCard';
import type { Signal } from '@/types/signal';

type LoadState = 'idle' | 'loading' | 'loaded' | 'error';

export function SignalFeed() {
  const [filter, setFilter] = useState<string | null>(null);
  const [state, setState] = useState<LoadState>('idle');
  const [signals, setSignals] = useState<Signal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setState('loading');
      setError(null);
      try {
        const res = await fetch('/api/signals', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Signal[];
        if (cancelled) return;
        setSignals(data);
        setState('loaded');
      } catch (e) {
        if (cancelled) return;
        setState('error');
        setError(e instanceof Error ? e.message : 'Failed to load');
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const systems = useMemo(
    () => Array.from(new Set(signals.flatMap((s) => s.systems))).sort(),
    [signals]
  );

  const visible = useMemo(
    () => (filter ? signals.filter((s) => s.systems.includes(filter)) : signals),
    [signals, filter]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-zinc-500">Systems:</span>
        <button
          onClick={() => setFilter(null)}
          className={`rounded-full px-3 py-1 text-sm ${
            filter === null
              ? 'bg-universe-accent text-white'
              : 'bg-universe-card text-zinc-400 hover:text-white'
          }`}
        >
          All
        </button>
        {systems.map((sys) => (
          <button
            key={sys}
            onClick={() => setFilter(sys)}
            className={`rounded-full px-3 py-1 text-sm ${
              filter === sys
                ? 'bg-universe-accent text-white'
                : 'bg-universe-card text-zinc-400 hover:text-white'
            }`}
          >
            {sys}
          </button>
        ))}
      </div>

      {state === 'loading' && (
        <div className="rounded-lg border border-universe-border bg-universe-dark p-4 text-sm text-zinc-400">
          Loading live signals…
        </div>
      )}
      {state === 'error' && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          Failed to load signals: {error}
        </div>
      )}

      <ul className="space-y-4">
        {visible.map((signal) => (
          <li key={signal.id}>
            <SignalCard signal={signal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
