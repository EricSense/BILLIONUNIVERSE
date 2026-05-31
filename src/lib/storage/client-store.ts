"use client";

import type { Alert, SavedScenario, Watchlist } from "@/lib/types";

const KEYS = {
  watchlists: "bu_watchlists",
  alerts: "bu_alerts",
  scenarios: "bu_saved_scenarios",
  readAlerts: "bu_read_alert_ids",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getWatchlists(): Watchlist[] {
  return read(KEYS.watchlists, []);
}

export function saveWatchlist(watchlist: Watchlist) {
  const list = getWatchlists();
  const idx = list.findIndex((w) => w.id === watchlist.id);
  if (idx >= 0) list[idx] = watchlist;
  else list.push(watchlist);
  write(KEYS.watchlists, list);
}

export function deleteWatchlist(id: string) {
  write(
    KEYS.watchlists,
    getWatchlists().filter((w) => w.id !== id)
  );
}

export function getAlerts(): Alert[] {
  return read(KEYS.alerts, []);
}

export function saveAlerts(alerts: Alert[]) {
  write(KEYS.alerts, alerts.slice(0, 100));
}

export function markAlertRead(id: string) {
  const alerts = getAlerts().map((a) => (a.id === id ? { ...a, read: true } : a));
  saveAlerts(alerts);
}

export function markAllAlertsRead() {
  saveAlerts(getAlerts().map((a) => ({ ...a, read: true })));
}

export function getSavedScenarios(): SavedScenario[] {
  return read(KEYS.scenarios, []);
}

export function saveScenario(scenario: SavedScenario) {
  const list = getSavedScenarios();
  const idx = list.findIndex((s) => s.id === scenario.id);
  if (idx >= 0) list[idx] = scenario;
  else list.unshift(scenario);
  write(KEYS.scenarios, list.slice(0, 50));
}

export function deleteSavedScenario(id: string) {
  write(
    KEYS.scenarios,
    getSavedScenarios().filter((s) => s.id !== id)
  );
}

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
