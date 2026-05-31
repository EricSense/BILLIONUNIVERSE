import { SYSTEMS, SIGNALS, INTERSECTIONS } from "./data.js";

let activeFilter = "all";
let selectedSignalId = SIGNALS[0]?.id;

const CASCADES = {
  "sig-001": [
    { order: "1st order", text: "Advanced packaging export restrictions tighten supply of AI accelerators" },
    { order: "2nd order", text: "Automotive OEMs delay EV platform launches due to chip allocation shifts" },
    { order: "3rd order", text: "Regional manufacturing incentives accelerate as governments race to onshore capacity" },
  ],
  "sig-002": [
    { order: "1st order", text: "European industrial energy costs diverge from Asian benchmarks" },
    { order: "2nd order", text: "Chemical and steel producers evaluate capacity relocation to lower-cost regions" },
    { order: "3rd order", text: "Trade policy responses emerge as EU considers carbon border adjustments" },
  ],
  "sig-003": [
    { order: "1st order", text: "Currency volatility increases across G10 and emerging market pairs" },
    { order: "2nd order", text: "EM sovereign debt servicing costs rise in dollar-denominated obligations" },
    { order: "3rd order", text: "Political pressure mounts on central banks as inflation-growth tradeoffs diverge" },
  ],
  "sig-004": [
    { order: "1st order", text: "Rare earth processing bottlenecks constrain magnet supply for EV motors" },
    { order: "2nd order", text: "Battery manufacturers seek alternative chemistries to reduce rare earth dependency" },
    { order: "3rd order", text: "Geopolitical alliances form around mineral processing capacity investments" },
  ],
  "sig-005": [
    { order: "1st order", text: "Regional grid operators revise capacity forecasts upward for datacenter corridors" },
    { order: "2nd order", text: "Utility rate structures shift toward demand-based pricing for high-load customers" },
    { order: "3rd order", text: "Regulatory frameworks emerge for AI infrastructure energy accountability" },
  ],
  "sig-006": [
    { order: "1st order", text: "Cross-border payment settlement times increase for commodity traders" },
    { order: "2nd order", text: "Logistics financing costs rise as letters of credit face extended processing" },
    { order: "3rd order", text: "Alternative payment rails gain adoption in trade corridors affected by compliance friction" },
  ],
};

function getSystem(id) {
  return SYSTEMS.find((s) => s.id === id);
}

function renderStats() {
  const anomalies = SIGNALS.filter((s) => s.anomaly).length;
  const critical = SIGNALS.filter((s) => s.severity === "critical").length;
  const avgConfidence = Math.round(
    SIGNALS.reduce((sum, s) => sum + s.confidence, 0) / SIGNALS.length
  );

  document.getElementById("dashboard-stats").innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${SIGNALS.length}</div>
      <div class="stat-label">Active Signals</div>
      <div class="stat-delta up">+3 today</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${anomalies}</div>
      <div class="stat-label">Cross-System Anomalies</div>
      <div class="stat-delta up">Intersection layer</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${critical}</div>
      <div class="stat-label">Critical Severity</div>
      <div class="stat-delta down">Requires attention</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${avgConfidence}%</div>
      <div class="stat-label">Avg. Confidence</div>
      <div class="stat-delta up">AI synthesis</div>
    </div>`;
}

function renderFilters() {
  const filters = [
    { id: "all", label: "All Systems" },
    ...SYSTEMS.map((s) => ({ id: s.id, label: s.name })),
  ];

  document.getElementById("filter-bar").innerHTML = filters
    .map(
      (f) =>
        `<button class="filter-chip ${f.id === activeFilter ? "active" : ""}" data-filter="${f.id}">${f.label}</button>`
    )
    .join("");

  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter;
      renderFilters();
      renderSignals();
    });
  });
}

function filteredSignals() {
  if (activeFilter === "all") return SIGNALS;
  return SIGNALS.filter((s) => s.systems.includes(activeFilter));
}

function renderSignals() {
  const signals = filteredSignals();
  const list = document.getElementById("signal-list");

  if (signals.length === 0) {
    list.innerHTML = `<li class="empty-state">No signals match this filter.</li>`;
    return;
  }

  list.innerHTML = signals
    .map((s) => {
      const systems = s.systems
        .map((id) => {
          const sys = getSystem(id);
          return sys
            ? `<span class="system-pill" style="color:${sys.color};border-color:${sys.color}40;background:${sys.color}15">${sys.name.split(" ")[0]}</span>`
            : "";
        })
        .join("");

      return `
      <li class="signal-item ${s.id === selectedSignalId ? "selected" : ""}" data-id="${s.id}">
        <div class="signal-top">
          <div class="signal-title">${s.title}</div>
          <span class="signal-severity ${s.severity}">${s.severity}</span>
        </div>
        <div class="signal-intersection">${s.intersection}</div>
        <p class="signal-summary">${s.summary}</p>
        <div class="signal-meta">
          <div class="signal-systems">${systems}</div>
          ${s.anomaly ? '<span class="anomaly-badge">◈ Anomaly</span>' : ""}
          <span class="signal-confidence">${s.confidence}% conf.</span>
          <span class="signal-time">${s.timestamp}</span>
        </div>
      </li>`;
    })
    .join("");

  list.querySelectorAll(".signal-item").forEach((item) => {
    item.addEventListener("click", () => {
      selectedSignalId = item.dataset.id;
      renderSignals();
      renderDetail();
      drawGraph(selectedSignalId);
    });
  });
}

function renderDetail() {
  const signal = SIGNALS.find((s) => s.id === selectedSignalId);
  const panel = document.getElementById("detail-panel");

  if (!signal) {
    panel.innerHTML = `<div class="empty-state">Select a signal to view cascade analysis.</div>`;
    return;
  }

  const cascades = CASCADES[signal.id] || [];

  panel.innerHTML = `
    <h3>${signal.title}</h3>
    <p>${signal.summary}</p>
    <div class="label" style="margin-bottom:0.75rem">Cascade Analysis</div>
    <ul class="cascade-list">
      ${cascades.map((c) => `
        <li class="cascade-item">
          <div class="cascade-order">${c.order}</div>
          <div class="cascade-text">${c.text}</div>
        </li>`).join("")}
    </ul>`;
}

function drawGraph(highlightSignalId) {
  const canvas = document.getElementById("system-graph-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.32;

  const signal = SIGNALS.find((s) => s.id === highlightSignalId);
  const activeSystems = signal ? new Set(signal.systems) : new Set(SYSTEMS.map((s) => s.id));

  ctx.clearRect(0, 0, w, h);

  const positions = {};
  SYSTEMS.forEach((sys, i) => {
    const angle = (i / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2;
    positions[sys.id] = {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    };
  });

  INTERSECTIONS.forEach((link) => {
    const from = positions[link.from];
    const to = positions[link.to];
    const isActive = activeSystems.has(link.from) && activeSystems.has(link.to);

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = isActive
      ? `rgba(99, 102, 241, ${0.3 + link.strength * 0.5})`
      : "rgba(148, 163, 184, 0.1)";
    ctx.lineWidth = isActive ? 1.5 + link.strength : 0.5;
    ctx.stroke();
  });

  SYSTEMS.forEach((sys) => {
    const pos = positions[sys.id];
    const isActive = activeSystems.has(sys.id);
    const nodeR = isActive ? 28 : 22;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, nodeR, 0, Math.PI * 2);
    ctx.fillStyle = isActive ? `${sys.color}30` : "rgba(21, 29, 46, 0.9)";
    ctx.fill();
    ctx.strokeStyle = isActive ? sys.color : "rgba(148, 163, 184, 0.2)";
    ctx.lineWidth = isActive ? 2 : 1;
    ctx.stroke();

    ctx.fillStyle = isActive ? sys.color : "#64748b";
    ctx.font = `${isActive ? 14 : 12}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(sys.icon, pos.x, pos.y);
  });

  ctx.beginPath();
  ctx.arc(cx, cy, 20, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(99, 102, 241, 0.15)";
  ctx.fill();
  ctx.strokeStyle = "rgba(99, 102, 241, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#818cf8";
  ctx.font = "10px monospace";
  ctx.fillText("CORE", cx, cy);
}

function renderLegend() {
  document.getElementById("system-legend").innerHTML = SYSTEMS.map(
    (s) => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${s.color}"></span>
      ${s.name}
    </div>`
  ).join("");
}

function initLiveUpdates() {
  setInterval(() => {
    const badge = document.getElementById("live-badge");
    if (badge) {
      badge.style.opacity = badge.style.opacity === "0.5" ? "1" : "0.5";
    }
  }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderFilters();
  renderSignals();
  renderDetail();
  renderLegend();
  drawGraph(selectedSignalId);
  initLiveUpdates();

  window.addEventListener("resize", () => drawGraph(selectedSignalId));
});
