import {
  META,
  SECTIONS,
  WHY_NOW,
  PAIN_POINTS,
  CUSTOMERS,
  NORTH_STAR,
  COMPETITORS,
  DIFFERENTIATORS,
  MARKET_SIZE,
  MVPS,
  BUSINESS_MODELS,
  RISKS,
  SYSTEMS,
} from "./data.js";

function cellIcon(value) {
  if (value === true) return '<span class="cell-yes">✓</span>';
  if (value === false) return '<span class="cell-no">✗</span>';
  if (value === "partial") return '<span class="cell-partial">◑</span>';
  if (value === "limited") return '<span class="cell-partial">◑ Limited</span>';
  if (value === "basic") return '<span class="cell-partial">◑ Basic</span>';
  return `<span class="cell-partial">${value}</span>`;
}

function renderCompetitiveTable() {
  const { headers, rows } = COMPETITORS;
  const head = headers.map((h) => `<th>${h}</th>`).join("");
  const body = rows
    .map(
      (r) => `
    <tr class="${r.highlight ? "highlight" : ""}">
      <td>${r.player}</td>
      <td>${r.category}</td>
      <td>${cellIcon(r.multi)}</td>
      <td>${cellIcon(r.ai)}</td>
      <td>${cellIcon(r.scenario)}</td>
      <td>${r.pricing === true ? `<span class="cell-yes">✓</span> ${r.pricingNote}` : r.pricing === false ? `<span class="cell-no">✗</span> ${r.pricingNote}` : `<span class="cell-partial">◑</span> ${r.pricingNote}`}</td>
    </tr>`
    )
    .join("");
  return `<table class="competitive-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function renderFrameworkNav() {
  return SECTIONS.map(
    (s) => `<a href="#${s.id}" title="${s.title}">${s.num}</a>`
  ).join("");
}

function renderHeroGraph() {
  const nodes = NORTH_STAR.systems
    .map(
      (name, i) => `
    <div class="system-node">
      <span class="system-node-icon">${SYSTEMS[i]?.icon || "◈"}</span>
      <span>${name.replace(" Systems", "").replace(" Shifts", "")}</span>
    </div>`
    )
    .join("");

  return `
    <div class="hero-visual">
      <div class="system-graph">
        <svg class="graph-lines" viewBox="0 0 400 400">
          <line x1="200" y1="60" x2="200" y2="200" stroke="rgba(99,102,241,0.3)" stroke-width="1"/>
          <line x1="60" y1="320" x2="200" y2="200" stroke="rgba(99,102,241,0.3)" stroke-width="1"/>
          <line x1="340" y1="320" x2="200" y2="200" stroke="rgba(99,102,241,0.3)" stroke-width="1"/>
          <line x1="30" y1="200" x2="200" y2="200" stroke="rgba(99,102,241,0.3)" stroke-width="1"/>
          <line x1="370" y1="200" x2="200" y2="200" stroke="rgba(99,102,241,0.3)" stroke-width="1"/>
        </svg>
        ${nodes}
        <div class="graph-center">
          <span>Intersection</span>
          <span>Layer</span>
        </div>
      </div>
    </div>`;
}

function renderNorthStarVisual() {
  const parts = [];
  NORTH_STAR.systems.forEach((sys, i) => {
    if (i > 0) parts.push('<span class="ns-arrow">↕</span>');
    parts.push(`<div class="ns-system">${sys}</div>`);
  });
  return parts.join("");
}

function renderPage() {
  document.getElementById("framework-nav").innerHTML = renderFrameworkNav();

  document.getElementById("why-now-grid").innerHTML = WHY_NOW.map(
    (item) => `
    <div class="card fade-in">
      <div class="card-label">${item.label}</div>
      <h3>${item.title}</h3>
      <p>${item.body}</p>
      <span class="card-signal">${item.signal}</span>
    </div>`
  ).join("");

  document.getElementById("pain-grid").innerHTML = PAIN_POINTS.items.map(
    (p) => `
    <div class="card pain-card fade-in">
      <div class="pain-id">${p.id}</div>
      <h3>${p.title}</h3>
      <p>${p.body}</p>
    </div>`
  ).join("");

  document.getElementById("customer-grid").innerHTML = CUSTOMERS.map(
    (c) => `
    <div class="card customer-card priority-${c.priority} fade-in">
      <div class="customer-tier">${c.tier}</div>
      <h3>${c.title}</h3>
      <p>${c.body}</p>
      <div class="customer-acv">${c.acv}</div>
      <div class="customer-tags">${c.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    </div>`
  ).join("");

  document.getElementById("north-star-visual").innerHTML = renderNorthStarVisual();

  document.getElementById("competitive-table").innerHTML = renderCompetitiveTable();

  document.getElementById("differentiator-grid").innerHTML = DIFFERENTIATORS.items.map(
    (d) => `
    <div class="card fade-in">
      <div class="card-label">Differentiator ${d.id}</div>
      <h3>${d.title}</h3>
      <p>${d.body}</p>
    </div>`
  ).join("");

  document.getElementById("market-stats").innerHTML = `
    <div class="market-stat fade-in">
      <div class="market-stat-value">${MARKET_SIZE.tam.value}</div>
      <div class="market-stat-label">${MARKET_SIZE.tam.label}</div>
    </div>
    <div class="market-stat fade-in">
      <div class="market-stat-value">${MARKET_SIZE.sam.value}</div>
      <div class="market-stat-label">${MARKET_SIZE.sam.label}</div>
    </div>
    <div class="market-stat fade-in">
      <div class="market-stat-value">${MARKET_SIZE.som.value}</div>
      <div class="market-stat-label">${MARKET_SIZE.som.label}</div>
    </div>`;

  document.getElementById("mvp-timeline").innerHTML = MVPS.map(
    (m, i) => `
    <div class="mvp-card ${m.status} fade-in">
      <div class="mvp-num">MVP ${i + 1}</div>
      <div>
        <div class="mvp-timeline-label">${m.timeline}</div>
        <h3>${m.title}</h3>
        <p>${m.body}</p>
        <div class="mvp-goal">${m.goal}</div>
      </div>
      <span class="mvp-status ${m.status}">${m.status === "active" ? "In Progress" : "Planned"}</span>
    </div>`
  ).join("");

  document.getElementById("business-grid").innerHTML = BUSINESS_MODELS.map(
    (b) => `
    <div class="card biz-card fade-in">
      <div class="biz-label">${b.label}</div>
      <h3>${b.title}</h3>
      <p>${b.body}</p>
      <div class="biz-pricing">${b.pricing}</div>
      ${b.note ? `<div class="biz-note">${b.note}</div>` : ""}
      <div class="biz-comparable">${b.comparable}</div>
    </div>`
  ).join("");

  document.getElementById("risk-grid").innerHTML = RISKS.map(
    (r) => `
    <div class="card risk-card fade-in">
      <span class="risk-level ${r.level}">${r.level}</span>
      <div>
        <h3>${r.title}</h3>
        <p>${r.body}</p>
      </div>
    </div>`
  ).join("");

  document.getElementById("hero-graph").innerHTML = renderHeroGraph();
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

function initFrameworkNav() {
  const links = document.querySelectorAll(".framework-nav a");
  const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-20% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
  initScrollAnimations();
  initFrameworkNav();
});

export { META };
