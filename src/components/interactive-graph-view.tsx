"use client";

import { SystemGraph } from "@/components/system-graph";
import type { SystemId } from "@/lib/types";
import { useState } from "react";

export function InteractiveGraphView() {
  const [selected, setSelected] = useState<SystemId | null>(null);

  return (
    <div className="space-y-4">
      <SystemGraph
        width={900}
        height={480}
        interactive
        highlightSystemIds={selected ? [selected] : undefined}
        onSystemClick={setSelected}
      />
      {selected && (
        <p className="text-sm text-slate-400">
          Selected: <span className="text-cyan-signal">{selected}</span> —{" "}
          <a href={`/signals?system=${selected}`} className="text-accent-bright hover:underline">
            View filtered signals →
          </a>
        </p>
      )}
    </div>
  );
}
