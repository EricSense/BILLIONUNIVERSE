import { ScenarioSimulator } from "@/components/scenario-simulator";

export default function ScenariosPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="font-mono text-[10px] uppercase tracking-wider text-accent-bright">
          MVP 2 Beta · Parallel Possibility Engine
        </div>
        <h1 className="mt-1 font-display text-3xl text-white">Scenario Simulation</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Define a change in one system and receive AI-modeled second and third-order effects across
          connected systems. Ranked branches — not a single prediction.
        </p>
      </header>

      <ScenarioSimulator />
    </div>
  );
}
