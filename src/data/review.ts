// The Sunday weekly review — the reset ritual that makes the whole system
// self-correcting. Rendered as an interactive form saved per week.

export const REVIEW_THESIS =
  'One honest hour every Sunday is what separates an 80-day system from an 80-day mood. You score the week, face the misses, and pre-decide next week so Monday runs itself.'

export interface WeeklyReview {
  weekNumber: number
  // Scores 1-10 per goal
  bodyScore: number
  tradingScore: number
  careerScore: number
  apartmentScore: number
  contentScore: number
  // Reflection
  biggestWin: string
  biggestMiss: string
  ruleBrokenMost: string
  oneThingToFix: string
  nextWeekPriority: string
}

export const REVIEW_PROMPTS = [
  { key: 'bodyScore', label: 'Body — habits & consistency', type: 'score' as const },
  { key: 'tradingScore', label: 'Trading — discipline & rules followed', type: 'score' as const },
  { key: 'careerScore', label: 'Career — outreach, building, shipping', type: 'score' as const },
  { key: 'apartmentScore', label: 'Apartment — progress toward the lease', type: 'score' as const },
  { key: 'contentScore', label: 'Content — posted, consistent, improving', type: 'score' as const },
  { key: 'biggestWin', label: 'Biggest win this week', type: 'text' as const },
  { key: 'biggestMiss', label: 'Biggest miss this week', type: 'text' as const },
  { key: 'ruleBrokenMost', label: 'Which rule/habit did I break most?', type: 'text' as const },
  { key: 'oneThingToFix', label: 'The ONE thing I\'m fixing next week', type: 'text' as const },
  { key: 'nextWeekPriority', label: 'Next week\'s #1 priority', type: 'text' as const },
]

export const SUNDAY_RESET_STEPS = [
  'Pull every number: weight trend, rules-followed %, outreach sent, apartments seen, Reels posted.',
  'Score all four goals + content honestly, 1–10.',
  'Name one win and one miss out loud (and on camera for the Scoreboard Reel).',
  'Pick the single biggest leak and design the fix into next week\'s schedule.',
  'Pre-plan the week: outreach targets, applications, viewings, and 7 Reel hooks.',
  'Batch-film 2–3 Reels so busy days can\'t break the streak.',
  'Reset trackers and set Monday\'s intention. Start the week already ahead.',
]
