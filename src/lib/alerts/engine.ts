import type { Alert, Signal, Watchlist } from "@/lib/types";

const SEVERITY_RANK = { critical: 4, high: 3, medium: 2, low: 1 };

function meetsSeverity(signal: Signal, min: Watchlist["minSeverity"]) {
  return SEVERITY_RANK[signal.severity] >= SEVERITY_RANK[min];
}

function matchesWatchlist(signal: Signal, watchlist: Watchlist): boolean {
  if (!meetsSeverity(signal, watchlist.minSeverity)) return false;
  if (watchlist.anomaliesOnly && !signal.anomaly) return false;

  const systemMatch = watchlist.systemIds.every((id) => signal.systems.includes(id));
  if (!systemMatch) return false;

  if (watchlist.keywords.length > 0) {
    const haystack = `${signal.title} ${signal.summary} ${signal.intersection}`.toLowerCase();
    const keywordMatch = watchlist.keywords.some((kw) => haystack.includes(kw.toLowerCase()));
    if (!keywordMatch) return false;
  }

  return true;
}

export function evaluateWatchlists(
  signals: Signal[],
  watchlists: Watchlist[],
  existingAlerts: Alert[]
): Alert[] {
  const existingKeys = new Set(
    existingAlerts.map((a) => `${a.watchlistId}:${a.signalId}`)
  );

  const newAlerts: Alert[] = [];

  for (const watchlist of watchlists) {
    for (const signal of signals) {
      if (!matchesWatchlist(signal, watchlist)) continue;
      const key = `${watchlist.id}:${signal.id}`;
      if (existingKeys.has(key)) continue;

      newAlerts.push({
        id: `alert_${watchlist.id}_${signal.id}`,
        watchlistId: watchlist.id,
        watchlistName: watchlist.name,
        signalId: signal.id,
        signalTitle: signal.title,
        severity: signal.severity,
        createdAt: new Date().toISOString(),
        read: false,
      });
      existingKeys.add(key);
    }
  }

  return [...newAlerts, ...existingAlerts].slice(0, 100);
}

export function countUnread(alerts: Alert[]) {
  return alerts.filter((a) => !a.read).length;
}
