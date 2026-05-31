"use client";

import { AlertBell } from "@/components/alert-bell";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/signals", label: "Signals", desc: "Cross-system feed" },
  { href: "/scenarios", label: "Scenarios", desc: "Parallel modeling" },
  { href: "/graph", label: "System Graph", desc: "Intersection map" },
  { href: "/watchlists", label: "Watchlists", desc: "Alerts & rules" },
  { href: "/sources", label: "Sources", desc: "Data ingestion" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-white/10 bg-surface-base/95 backdrop-blur-xl">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-cyan-signal text-sm">
            ◈
          </span>
          <div>
            <div className="font-display text-lg leading-tight">Billion Universe</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              Multi-system intel
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 transition-colors ${
                  active
                    ? "border-l-2 border-accent bg-accent/10 text-white"
                    : "text-slate-400 hover:bg-surface-hover hover:text-slate-200"
                }`}
              >
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-accent-bright">
              Product · v0.2
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Live feeds · Watchlists · Scenario engine
            </p>
          </div>
        </div>
      </aside>

      <div className="ml-56 flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-end border-b border-white/10 bg-surface-deep/80 px-6 py-3 backdrop-blur-xl">
          <AlertBell />
        </header>
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
