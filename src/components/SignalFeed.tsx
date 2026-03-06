'use client';

import { useState } from 'react';
import { SignalCard } from './SignalCard';
import type { Signal } from '@/types/signal';

// Placeholder data — replace with API / DB
const MOCK_SIGNALS: Signal[] = [
  {
    id: '1',
    title: 'Energy–supply chain intersection',
    systems: ['Energy', 'Supply Chain', 'Macro'],
    summary:
      'European gas storage drawdown and Red Sea routing shifts are both stressing Q1 logistics costs. AI cross-check flags second-order pressure on chemical and auto inputs.',
    severity: 'high',
    timestamp: new Date().toISOString(),
    sourceHint: 'Macro + trade flow signals',
  },
  {
    id: '2',
    title: 'Regulatory–tech cascade',
    systems: ['Policy', 'Technology', 'Finance'],
    summary:
      'Draft AI regulation in two major markets correlates with pullback in disclosed AI capex. Possible leading indicator for Q2 earnings narrative.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    sourceHint: 'Policy + earnings transcripts',
  },
  {
    id: '3',
    title: 'Macro–political signal',
    systems: ['Macro', 'Political', 'Energy'],
    summary:
      'Election calendar in key energy-producing regions aligns with OPEC+ meeting schedule. Historical pattern suggests volatility window in oil forwards.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    sourceHint: 'Elections + commodity data',
  },
];

export function SignalFeed() {
  const [filter, setFilter] = useState<string | null>(null);
  const systems = Array.from(
    new Set(MOCK_SIGNALS.flatMap((s) => s.systems))
  ).sort();

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

      <ul className="space-y-4">
        {(filter
          ? MOCK_SIGNALS.filter((s) => s.systems.includes(filter))
          : MOCK_SIGNALS
        ).map((signal) => (
          <li key={signal.id}>
            <SignalCard signal={signal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
