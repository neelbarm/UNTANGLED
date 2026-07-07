// Trading DISCIPLINE framework — high-level and process-based only. This is not
// financial advice and contains no signals, no strategies, no "get rich quick"
// anything. It's an accountability system for behavior: checklists, risk rules,
// journaling, and emotional control. The number follows the process, or it
// doesn't come at all.

export const TRADING_DISCLAIMER =
  'Not financial advice. This is a personal discipline and journaling framework — no trade signals, strategies, or return guarantees. Trading futures through prop firms carries real risk of loss. The goal here is process and risk control, never hype or gambling. Only risk what you can afford to lose.'

export const TRADING_THESIS =
  'The $25k target is an output. The only inputs you control are: follow the checklist, respect the risk limits, journal everything, and stay emotionally flat. Grade yourself on discipline daily — the P&L is a lagging indicator of behavior.'

export const PRE_MARKET_CHECKLIST = [
  'Sleep + state check: am I rested and calm enough to trade well today? If not, size down or sit out.',
  'Review the trading plan and today\'s max-risk limits before opening any chart.',
  'Mark the key levels and define what a valid setup looks like — decisions made before emotion arrives.',
  'Write today\'s single intention (e.g. "only A+ setups, walk after max loss").',
  'Confirm risk-per-trade and max daily loss are set and non-negotiable.',
  'No position until every box above is checked.',
]

export const POST_MARKET_REVIEW = [
  'Screenshot and log every trade — entry, exit, reason, and a process grade.',
  'Did I follow every rule? Mark each break honestly (breaks matter more than losses).',
  'What repeated today — a good habit to reinforce or a leak to cut?',
  'Best decision of the day and worst decision of the day (decision, not outcome).',
  'One specific adjustment for tomorrow. Just one.',
  'Update the daily scorecard and the weekly rules-followed streak.',
]

export const EMOTIONAL_PROMPTS = [
  'Am I about to trade the plan, or trade a feeling?',
  'Would I take this trade if I were already up for the day? If not, why now?',
  'This is the trade right after a loss — is it a setup or revenge? If unsure, skip it.',
  'Have I hit my max loss? If yes, I\'m done. The rule protects tomorrow\'s me.',
  'Am I sizing up because of confidence or because of FOMO?',
  'Can I walk away right now and be at peace with today\'s process? If not, stop and reset.',
]

export const MAX_RISK_RULES = [
  'Fixed risk per trade — a small, constant percentage. Never "just this once" bigger.',
  'Hard max daily loss. Hit it and the platform closes for the day — no exceptions.',
  'A cap on number of trades per session to prevent overtrading.',
  'No revenge trade after a loss. Mandatory reset before the next entry.',
  'No trading when tired, tilted, or rushed (e.g. squeezing one in before class).',
  'Respect every prop-firm rule as a hard constraint, not a suggestion.',
  'Green days don\'t unlock bigger risk. The rules don\'t change with the P&L.',
  '7 evaluations, one plan: take the SAME setup on every account. Never over-risk one eval to "catch up" another.',
]

// Fields for the interactive daily trading scorecard (persisted per day).
export interface TradingScorecard {
  followedPlan: number // 1-10 self-grade on process
  ruleBreaks: number // count
  journaled: boolean
  maxLossRespected: boolean
  emotionalState: number // 1-10 (calm=10)
  bestDecision: string
  worstDecision: string
  lessonTomorrow: string
}

export const SHAREABLE_TRADING_CONTENT = {
  do: [
    'Show the pre-market checklist and the discipline routine.',
    'Show the trade you DIDN\'T take and why (process wins).',
    'Show hitting a max-loss rule and walking away.',
    'Show the journaling process and your rules-followed % — behavior, not bankroll.',
    'Explain what a prop-firm evaluation actually is, plainly and honestly.',
    'Talk about emotional control and the mental game.',
  ],
  dont: [
    'Never post P&L screenshots as flex or bait.',
    'Never give signals, entries, or "copy my trades."',
    'Never promise returns, income, or "financial freedom."',
    'Never frame trading as easy, guaranteed, or a shortcut.',
    'Never hide losses to look better — that\'s the fake stuff people smell.',
    'Never give anyone financial advice. Share your process, not prescriptions.',
  ],
}
