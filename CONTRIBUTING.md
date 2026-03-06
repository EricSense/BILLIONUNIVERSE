# Contributing to Billion Universe

Thanks for helping build the multi-system intelligence platform. This doc is for engineers (internal or contractors) and open-source contributors if we open parts of the repo later.

---

## Setup

1. **Clone and install**
   ```bash
   git clone https://github.com/YOUR_ORG/billion-universe.git
   cd billion-universe
   npm install
   cp .env.example .env.local
   ```
2. **Run locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000). Use **Dashboard** for the signal feed and feedback.

3. **Read the product context**
   - [README.md](README.md) — vision, quick start, structure.
   - [docs/ROADMAP.md](docs/ROADMAP.md) — MVP1/2/3 and iteration.
   - [docs/STARTUP_PLAYBOOK.md](docs/STARTUP_PLAYBOOK.md) — GitHub, hiring, funding, customers.

---

## Workflow

- **Branch:** Create a branch from `main` (e.g. `feature/feedback-db`, `fix/signal-filter`).
- **Code:** Follow existing patterns in `src/` (App Router, TypeScript, Tailwind). Keep components and API routes small and testable.
- **Commit:** Clear messages; reference issue numbers when relevant (`Fixes #12`).
- **PR:** Open a pull request into `main`. Fill in the PR template. Ensure:
  - `npm run typecheck` passes
  - `npm run lint` passes
  - `npm run build` succeeds
- **Review:** Someone will review; address comments and then we merge.

---

## Where to put things

| You’re adding…           | Put it in…                          |
|--------------------------|--------------------------------------|
| New page or route        | `src/app/` (e.g. `src/app/settings/`) |
| Reusable UI              | `src/components/`                   |
| Shared types             | `src/types/`                        |
| API endpoint             | `src/app/api/` (e.g. `api/signals/`) |
| Product/ops documentation| `docs/`                             |

---

## Feedback and roadmap

- User and design-partner feedback is triaged into **bugs**, **features**, and **content** and tracked in GitHub Issues (and optionally in our backlog).
- Prioritization follows [docs/ROADMAP.md](docs/ROADMAP.md) and customer conversations; we iterate in the open via issues and PRs.

If you have questions, open an issue or reach out to the maintainers.
