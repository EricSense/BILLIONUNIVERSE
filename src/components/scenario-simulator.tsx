"use client";

import { CascadePanel } from "@/components/cascade-panel";
import { SYSTEMS } from "@/lib/data/systems";
import type { ScenarioResult, SystemId } from "@/lib/types";
import { useState } from "react";

export function ScenarioSimulator() {
  const [triggerSystemId, setTriggerSystemId] = useState<SystemId>("macro");
  const [change, setChange] = useState("");
  const [magnitude, setMagnitude] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSimulate(e: React.FormEvent) {
    e.preventDefault();
    if (!change.trim()) {
      setError("Describe the change in the trigger system.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/scenarios/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triggerSystemId, change, magnitude }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Simulation failed");
      }

      const data = await res.json();
      setResult(data.scenario);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Simulation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form onSubmit={handleSimulate} className="space-y-5 rounded-xl border border-white/10 bg-surface-card p-5">
        <div>
          <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Trigger system
          </label>
          <select
            value={triggerSystemId}
            onChange={(e) => setTriggerSystemId(e.target.value as SystemId)}
            className="w-full rounded-lg border border-white/10 bg-surface-raised px-3 py-2.5 text-sm text-white"
          >
            {SYSTEMS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.icon} {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-slate-500">
            What changes?
          </label>
          <textarea
            value={change}
            onChange={(e) => setChange(e.target.value)}
            placeholder='e.g. "Fed holds rates while ECB cuts 50bps"'
            rows={4}
            className="w-full resize-none rounded-lg border border-white/10 bg-surface-raised px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Magnitude
          </label>
          <div className="flex gap-2">
            {(["low", "medium", "high"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMagnitude(m)}
                className={`flex-1 rounded-lg border py-2 text-xs capitalize transition-colors ${
                  magnitude === m
                    ? "border-accent bg-accent/10 text-accent-bright"
                    : "border-white/10 text-slate-400"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-accent to-indigo-600 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/20 disabled:opacity-50"
        >
          {loading ? "Running parallel branches…" : "Simulate cross-system effects"}
        </button>

        <p className="text-xs text-slate-500">
          Generates and ranks scenario branches across connected systems — not just the most likely path.
        </p>
      </form>

      <div className="space-y-4">
        {!result ? (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
            Define a change and run the parallel possibility engine.
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-white/10 bg-surface-card p-4">
              <div className="font-mono text-[10px] uppercase tracking-wider text-accent-bright">
                Scenario {result.id}
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Trigger: <span className="text-white">{result.input.change}</span> in{" "}
                {SYSTEMS.find((s) => s.id === result.input.triggerSystemId)?.name}
              </p>
            </div>

            {result.branches.map((branch) => (
              <div
                key={branch.id}
                className="rounded-xl border border-white/10 bg-surface-card overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-white/10 bg-surface-raised px-4 py-3">
                  <h3 className="text-sm font-medium">{branch.label}</h3>
                  <span className="font-mono text-sm text-cyan-signal">
                    {Math.round(branch.probability * 100)}%
                  </span>
                </div>
                <div className="p-4">
                  <CascadePanel cascades={branch.cascades} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
