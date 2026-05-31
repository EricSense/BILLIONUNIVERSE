import { SourcesPanel } from "@/components/sources-panel";
import Link from "next/link";

export default function SourcesPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="font-mono text-[10px] uppercase tracking-wider text-accent-bright">
          Data Layer
        </div>
        <h1 className="mt-1 font-display text-3xl text-white">Ingestion Sources</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Connector health and sync status for feeds powering the intersection layer. Degraded
          sources may delay cross-system synthesis.
        </p>
      </header>
      <SourcesPanel />
      <p className="text-sm text-slate-500">
        Signals are synthesized from these connectors.{" "}
        <Link href="/signals" className="text-accent-bright hover:underline">
          View signal feed →
        </Link>
      </p>
    </div>
  );
}
