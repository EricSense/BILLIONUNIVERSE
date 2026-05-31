# Billion Universe

**Multi-system intelligence platform** — maps how complex systems interact across macro economy, supply chain, energy, political, and technology systems.

## Product (not a landing page)

| Route | Feature |
|-------|---------|
| `/signals` | **MVP 1** — Cross-system signal feed with cascade analysis |
| `/signals/[id]` | Signal detail + system graph |
| `/scenarios` | **MVP 2 beta** — Parallel scenario simulation engine |
| `/graph` | System intersection graph + coupling strengths |
| `/api/signals` | Signals API with filters |
| `/api/scenarios/simulate` | Scenario simulation API |

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 (redirects to `/signals`).

## Deploy

Connected to [GitHub](https://github.com/EricSense/BillionUniverse) and [Vercel](https://billion-universe.vercel.app). Push to `main` to deploy.

## Architecture

```
src/
├── app/              # Next.js App Router pages + API
├── components/       # UI: signal feed, scenario simulator, graph
└── lib/
    ├── data/         # Systems, signals (swap for DB later)
    ├── scenario-engine.ts
    └── types.ts
```

## Roadmap

1. **Signals** — Live data ingestion, watchlists, alerts *(in progress)*
2. **Scenarios** — LLM-backed cascade modeling, saved scenarios
3. **Graph** — Real-time knowledge graph, team collaboration
