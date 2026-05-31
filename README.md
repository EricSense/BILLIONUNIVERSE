# Billion Universe

**Multi-system intelligence platform** — maps how complex systems interact.

## Product features

| Route | Feature |
|-------|---------|
| `/signals` | Live cross-system feed with polling, filters, cascade analysis |
| `/signals/[id]` | Signal detail + graph + link to scenario engine |
| `/scenarios` | Parallel scenario branches — save & reload scenarios |
| `/graph` | Interactive system graph — click nodes to filter signals |
| `/watchlists` | Alert rules on system intersections |
| `/sources` | Data connector health & ingestion status |

## APIs

- `GET /api/signals` — filtered signals + live overlay
- `GET /api/signals/[id]`
- `GET /api/systems`
- `GET /api/sources`
- `POST /api/scenarios/simulate`

## Development

```bash
npm install
npm run dev
```

## Deploy

- **GitHub:** https://github.com/EricSense/BillionUniverse
- **Production:** https://billion-universe.vercel.app

## Architecture

```
src/
├── app/           # Pages + API routes
├── components/    # Product UI
└── lib/
    ├── data/      # Signals, systems, sources, live overlay
    ├── alerts/    # Watchlist evaluation engine
    ├── storage/   # Client persistence (watchlists, scenarios)
    └── scenario-engine.ts
```
