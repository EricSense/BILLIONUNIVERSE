import { NextResponse } from 'next/server';
import type { Signal } from '@/types/signal';
import { parseRss } from '@/lib/rss';

// MVP1: lightweight “real signals” via public RSS sources (no keys required).
// Later: replace/augment with DB + licensed feeds + AI synthesis.
const SOURCES: Array<{
  id: string;
  url: string;
  systems: Array<'Macro' | 'Supply Chain' | 'Energy'>;
}> = [
  {
    id: 'imf-news',
    url: 'https://www.imf.org/en/news/rss',
    systems: ['Macro'],
  },
  {
    id: 'wto-news',
    url: 'http://www.wto.org/library/rss/latest_news_e.xml',
    systems: ['Supply Chain', 'Macro'],
  },
  {
    id: 'eia-today-in-energy',
    url: 'https://www.eia.gov/rss/todayinenergy.xml',
    systems: ['Energy', 'Macro'],
  },
];

function hashId(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `sig_${(h >>> 0).toString(16)}`;
}

function guessSeverity(title: string): Signal['severity'] {
  const t = title.toLowerCase();
  if (/(crisis|war|attack|sanction|default|bankrupt|outage|spike)/.test(t))
    return 'high';
  if (/(warn|cuts?|raise|drop|slump|inflation|tariff|strike)/.test(t))
    return 'medium';
  return 'low';
}

function summarize(title: string, systems: string[]) {
  return `Signal detected across ${systems.join(
    ', '
  )}. Review the source and consider second-order effects across connected systems.`;
}

export async function GET() {
  const out: Signal[] = [];

  await Promise.all(
    SOURCES.map(async (src) => {
      try {
        const res = await fetch(src.url, {
          // Keep it fast and cacheable on Vercel
          next: { revalidate: 600 },
          headers: { 'User-Agent': 'BillionUniverse/0.1 (+signals)' },
        });
        if (!res.ok) return;
        const xml = await res.text();
        const items = parseRss(xml).slice(0, 6);
        for (const it of items) {
          const systems = src.systems;
          const title = it.title;
          const id = hashId(`${src.id}:${it.link ?? title}`);
          out.push({
            id,
            title,
            systems: systems as string[],
            summary: summarize(title, systems),
            severity: guessSeverity(title),
            timestamp: new Date().toISOString(),
            sourceHint: src.id,
          });
        }
      } catch {
        // Ignore source failures; return what we can.
      }
    })
  );

  // Fallback so the UI isn't empty if RSS is blocked.
  if (out.length === 0) {
    out.push({
      id: 'fallback_1',
      title: 'Signals feed warming up',
      systems: ['Macro', 'Supply Chain', 'Energy'],
      summary:
        'Live sources may be temporarily unavailable. Check again shortly or add additional sources.',
      severity: 'low',
      timestamp: new Date().toISOString(),
      sourceHint: 'system',
    });
  }

  return NextResponse.json(out.slice(0, 30));
}
