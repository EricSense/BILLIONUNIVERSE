import { ScenarioSimulator } from "@/components/scenario-simulator";
import { Suspense } from "react";

function ScenariosFallback() {
  return (
    <div className="flex h-64 items-center justify-center text-sm text-slate-500">
      Loading scenario engine…
    </div>
  );
}

export default function ScenariosPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="font-mono text-[10px] uppercase tracking-wider text-accent-bright">
          MVP 2 Beta · Parallel Possibility Engine
        </div>
        <h1 className="mt-1 font-display text-3xl text-white">Scenario Simulation</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Define a change in one system and receive ranked branches with second and third-order
          effects across connected systems. Save scenarios for your team.
        </p>
      </header>

      <Suspense fallback={<ScenariosFallback />}>
        <ScenarioSimulator />
      </Suspense>
    </div>
  );
}
