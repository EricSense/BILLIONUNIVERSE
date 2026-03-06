# Billion Universe — Startup playbook

Operational guide: GitHub, hiring, funding, and iterating with customers. You’re already incorporated; this is how to run and scale like a normal startup.

---

## 1. GitHub and code

**Create the repo (if not already):**

- On GitHub: **New repository** → name `billion-universe` (or your org name).
- Visibility: **Private** until you decide to open-source parts or share with investors/contractors.
- Add a short description: “Multi-system intelligence platform — see connections, model cascades.”

**Initial setup:**

```bash
git init
git add .
git commit -m "Initial commit: Next.js app, MVP1 dashboard, feedback, docs"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/billion-universe.git
git push -u origin main
```

**Best practices:**

- **main** = deployable; feature branches and PRs for all non-trivial work.
- Use **.github/** issue and PR templates (in this repo) so feedback and tasks are consistent.
- Protect **main**: require PR review and passing checks before merge.
- **Secrets:** Never commit `.env` or API keys; use GitHub Secrets for CI and env vars in hosting (Vercel, etc.).

**Deploy:**

- Connect repo to **Vercel** (or similar); deploy on push to `main`. Use env vars in project settings for `NEXT_PUBLIC_*` and server keys.

---

## 2. Hiring engineers

**When to hire:**

- After you’ve validated demand (design partners, LOIs, or paying pilots) and need to ship faster or add depth (AI, infra, security).

**Where to find:**

- Your network, AngelList/Wellfound, LinkedIn, YC workatastartup, technical Twitter/X.
- Clear one-pager: problem (multi-system blind spots), solution (Billion Universe), stage (pre-seed, MVP1), stack (Next.js, TypeScript, AI/LLMs, data).

**What to look for:**

- Full-stack or front-end + API comfort; bonus: ML/LLM or data pipelines.
- Able to own a vertical (e.g. “signals pipeline” or “scenario engine”) and iterate with feedback.

**Process:**

- Short async screen (e.g. small take-home or code review).
- 1–2 calls: product + technical depth; share ROADMAP and STARTUP_PLAYBOOK so they see iteration and scale plan.
- Trial or contract-to-hire if you want to de-risk.

**Onboarding:**

- Grant repo access (private), point to README, CONTRIBUTING, ROADMAP.
- First task: one concrete ticket (e.g. “Persist feedback to Supabase” or “Add auth with Clerk”).

---

## 3. Funding

**Stage (from pitch):** Pre-seed.

**Use of funds (typical):**

- Runway 12–18 months: 1–2 founders + 1–2 engineers.
- Build MVP1 → MVP2, get design partners and first $10K–50K pilots.
- Data/API and infra costs; optional legal and compliance for enterprise.

**Sources:**

- **Angels** — operators and investors who understand AI, enterprise SaaS, or strategic intelligence.
- **Pre-seed funds** — many have a “technical founder + idea + early product” thesis.
- **Accelerators** — apply with pitch deck + repo/demo; use their network for customers and later rounds.

**Materials:**

- **Pitch deck** — you have the framework; keep it to 10–12 slides: problem, solution, why now, team, market, traction, ask.
- **Demo** — live dashboard (signals + feedback) and a crisp “North star” line: “One query → cross-system insight in seconds.”
- **Financials** — simple model: freemium → pilots ($10K–50K) → enterprise ($30K–500K ACV); path to $500K ARR and then $4.2B SOM.

**Iteration with investors:**

- Monthly or quarterly updates: metrics (users, feedback, design partner commits), roadmap changes, risks (technical, GTM). Shows you iterate like a normal startup.

---

## 4. Customers, feedback, and iteration

**Who (from pitch):**

- **Primary:** Strategic intelligence teams (CSO, Fortune 500, consultancies) — $30K–500K ACV.
- **Secondary:** Institutional investors (hedge funds, macro) — information edge.
- **Tertiary:** Policy/defense — long cycles, large contracts.

**Feedback loop:**

1. **In-product:** Dashboard feedback form (type + message + optional email) → store in DB/CRM.
2. **Design partners:** Weekly or biweekly calls; structured “what’s working / what’s missing / what would you pay for?”
3. **Triage:** Weekly backlog review; tag feedback (bug, feature, content, other); map to ROADMAP and next sprint.
4. **Communicate back:** Email or in-app note when a requested feature ships (“You asked for X; it’s live.”).

**Supabase setup (recommended):**

- Apply `supabase/schema.sql` in Supabase SQL editor.
- Add env vars in Vercel:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
  - `BU_ADMIN_TOKEN` (protects `/admin/feedback` API)
- Use `/admin/feedback` to review and tag submissions.

**Where to start:**

- Web first (this repo): desktop dashboard, sharing, future API. Add mobile or API when a use case demands it.
- Freemium to get usage and feedback; convert best users to design partners and paid pilots.

**Scale:**

- As you add data sources and systems, keep “multi-system by design” and “parallel possibility engine” as differentiators; let customer feedback decide which vertical to own first (strategic intel vs investors vs policy).

---

## 5. Space to iterate and scale

**Product:**

- ROADMAP is a living doc; adjust MVP scope and dates based on feedback and runway.
- Keep a single source of truth for “what we’re building next” (e.g. GitHub Projects or Notion) linked to ROADMAP.

**Codebase:**

- Modular structure (app, components, API routes, types) so you can add auth, DB, AI, and new features without rewriting.
- Feature flags or env-based toggles for risky or incomplete features so you can ship and iterate safely.

**Operations:**

- Incorporate already done; add cap table, legal, and accounting as you raise and hire.
- Document decisions (e.g. “Why we’re focusing on strategic intel first”) in docs so new hires and investors can follow.

---

Use this playbook as the default for “how we run”; update it as you learn from customers, hiring, and fundraising.
