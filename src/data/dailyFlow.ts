import type { FlowPhase } from './types'

// The daily flow — one day-agnostic checklist Neel works through and ticks off,
// with NO clock times. Ordered by natural, event-based phases (not the clock).
// Items are phrased so they hold every day: on weekends/class days you just
// leave the non-applicable ones (e.g. trading on market days) unchecked.

export const DAILY_FLOW: FlowPhase[] = [
  {
    phase: 'Morning',
    items: [
      { id: 'wake-weigh', label: 'Wake at target time + weigh-in', goal: 'Body', note: 'Same wake time anchors the day' },
      { id: 'train', label: 'Gym / movement', goal: 'Body' },
      { id: 'breakfast', label: 'Protein breakfast, on plan', goal: 'Body' },
      { id: 'film-morning', label: 'Film one quick clip', goal: 'Meta', note: 'Capture first, edit later' },
    ],
  },
  {
    phase: 'Market Open',
    items: [
      { id: 'premarket', label: 'Pre-market checklist — mark levels, set risk', goal: 'Trading', note: 'Market days' },
      { id: 'trade', label: 'Trade the open — rules only, journal every trade', goal: 'Trading', note: 'Market days' },
      { id: 'postmarket', label: 'Post-market review + film the discipline', goal: 'Trading', note: 'Market days' },
    ],
  },
  {
    phase: 'Midday / Build',
    items: [
      { id: 'build', label: 'Deep work: move an MVP / project forward', goal: 'Career' },
      { id: 'learn', label: 'Study gen-AI, capture one sharable insight', goal: 'Career' },
      { id: 'outreach', label: 'Job search: outreach messages + 1 application', goal: 'Career' },
      { id: 'apartment', label: 'Apartment task: search, book a viewing, or follow up', goal: 'Apartment' },
      { id: 'steps', label: 'Hit the step floor (commute counts)', goal: 'Body' },
    ],
  },
  {
    phase: 'Evening',
    items: [
      { id: 'post', label: 'Edit + post the Reel, reply to comments', goal: 'Meta' },
      { id: 'meals-check', label: 'Meals on plan + protein hit (whole day)', goal: 'Body' },
      { id: 'plan-tomorrow', label: "Plan tomorrow's top 3 + set the intention", goal: 'Meta' },
      { id: 'winddown', label: 'Wind down, protect the sleep window', goal: 'Body' },
    ],
  },
]

// The real fixed rhythm of the week, captured as anchors (no clock times).
export const WEEKLY_ANCHORS: string[] = [
  'Gym + weigh-in every morning — same wake time all 60 days.',
  'Trade the NY market open on market days — never after a class-day cutoff or when tilted.',
  'Classes Tue / Wed / Fri — trade the open, cut it clean, then campus.',
  'Batch-film 2–3 Reels midweek (and Saturday) to stay ahead of busy days.',
  'Apartment viewings cluster on weekends when availability is best.',
  'Sunday is the reset — weekly review, plan the week, prep meals + 7 hooks.',
]

// A light per-weekday context note shown on the Today hero — realism without
// dictating times. Keyed by lowercase short weekday ('mon', 'tue', ...).
export const DAY_CONTEXT: Record<string, string> = {
  mon: 'Build day — set the week: trade, build, outreach.',
  tue: 'Class day — trade the open, then campus.',
  wed: 'Class day — midweek discipline check + batch-film.',
  thu: 'Build day — full build + trade, push output.',
  fri: 'Class day — close the trading week clean.',
  sat: 'Long-game day — viewings, deep build, batch content.',
  sun: 'Reset day — weekly review and plan the win.',
}
