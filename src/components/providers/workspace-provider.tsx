"use client";

import { evaluateWatchlists, countUnread } from "@/lib/alerts/engine";
import {
  getAlerts,
  getWatchlists,
  saveAlerts,
} from "@/lib/storage/client-store";
import type { Alert, Signal } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface WorkspaceContextValue {
  alerts: Alert[];
  unreadCount: number;
  syncAlertsFromSignals: (signals: Signal[]) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  refreshWatchlists: () => void;
  watchlistCount: number;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    setAlerts(getAlerts());
    setWatchlistCount(getWatchlists().length);
  }, []);

  const syncAlertsFromSignals = useCallback((signals: Signal[]) => {
    const watchlists = getWatchlists();
    if (watchlists.length === 0) return;

    const existing = getAlerts();
    const merged = evaluateWatchlists(signals, watchlists, existing);
    saveAlerts(merged);
    setAlerts(merged);
  }, []);

  const markRead = useCallback((id: string) => {
    setAlerts((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, read: true } : a));
      saveAlerts(next);
      return next;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setAlerts((prev) => {
      const next = prev.map((a) => ({ ...a, read: true }));
      saveAlerts(next);
      return next;
    });
  }, []);

  const refreshWatchlists = useCallback(() => {
    setWatchlistCount(getWatchlists().length);
  }, []);

  const value = useMemo(
    () => ({
      alerts,
      unreadCount: countUnread(alerts),
      syncAlertsFromSignals,
      markRead,
      markAllRead,
      refreshWatchlists,
      watchlistCount,
    }),
    [alerts, syncAlertsFromSignals, markRead, markAllRead, refreshWatchlists]
  );

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}
