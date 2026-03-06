# Billion Universe — Product roadmap

Aligned with the pitch framework. Use this to prioritize and to communicate with design partners and investors.

---

## MVP1 — Multi-System Signal Dashboard (Month 0–4)

**Goal:** Validate core value prop with early adopters. Freemium entry.

| Area | Status | Notes |
|------|--------|------|
| Landing + dashboard shell | ✅ In repo | Next.js, Signal feed UI, feedback form |
| Signal feed (3–5 systems) | 🔲 | Connect real data: macro, supply chain, energy, tech, policy |
| AI cross-system anomalies | 🔲 | LLM layer to surface intersections from raw signals |
| Auth (optional for freemium) | 🔲 | Clerk or NextAuth; optional sign-up to save views |
| Feedback → product backlog | 🔲 | Persist feedback to DB/CRM and triage weekly |
| Design partner outreach | 🔲 | 5–10 teams; weekly check-ins |

**Success:** 50+ weekly active users, 10+ feedback items triaged, 2–3 design partners committed.

---

## MVP2 — Scenario Simulation Engine (Month 4–9)

**Goal:** First paid product. “If X changes in A, what are effects in B, C, D?”

| Area | Status | Notes |
|------|--------|------|
| Scenario input UI | 🔲 | User picks system + change; optional assumptions |
| Multi-system effect model | 🔲 | AI-generated second/third-order effects; cite systems |
| Output: narrative + confidence | 🔲 | Short report + optional export (PDF/API) |
| Billing (Stripe) | 🔲 | $10K–50K pilots; annual or quarterly |
| 10 design partners | 🔲 | Target 10 paying pilots by month 9 |

**Success:** 10 design partners, $10K–50K per pilot, NPS and feature requests feeding MVP3.

---

## MVP3 — Billion Universe Graph Platform (Month 9–18)

**Goal:** Enterprise SaaS. Real-time graph, causal layer, team collaboration.

| Area | Status | Notes |
|------|--------|------|
| Knowledge graph | 🔲 | Entities + relationships across systems; real-time ingestion |
| Causal inference layer | 🔲 | V1 “good enough” causal links; avoid over-promising |
| Team workspaces + sharing | 🔲 | Seats, roles, shared scenarios and reports |
| Enterprise contracts | 🔲 | $30K–500K ACV; target 3–5 by month 18 |
| API tier (developer) | 🔲 | Usage-based; ecosystem and defensibility |

**Success:** $500K ARR, 3–5 enterprise contracts, clear path to $4.2B SOM.

---

## Iteration and scaling

- **Feedback loop:** All feedback (in-app, calls, design partner) → tagged in backlog; weekly triage; roadmap updated monthly.
- **Beachhead:** Double down on the vertical with highest pain, willingness to pay, and shortest sales cycle (pitch: strategic intel vs institutional investors vs policy).
- **Technical risks:** Causal inference and real-time multi-system modeling — define “good enough” for V1 and iterate with customer input.

Use this doc in planning and in updates to the team, board, and investors.
