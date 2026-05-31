import { WatchlistManager } from "@/components/watchlist-manager";

export default function WatchlistsPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="font-mono text-[10px] uppercase tracking-wider text-accent-bright">
          Alerting
        </div>
        <h1 className="mt-1 font-display text-3xl text-white">Watchlists</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Define cross-system criteria and get alerted when new signals match. Watchlists
          evaluate on every feed refresh.
        </p>
      </header>
      <WatchlistManager />
    </div>
  );
}
