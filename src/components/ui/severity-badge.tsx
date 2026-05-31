import type { Severity } from "@/lib/types";

const STYLES: Record<Severity, string> = {
  critical: "bg-red-500/15 text-red-400",
  high: "bg-amber-500/15 text-amber-400",
  medium: "bg-slate-500/15 text-slate-400",
  low: "bg-slate-600/15 text-slate-500",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${STYLES[severity]}`}
    >
      {severity}
    </span>
  );
}
