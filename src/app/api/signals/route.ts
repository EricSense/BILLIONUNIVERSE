import { NextResponse } from 'next/server';
import type { Signal } from '@/types/signal';

// Placeholder: replace with real data source (DB, external APIs, AI pipeline)
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
];

export async function GET() {
  // TODO: add auth, pagination, filters
  return NextResponse.json(MOCK_SIGNALS);
}
