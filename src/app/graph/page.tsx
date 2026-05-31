import { SystemGraph } from "@/components/system-graph";
import { SYSTEM_LINKS, SYSTEMS } from "@/lib/data/systems";

export default function GraphPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="font-mono text-[10px] uppercase tracking-wider text-accent-bright">
          Intersection Layer
        </div>
        <h1 className="mt-1 font-display text-3xl text-white">System Graph</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          The connective tissue between systems — where consequential events happen. Billion Universe
          models relationships between systems, not depth within them.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-card">
        <SystemGraph width={900} height={480} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SYSTEMS.map((system) => (
          <div
            key={system.id}
            className="rounded-xl border border-white/10 bg-surface-card p-4"
            style={{ borderTopColor: system.color, borderTopWidth: 2 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{system.icon}</span>
              <h3 className="font-medium text-white">{system.name}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-400">{system.description}</p>
            <ul className="mt-3 space-y-1">
              {SYSTEM_LINKS.filter((l) => l.from === system.id || l.to === system.id).map(
                (link) => (
                  <li key={`${link.from}-${link.to}`} className="font-mono text-[10px] text-slate-500">
                    {link.from === system.id ? "→" : "←"}{" "}
                    {SYSTEMS.find((s) => s.id === (link.from === system.id ? link.to : link.from))?.name}{" "}
                    · {link.label} ({Math.round(link.strength * 100)}%)
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
