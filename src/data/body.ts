// Habit system for the 10-lb goal. Deliberately GENERAL and NON-MEDICAL:
// consistency, tracking, and routine — not diets, supplements, or clinical
// advice. The whole strategy is boring habits repeated for 60 days.

export const BODY_DISCLAIMER =
  'This is a general, habit-based accountability system — not medical, nutritional, or clinical advice. It tracks routines and consistency only. For anything health-related (nutrition plans, training safety, weight targets), talk to a qualified professional.'

export const BODY_THESIS =
  'Ten pounds in 60 days is a consistency problem, not a willpower problem. You don\'t need a perfect plan — you need the same repeatable habits logged every day and a trend line that points down.'

export const BODY_HABITS = [
  {
    name: 'Daily weigh-in',
    how: 'Same time each morning, same conditions, logged immediately.',
    why: 'You manage what you measure. Watch the weekly trend, never the daily noise.',
  },
  {
    name: 'Meal consistency',
    how: 'A few repeatable, protein-forward meals you can hit on autopilot — even on class days.',
    why: 'Consistency beats optimization. Removing daily food decisions removes daily failure points.',
  },
  {
    name: 'Workouts',
    how: '5 training days/week at a fixed time (early, before the market open), plus one longer weekend session.',
    why: 'A scheduled workout is a kept promise. Same time daily makes it non-negotiable.',
  },
  {
    name: 'Sleep',
    how: 'Same lights-out time nightly; protect the window before a 5am wake.',
    why: 'Sleep is the foundation under every other habit. Bad sleep breaks the whole day.',
  },
  {
    name: 'Steps',
    how: 'A daily step floor (8–10k), largely from the commute — stairs over escalators, walk the transfers.',
    why: 'Free, low-effort daily movement that compounds without eating into work time.',
  },
  {
    name: 'Accountability',
    how: 'Post the weigh-in trend and habit streak publicly in the weekly Scoreboard.',
    why: 'Public tracking makes skipping expensive. The audience is the accountability partner.',
  },
]

export const BODY_DAILY_TRACK = [
  'Weight (logged, same time)',
  'Trained today? (yes/no)',
  'Meals on plan? (yes/no)',
  'Protein target hit? (yes/no)',
  'Steps (vs. floor)',
  'Hours of sleep',
  'In bed on time? (yes/no)',
]

export const BODY_ACCOUNTABILITY = [
  'Log the weigh-in every morning without judgment — data, not drama.',
  'Review the 7-day and 30-day weight trend each Sunday, not the daily number.',
  'Keep a visible "habit streak" for training days and on-plan days.',
  'Share the trend line publicly each week — honesty (including plateaus) builds trust.',
  'If a day slips, log it honestly and reset the next morning. Never let one miss become three.',
]
