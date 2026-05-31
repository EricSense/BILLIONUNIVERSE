import { getSystem } from "@/lib/data/systems";
import type { SystemId } from "@/lib/types";

export function SystemPill({ systemId }: { systemId: SystemId }) {
  const system = getSystem(systemId);
  if (!system) return null;

  return (
    <span
      className="rounded border px-1.5 py-0.5 text-[10px] font-medium"
      style={{
        color: system.color,
        borderColor: `${system.color}40`,
        backgroundColor: `${system.color}15`,
      }}
    >
      {system.name.split(" ")[0]}
    </span>
  );
}
