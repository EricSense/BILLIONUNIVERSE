import { getSystem } from "@/lib/data/systems";
import type { CascadeStep } from "@/lib/types";

export function CascadePanel({ cascades, title }: { cascades: CascadeStep[]; title?: string }) {
  if (cascades.length === 0) {
    return (
      <p className="text-sm text-slate-500">No cascade analysis available.</p>
    );
  }

  return (
    <div>
      {title && (
        <h3 className="mb-3 font-mono text-[10px] uppercase tracking-wider text-accent-bright">
          {title}
        </h3>
      )}
      <ul className="space-y-2">
        {cascades.map((step, i) => {
          const system = getSystem(step.systemId);
          return (
            <li
              key={i}
              className="rounded-lg border-l-2 border-accent bg-surface-raised p-3"
              style={{ borderLeftColor: system?.color ?? "#6366f1" }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase text-slate-500">{step.order}</span>
                {step.probability != null && (
                  <span className="font-mono text-[10px] text-slate-500">
                    {Math.round(step.probability * 100)}%
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-300">{step.text}</p>
              {system && (
                <span className="mt-1 inline-block text-[10px]" style={{ color: system.color }}>
                  {system.name}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
