"use client";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { SeverityBadge } from "@/components/ui/severity-badge";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function AlertBell() {
  const { alerts, unreadCount, markRead, markAllRead } = useWorkspace();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const recent = alerts.slice(0, 8);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative rounded-lg border border-white/10 bg-surface-card p-2 text-slate-300 hover:bg-surface-hover hover:text-white"
        aria-label={`${unreadCount} unread alerts`}
      >
        <span className="text-lg">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-white/10 bg-surface-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-surface-raised px-4 py-3">
            <span className="text-sm font-medium">Alerts</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-accent-bright hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <ul className="max-h-80 overflow-y-auto">
            {recent.length === 0 ? (
              <li className="px-4 py-6 text-center text-xs text-slate-500">
                No alerts yet. Create a watchlist to get notified on matching signals.
              </li>
            ) : (
              recent.map((alert) => (
                <li key={alert.id} className="border-b border-white/5 last:border-0">
                  <Link
                    href={`/signals/${alert.signalId}`}
                    onClick={() => {
                      markRead(alert.id);
                      setOpen(false);
                    }}
                    className={`block px-4 py-3 hover:bg-surface-hover ${
                      !alert.read ? "bg-accent/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium leading-snug text-white">
                        {alert.signalTitle}
                      </p>
                      <SeverityBadge severity={alert.severity} />
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-cyan-signal">
                      {alert.watchlistName}
                    </p>
                  </Link>
                </li>
              ))
            )}
          </ul>

          <div className="border-t border-white/10 p-2">
            <Link
              href="/watchlists"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-center text-xs text-accent-bright hover:bg-surface-hover"
            >
              Manage watchlists →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
