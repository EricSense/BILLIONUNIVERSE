"use client";

import { CascadePanel } from "@/components/cascade-panel";
import { SYSTEMS } from "@/lib/data/systems";
import {
  createId,
  deleteSavedScenario,
  getSavedScenarios,
  saveScenario,
} from "@/lib/storage/client-store";
import type { SavedScenario, ScenarioResult, SystemId } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ScenarioSimulator() {
  const searchParams = useSearchParams();
  const [triggerSystemId, setTriggerSystemId] = useState<SystemId>("macro");
  const [change, setChange] = useState("");
  const [magnitude, setMagnitude] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedScenario[]>([]);
  const [saveName, setSaveName] = useState("");

  useEffect(() => {
    setSaved(getSavedScenarios());
  }, []);

  useEffect(() => {
    const trigger = searchParams.get("trigger") as SystemId | null;
    const changeParam = searchParams.get("change");
    if (trigger && SYSTEMS.some((s) => s.id === trigger)) {
      setTriggerSystemId(trigger);
    }
    if (changeParam) {
      setChange(decodeURIComponent(changeParam));
    }
  }, [searchParams]);

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
      setSaveName(change.slice(0, 48));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Simulation failed");
    } finally {
      setLoading(false);
    }
  }

  function handleSave() {
    if (!result || !saveName.trim()) return;
    const item: SavedScenario = {
      id: createId("sc"),
      name: saveName.trim(),
      result,
      savedAt: new Date().toISOString(),
    };
    saveScenario(item);
    setSaved(getSavedScenarios());
  }

  function loadSaved(item: SavedScenario) {
    setResult(item.result);
    setTriggerSystemId(item.result.input.triggerSystemId);
    setChange(item.result.input.change);
    setMagnitude(item.result.input.magnitude ?? "medium");
    setSaveName(item.name);
  }

  function handleDeleteSaved(id: string) {
    deleteSavedScenario(id);
    setSaved(getSavedScenarios());
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[320px_400px_1fr]">
      <aside className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-300">Saved scenarios</h2>
        {saved.length === 0 ? (
          <p className="text-xs text-slate-500">Run and save simulations for quick recall.</p>
        ) : (
          <ul className="space-y-2">
            {saved.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-white/10 bg-surface-card p-3"
              >
                <button
                  type="button"
                  onClick={() => loadSaved(item)}
                  className="w-full text-left"
                >
                  <div className="text-sm font-medium text-white">{item.name}</div>
                  <div className="mt-1 font-mono text-[10px] text-slate-500">
                    {item.result.branches.length} branches ·{" "}
                    {new Date(item.savedAt).toLocaleDateString()}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSaved(item.id)}
                  className="mt-2 text-[10px] text-red-400 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <form
        onSubmit={handleSimulate}
        className="space-y-5 rounded-xl border border-white/10 bg-surface-card p-5 h-fit"
      >
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
      </form>

      <div className="space-y-4 min-w-0">
        {!result ? (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
            Define a change and run the parallel possibility engine.
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-white/10 bg-surface-card p-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-accent-bright">
                    {result.id}
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{result.input.change}</p>
                </div>
                <div className="flex gap-2">
                  <input
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder="Scenario name"
                    className="rounded-lg border border-white/10 bg-surface-raised px-2 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent-bright hover:bg-accent/20"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {result.branches.map((branch) => (
              <div
                key={branch.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-surface-card"
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
