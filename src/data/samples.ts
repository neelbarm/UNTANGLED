// The three requested samples: a Day-One Reel script, a filled weekly scorecard,
// and a Notion dashboard structure. Rendered read-only in the Reference tab.

export const DAY_ONE_SCRIPT = {
  title: 'Day 1 of 60 — The Manifesto Reel',
  runtime: '~30–40 seconds',
  format: 'You to camera, high energy but controlled. Big on-screen text: "DAY 1 / 60".',
  beats: [
    { t: '0:00', direction: 'Cold open, direct eye contact, no intro.', line: '"Day one of sixty. I\'m doing four things most people wouldn\'t attempt at once — on camera, in public, starting right now."' },
    { t: '0:06', direction: 'Cut to quick b-roll of each as you name it (gym, charts, laptop, NYC skyline).', line: '"Lose ten pounds. Learn to trade with real discipline through prop firms. Break into venture and AI. And move to New York City."' },
    { t: '0:16', direction: 'Back to camera, lean in, slower.', line: '"No hype. No get-rich-quick. Just a system — habits, checklists, and a scoreboard you\'ll see every single week."' },
    { t: '0:24', direction: 'Hold up phone showing the dashboard / Notion.', line: '"This is the operating system I built to run all four at once, using AI as leverage. I\'ll show you the whole thing."' },
    { t: '0:31', direction: 'Final line, dead serious, then cut to black on the countdown.', line: '"Sixty days. Four goals. Follow the scoreboard — and hold me to it. Day one starts now."' },
  ],
  caption:
    'Day 1 of 60. Four goals, in public, no hype: lose 10 lbs, trade with discipline, break into VC/AI, move to NYC. I\'ll post the scoreboard every week. Follow so you can hold me to it. 👇 Which goal do you want to see first?',
  postingNotes: [
    'Pin this as the "start here" Reel so new followers can binge the arc.',
    'Keep the countdown graphic consistent — it becomes the account\'s signature.',
    'Reply to every early comment on camera to seed the community fast.',
  ],
}

export const SAMPLE_SCORECARD = {
  week: 'Week 4 (Days 22–28)',
  goals: [
    { goal: 'Body', score: 8, metric: 'Down 1.2 lbs (−4.3 total). 5/5 gym. Steps floor hit 6/7.', trend: 'On track' },
    { goal: 'Trading', score: 9, metric: 'Rules followed 6/7 days. 1 rule break (revenge trade, logged). Journaled every trade.', trend: 'Discipline strong' },
    { goal: 'Career', score: 7, metric: '18 outreach, 4 applications, 3 calls booked, shipped 1 MVP feature.', trend: 'Pipeline building' },
    { goal: 'Apartment', score: 6, metric: '4 viewings, 2 finalists, commute tested on 1. Docs ready.', trend: 'Slightly behind' },
    { goal: 'Content', score: 8, metric: '7/7 Reels posted. Scoreboard Reel was top performer. Batching working.', trend: 'Consistent' },
  ],
  biggestWin: 'Held my max-loss rule on a red day and walked away — filmed it, best-performing Reel of the week.',
  biggestMiss: 'One revenge trade after a loss. Caught it, journaled it, installing a mandatory 5-min reset.',
  oneThingToFix: 'Apartment is lagging — moving viewings to Saturday mornings to protect weekday focus.',
  nextWeekPriority: 'Push apartment to 2 second-round viewings and lock a top choice.',
}

export const NOTION_DASHBOARD = {
  intro:
    'A simple Notion structure that mirrors this app — one command center page with linked databases. Copy this layout to run the challenge outside the app or as your backup source of truth.',
  topLevel: [
    {
      name: '🎯 60-Day Command Center (home page)',
      children: [
        'Countdown callout: "Day X / 60" + start date',
        'This week\'s theme + top priority',
        'Four goal-progress bars (linked rollups)',
        'Quick links to every database below',
      ],
    },
  ],
  databases: [
    {
      name: '📆 Daily Log',
      props: ['Date', 'Challenge Day', 'Weight', 'Trained?', 'Meals on plan?', 'Steps', 'Sleep hrs', 'Rules followed?', 'Trade journaled?', 'Reel posted?', 'Notes'],
      views: ['Today (filter: date = today)', 'This week (board by day)', 'Weight trend (line chart on Weight)'],
    },
    {
      name: '📈 Trading Journal',
      props: ['Date', 'Setup grade (A/B/C)', 'Followed plan (1-10)', 'Rule breaks', 'Emotional state (1-10)', 'Best decision', 'Worst decision', 'Lesson', 'Screenshot'],
      views: ['This week', 'Rule breaks (filter > 0)', 'Discipline over time'],
    },
    {
      name: '💼 Career Pipeline',
      props: ['Name/Company', 'Type (VC/Founder/Builder/Community)', 'Status (Researching→Outreach→Call→Opportunity)', 'Last touch', 'Next action', 'Notes'],
      views: ['By status (board)', 'Follow-ups due', 'This week\'s outreach'],
    },
    {
      name: '🏙️ Apartment Tracker',
      props: ['Address', 'Neighborhood', 'Rent', 'Total move-in cost', 'Commute', 'Score (1-10)', 'Status', 'Next action', 'Notes'],
      views: ['By status (board)', 'Top scored', 'Viewings this week'],
    },
    {
      name: '🎬 Content Calendar',
      props: ['Post date', 'Series', 'Goal/Pillar', 'Hook', 'Filmed?', 'Edited?', 'Posted?', 'Performance'],
      views: ['This week (calendar)', 'To film (filter: Filmed = no)', 'Best performers'],
    },
    {
      name: '🔄 Weekly Reviews',
      props: ['Week #', 'Body', 'Trading', 'Career', 'Apartment', 'Content', 'Biggest win', 'Biggest miss', 'One fix', 'Next priority'],
      views: ['All weeks (table)', 'Score trend across weeks'],
    },
  ],
}
