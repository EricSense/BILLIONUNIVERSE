"use client";

import { SYSTEM_LINKS, SYSTEMS } from "@/lib/data/systems";
import type { SystemId } from "@/lib/types";
import { useEffect, useRef } from "react";

export function SystemGraph({
  highlightSystemIds,
  width = 400,
  height = 320,
}: {
  highlightSystemIds?: SystemId[];
  width?: number;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const active = new Set(highlightSystemIds ?? SYSTEMS.map((s) => s.id));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.32;

    const positions: Record<string, { x: number; y: number }> = {};
    SYSTEMS.forEach((sys, i) => {
      const angle = (i / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2;
      positions[sys.id] = {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      };
    });

    ctx.clearRect(0, 0, width, height);

    SYSTEM_LINKS.forEach((link) => {
      const from = positions[link.from];
      const to = positions[link.to];
      const isActive = active.has(link.from) && active.has(link.to);

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = isActive
        ? `rgba(99, 102, 241, ${0.25 + link.strength * 0.5})`
        : "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = isActive ? 1.5 + link.strength : 0.5;
      ctx.stroke();
    });

    SYSTEMS.forEach((sys) => {
      const pos = positions[sys.id];
      const isActive = active.has(sys.id);
      const nodeR = isActive ? 26 : 20;

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeR, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? `${sys.color}30` : "rgba(21, 29, 46, 0.95)";
      ctx.fill();
      ctx.strokeStyle = isActive ? sys.color : "rgba(148, 163, 184, 0.2)";
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.stroke();

      ctx.fillStyle = isActive ? sys.color : "#64748b";
      ctx.font = `${isActive ? 13 : 11}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sys.icon, pos.x, pos.y);
    });

    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(99, 102, 241, 0.15)";
    ctx.fill();
    ctx.strokeStyle = "rgba(99, 102, 241, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#818cf8";
    ctx.font = "9px monospace";
    ctx.fillText("CORE", cx, cy);
  }, [active, width, height]);

  return (
    <div>
      <canvas ref={canvasRef} className="w-full" />
      <div className="flex flex-wrap gap-3 border-t border-white/10 px-4 py-3">
        {SYSTEMS.map((s) => (
          <div key={s.id} className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}
