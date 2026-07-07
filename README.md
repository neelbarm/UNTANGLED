# 80-Day Operating System

A personal challenge dashboard for **Neel Barmecha** — a founder + student running an
80-day, four-goal sprint in public and documenting it as Instagram Reels.

Four goals, one system:

- **Body** — lose 10 lbs through consistent, non-medical habits.
- **Trading** — pursue a trading target through prop firms with a focus on process,
  discipline, journaling, and risk management (never hype or signals).
- **Career** — break into venture / startups / AI through proof-of-work and networking.
- **Apartment** — move into an apartment in New York City.

The app renders the full operating system — master plan, weekly schedule, daily
checklist, content strategy, and per-goal systems — and is **interactive where it
counts**: the daily checklist, trackers, trading scorecard, apartment options, and
weekly reviews all persist in your browser (localStorage). No backend, no accounts.

> This app is a general habit/accountability tracker. It is **not medical or
> financial advice**, contains no clinical guidance, and gives no trade signals.

## Tabs

| Tab | What it does |
| --- | --- |
| **Today** | Day X of 80, a checkable daily flow, the daily non-negotiables + trackers |
| **Plan** | The 80-day master plan in weekly themes and phases |
| **Flow** | The daily flow template (no clock times) + the week's fixed anchors |
| **Content** | Pillars, hooks, series, and a 30+ Reel idea bank (filterable by goal) |
| **Career** | VC/AI job-search system: outreach, applications, proof-of-work |
| **Apartment** | NYC hunt system + an interactive options tracker |
| **Body** | Non-medical habit system for the 10-lb goal |
| **Trading** | Process/discipline framework + an interactive daily scorecard |
| **Review** | The Sunday weekly review + reset (saved per week) |
| **Reference** | Sample Day-One Reel script, weekly scorecard, and Notion structure |

## Tech

- [Vite](https://vitejs.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- localStorage for persistence (single-user, no server)

## Run locally

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Deploy

Any static host works. For [Vercel](https://vercel.com), the included `vercel.json`
sets the Vite preset — connect the repo and deploy, or run `vercel` from the project
root.
