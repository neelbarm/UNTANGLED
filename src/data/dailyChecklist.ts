import type { ChecklistItem } from './types'

// The repeatable challenge-day checklist. This is the daily minimum that keeps
// all four goals moving AND guarantees content gets made. Same list every day —
// the discipline is in the repetition. Rendered on the "Today" tab with
// per-day persistent checkboxes.

export const DAILY_CHECKLIST: ChecklistItem[] = [
  // Body
  { id: 'wake', label: 'Woke at target time', goal: 'Body', detail: 'Same wake time anchors the whole day' },
  { id: 'weigh', label: 'Weigh-in logged', goal: 'Body', detail: 'Same time, same conditions — track the trend, not the day' },
  { id: 'train', label: 'Trained / moved (gym or conditioning)', goal: 'Body' },
  { id: 'meals', label: 'Meals on plan + protein hit', goal: 'Body', detail: 'Consistency > perfection' },
  { id: 'steps', label: 'Step floor hit (commute counts)', goal: 'Body' },
  { id: 'sleep', label: 'In bed on time / protected sleep window', goal: 'Body' },

  // Trading
  { id: 'premarket', label: 'Pre-market checklist done before any trade', goal: 'Trading' },
  { id: 'rules', label: 'Followed my rules — no rule breaks', goal: 'Trading', detail: 'The only trading metric that matters daily' },
  { id: 'journal', label: 'Every trade journaled with screenshots', goal: 'Trading' },
  { id: 'postmarket', label: 'Post-market review written', goal: 'Trading' },

  // Career
  { id: 'outreach', label: 'Outreach / networking touches sent', goal: 'Career', detail: 'Even 3 messages compounds over 60 days' },
  { id: 'build', label: 'Moved a build/portfolio project forward', goal: 'Career' },
  { id: 'learn', label: 'Studied gen-AI / learned something sharable', goal: 'Career' },

  // Apartment
  { id: 'apartment', label: 'Apartment task done (search, viewing, or follow-up)', goal: 'Apartment' },

  // Meta / content
  { id: 'film', label: 'Filmed at least one clip', goal: 'Meta', detail: 'Capture first, edit later' },
  { id: 'post', label: 'Posted the Reel + replied to comments', goal: 'Meta' },
]
