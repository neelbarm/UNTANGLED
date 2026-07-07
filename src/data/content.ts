import type { ContentPillar, ReelIdea, Series } from './types'

// ---------------------------------------------------------------------------
// CONTENT STRATEGY
// The account is one story: a young founder publicly running a 60-day system to
// change his body, his trading discipline, his career, and his address — using
// AI tools the whole way. High-agency, disciplined, aspirational, but real.
// ---------------------------------------------------------------------------

export const ACCOUNT_PROMISE =
  'Follow a young founder run a 60-day operating system in public: lose 10 lbs, trade with real discipline, break into VC/AI, and move to NYC — no hype, just receipts.'

export const CONTENT_PILLARS: ContentPillar[] = [
  {
    name: 'The Grind (Body)',
    goal: 'Body',
    promise: 'Discipline you can see — 5am alarms, weigh-ins, and boring consistency winning.',
    examples: ['5am gym before the market opens', 'The same breakfast that keeps me on plan', 'Step-count on a subway commute'],
  },
  {
    name: 'The Desk (Trading)',
    goal: 'Trading',
    promise: 'Process over profit — checklists, journaling, and risk rules, never signals or hype.',
    examples: ['My pre-market checklist', 'Following my rules when it hurts', 'Why I stopped after one loss'],
  },
  {
    name: 'The Build (Career)',
    goal: 'Career',
    promise: 'Proof-of-work in public — shipping MVPs, learning gen-AI, and getting in the room.',
    examples: ['Shipping an MVP in a weekend', 'A teardown of a startup I love', 'Cold outreach that actually got a reply'],
  },
  {
    name: 'The Move (Apartment)',
    goal: 'Apartment',
    promise: 'The real, unglamorous path to an NYC apartment — budgets, viewings, and paperwork.',
    examples: ['NYC apartment viewings, rated honestly', 'What moving to NYC actually costs', 'Neighborhood recon'],
  },
  {
    name: 'The System (Meta)',
    goal: 'Meta',
    promise: 'The operating system itself — how I run four goals at once with AI as leverage.',
    examples: ['My weekly scoreboard reveal', 'How I use AI to run my day', 'The Notion dashboard behind the challenge'],
  },
]

export const STORYLINES = [
  {
    name: 'The Public Scoreboard',
    arc: 'Every week you show the numbers — weight trend, rules-followed %, outreach sent, apartments seen. The audience watches a real scoreboard move. Suspense is built in: will he hit all four?',
  },
  {
    name: 'The Underdog Founder',
    arc: 'Limited time, student + founder, doing what most people say is impossible to juggle. Every "how do you even have time" comment is fuel and a content prompt.',
  },
  {
    name: 'Discipline vs. Temptation',
    arc: 'Recurring tension: the 5am alarm, the trade you want to take but shouldn\'t, the night out vs. the build. You win most, lose some honestly, and narrate the choice.',
  },
  {
    name: 'AI as Unfair Advantage',
    arc: 'You use AI tools to move faster than someone should be able to — planning, building, studying, editing. The account itself becomes a case study in leverage.',
  },
  {
    name: 'The Countdown to NYC',
    arc: 'A literal geographic goal with a deadline. Day 1 you\'re planning; by Day 60 you\'re filming your first night in the apartment. Everyone wants to see if you make it.',
  },
]

export const HOOKS = [
  'Day {N} of 60. Here\'s the scoreboard.',
  'I\'m trying to do 4 impossible things in 60 days. Here\'s today.',
  'It\'s 5am and I don\'t want to. Let\'s go anyway.',
  'I almost broke my #1 trading rule today.',
  'Everyone said I couldn\'t trade, build, and get shredded at once.',
  'This is what building an MVP before 9am looks like.',
  'I sent 50 cold messages. Here\'s the one that worked.',
  'NYC apartment hunting is brutal. Watch this.',
  'I lost on the first trade. Here\'s why I still won today.',
  'The habit nobody claps for is the one that changes everything.',
  'Give me 30 seconds and I\'ll show you my entire system.',
  'Most people quit at day 12. Here\'s how I don\'t.',
  'I use AI to do a full day of work in 3 hours. Here\'s how.',
  'Rate my discipline: 5am gym, market open, class, ship, post.',
  'Halfway through. Here\'s what\'s actually working and what\'s not.',
  'The trade I DIDN\'T take is the reason I\'m still green.',
  'Broke founder energy: how I\'m affording to move to NYC.',
  'You\'re watching someone change their life in real time.',
]

export const CAPTION_FORMULAS = [
  'Hook line → one honest sentence → the metric → a question that begs a comment. ("Day 14. Down 3 lbs, followed my rules 5/5 days, 2 apartments seen. What would you cut first?")',
  'Contrarian truth + proof. ("Discipline isn\'t motivation, it\'s a schedule. Here\'s mine at 5am.")',
  'Vulnerable admission + lesson. ("I broke a rule today and it cost me. Here\'s the fix I\'m installing.")',
  'Numbered list in the caption for saves. ("3 things I do every market open: 1) ... 2) ... 3) ...")',
  'Cliffhanger to next post. ("Tomorrow I find out if I got the apartment. Follow so you don\'t miss it.")',
  'Direct CTA to follow the journey. ("60-day challenge, all 4 goals in public. Day {N}. Follow the scoreboard.")',
]

export const SERIES: Series[] = [
  {
    name: '5am to Market Open',
    cadence: 'Most weekdays',
    format: 'Fast-cut POV from alarm → gym → commute → pre-market checklist → the bell.',
    why: 'A repeatable, recognizable format viewers can expect daily. Builds habit-viewing.',
  },
  {
    name: 'The Scoreboard',
    cadence: 'Weekly (Sunday)',
    format: 'You on camera revealing the week\'s four numbers + one win, one miss.',
    why: 'Serialized suspense. People return to see if the numbers moved. The spine of the account.',
  },
  {
    name: 'Rules I Didn\'t Break',
    cadence: '2–3x/week',
    format: 'A trading moment where discipline was tested; you narrate the decision, not the P&L.',
    why: 'Positions you as process-driven and responsible — never signals or hype.',
  },
  {
    name: 'Ship Before 9',
    cadence: '2x/week',
    format: 'Screen-record + voiceover of a feature/MVP built with AI before the market opens.',
    why: 'Proof-of-work that makes you look hireable to VC/startup/AI audiences.',
  },
  {
    name: 'Rate This Apartment',
    cadence: 'When viewing',
    format: 'Walk-through with an on-screen scorecard (price, commute, light, vibe).',
    why: 'Interactive + niche-NYC — invites comments and follows from people doing the same hunt.',
  },
  {
    name: 'AI Did This',
    cadence: 'Weekly',
    format: 'One task you offloaded to AI that saved hours — planning, editing, research, code.',
    why: 'Makes the "AI as unfair advantage" thesis concrete and shareable.',
  },
]

export const ADDICTIVE_MECHANICS = [
  'Number the days on screen ("Day 23/60") — a visible countdown creates completion pressure to keep watching.',
  'End each Reel with a one-line teaser for tomorrow so the next post is pre-sold.',
  'Run the weekly Scoreboard as appointment content — same day, same format, real numbers.',
  'Let the audience vote: "Which goal should I prioritize this week?" — participation = retention.',
  'Track a public streak (rules-followed days, gym days). Streaks are inherently suspenseful.',
  'Show real losses and misses, not just wins — honesty is the retention engine most creators skip.',
  'Pin a "start here — Day 1" Reel so new followers binge the arc from the beginning.',
  'Reply to comments on camera; turn the best questions into the next Reel.',
  'Create a signature phrase/sign-off so regulars feel part of an inside group.',
  'Tease the finale from the start: "In 60 days I\'ll either move to NYC or not. Watch."',
]

// ---------------------------------------------------------------------------
// 30+ SPECIFIC REEL IDEAS drawn from Neel's actual life (not generic filler).
// ---------------------------------------------------------------------------

export const REEL_IDEAS: ReelIdea[] = [
  // Meta / brand
  { id: 1, goal: 'Meta', title: 'The Day 1 Manifesto', hook: 'Day 1 of 60. Four impossible goals. On the record.', film: 'You to camera, dead serious, listing the four goals with the countdown on screen.', caption: 'Publishing my goals so I can\'t hide. Day 1/60. Follow the scoreboard.', series: 'The Scoreboard' },
  { id: 2, goal: 'Meta', title: 'The Whole System in 30 Seconds', hook: 'Give me 30 seconds and I\'ll show you how I run 4 goals at once.', film: 'Screen-record of your Notion/dashboard + fast cuts of each goal in action.', caption: 'The operating system behind the challenge. Save this.', series: 'The System' },
  { id: 3, goal: 'Meta', title: 'The Weekly Scoreboard Reveal', hook: 'Week 3 scoreboard. No spin.', film: 'You revealing the four numbers on a whiteboard/screen, one win + one miss.', caption: 'The numbers don\'t care about excuses. Which one should I fix first?', series: 'The Scoreboard' },
  { id: 4, goal: 'Meta', title: '5am to Market Open POV', hook: 'It\'s 5am and I don\'t want to. Watch anyway.', film: 'POV fast-cut: alarm → gym → subway → desk → the 9:30 bell.', caption: 'The two hours that decide the whole day.', series: '5am to Market Open' },
  { id: 5, goal: 'Meta', title: 'How I Use AI to Compress My Day', hook: 'I do a full day of work in 3 hours. Here\'s the stack.', film: 'Screen-record walking through the AI tools you use for planning, building, editing.', caption: 'AI is leverage, not a shortcut. Here\'s how I actually use it.', series: 'AI Did This' },
  { id: 6, goal: 'Meta', title: 'Day in the Life: Class Day', hook: 'Trade, class, build, post — all before dinner.', film: 'Time-stamped montage of a Tuesday from 5am to lights-out.', caption: 'People ask how I have time. I don\'t — I have a system.', series: '5am to Market Open' },
  { id: 7, goal: 'Meta', title: 'Reading My Comments On Camera', hook: '"You\'ll quit by day 12." Let\'s talk about that.', film: 'You reacting to real comments, answering the doubters honestly.', caption: 'Every doubt is a rep. Keep them coming.', series: 'The System' },
  { id: 8, goal: 'Meta', title: 'The Halfway Honesty Check', hook: '30 days in. Here\'s what\'s working and what\'s failing.', film: 'Raw, unedited-feel talk to camera with the real mid-point numbers.', caption: 'Halfway. Two goals on track, two behind. Full breakdown.', series: 'The Scoreboard' },

  // Body
  { id: 9, goal: 'Body', title: 'The Weigh-In Ritual', hook: 'Same time, same scale, every single day.', film: 'Quick clip of the morning weigh-in + logging it in the app.', caption: 'You can\'t improve what you don\'t track. Trend > day.', series: '5am to Market Open' },
  { id: 10, goal: 'Body', title: 'The Breakfast That Runs My Day', hook: 'The same boring breakfast that keeps me on plan.', film: 'Fast prep of your repeatable high-protein breakfast.', caption: 'Consistency isn\'t exciting. That\'s why it works.' },
  { id: 11, goal: 'Body', title: 'Gym Before the Bell', hook: 'Lifting at 5:30 so I\'m sharp for the open.', film: 'Gym montage with the clock visible, ending as you head to trade.', caption: 'Train the body, then trade the mind.', series: '5am to Market Open' },
  { id: 12, goal: 'Body', title: 'Getting Steps on the Subway Commute', hook: 'I hit 10k steps without a single "workout walk."', film: 'POV of walking the commute, stairs over escalators, step counter overlay.', caption: 'NYC is a step machine if you let it.' },
  { id: 13, goal: 'Body', title: 'The Sleep Rule Nobody Respects', hook: 'The habit that fixed everything: lights out at the same time.', film: 'Evening shutdown routine, phone away, same bedtime.', caption: 'Discipline at night is why 5am works.' },
  { id: 14, goal: 'Body', title: 'Down X Pounds — The Trend Line', hook: 'Here\'s 3 weeks of weigh-ins on one chart.', film: 'Screen-record of the weight trend graph moving down.', caption: 'No crash tactics. Just habits stacked daily.', series: 'The Scoreboard' },
  { id: 15, goal: 'Body', title: 'Eating on a Class Day', hook: 'How I stay on plan when I\'m on campus all day.', film: 'What you pack/buy to stay consistent between classes.', caption: 'Convenience is the enemy of consistency. Plan around it.' },

  // Trading
  { id: 16, goal: 'Trading', title: 'My Pre-Market Checklist', hook: 'I never take a trade before this checklist is done.', film: 'Screen-record of your pre-market checklist + marking levels.', caption: 'Process first. The setup can wait 5 minutes.', series: 'Rules I Didn\'t Break' },
  { id: 17, goal: 'Trading', title: 'The Trade I Didn\'t Take', hook: 'The best trade today was the one I skipped.', film: 'Chart replay showing a tempting setup that failed your rules.', caption: 'Discipline is a series of things you don\'t do.', series: 'Rules I Didn\'t Break' },
  { id: 18, goal: 'Trading', title: 'Hit My Max Loss — Walking Away', hook: 'I hit my daily loss limit. Watch what I do next.', film: 'You closing the laptop, walking out, narrating the rule.', caption: 'The rule only works if you honor it on the bad days.', series: 'Rules I Didn\'t Break' },
  { id: 19, goal: 'Trading', title: 'How I Journal Every Trade', hook: 'Every trade gets a screenshot and a grade — win or lose.', film: 'Screen-record of your trade journal template being filled in.', caption: 'I grade the process, not the profit.' },
  { id: 20, goal: 'Trading', title: 'Running 7 Evaluations at Once', hook: 'I\'m trading 7 prop-firm evaluations at the same time. Here\'s the system.', film: 'You explaining the eval/rules structure plainly + how you take the same setup across every account.', caption: 'Not hype, not a get-rich scheme. One plan, 7 accounts, identical rules. Discipline is the whole edge.' },
  { id: 21, goal: 'Trading', title: 'My Post-Market Review', hook: 'The 10 minutes after the close that make me better.', film: 'Screen-record of reviewing the day: what repeated, what to cut.', caption: 'The edge is built after the market closes.' },
  { id: 22, goal: 'Trading', title: 'Rules-Followed % of the Week', hook: 'Forget P&L. Here\'s the only number I track.', film: 'You revealing your weekly rules-adherence percentage.', caption: 'Follow the rules enough weeks and the number takes care of itself.', series: 'The Scoreboard' },
  { id: 23, goal: 'Trading', title: 'Controlling Tilt', hook: 'How I stop myself from revenge trading after a loss.', film: 'You narrating your emotional-reset routine at the desk.', caption: 'The trade after a loss is the most expensive one. I don\'t take it.', series: 'Rules I Didn\'t Break' },

  // Career
  { id: 24, goal: 'Career', title: 'Shipping an MVP Before 9am', hook: 'I built and shipped a working feature before the market opened.', film: 'Sped-up screen-record of building with AI, ending on the live demo.', caption: 'Proof-of-work > a resume line. Building in public.', series: 'Ship Before 9' },
  { id: 25, goal: 'Career', title: 'The Cold Message That Got a Reply', hook: 'I sent 50 cold messages. This is the one that worked.', film: 'Show the message template (details blurred) + explain why it landed.', caption: 'Specific > flattering. Here\'s the outreach that gets responses.' },
  { id: 26, goal: 'Career', title: 'Startup Teardown', hook: 'A 30-second teardown of a startup I\'d kill to work at.', film: 'You breaking down a product/company — what\'s smart, what you\'d change.', caption: 'This is how you get a founder to notice you. Add value first.' },
  { id: 27, goal: 'Career', title: 'What I\'m Learning in Gen-AI This Week', hook: 'The gen-AI concept I finally understood this week.', film: 'Whiteboard/screen explainer of one thing you learned, taught simply.', caption: 'If you can teach it, you know it. Learning in public.', series: 'Ship Before 9' },
  { id: 28, goal: 'Career', title: 'Building My Proof-of-Work Portfolio', hook: 'Instead of applying, I\'m building the thing that gets me hired.', film: 'Tour of your projects/portfolio and why each exists.', caption: 'The portfolio is the pitch. Here\'s mine, in public.' },
  { id: 29, goal: 'Career', title: 'How I Prep for a VC/Founder Conversation', hook: 'I never get on a call without doing this first.', film: 'Screen-record of your research + the specific idea you bring to each call.', caption: 'Never show up empty. Bring a teardown, a demo, or a why.' },
  { id: 30, goal: 'Career', title: 'Turning One Intro Into Three', hook: 'The one question that turns every call into more calls.', film: 'You explaining your "who else should I talk to?" networking loop.', caption: 'Networking compounds. Every conversation is a fork in the road.' },

  // Apartment
  { id: 31, goal: 'Apartment', title: 'Rate This NYC Apartment', hook: 'Rate this apartment before I tell you the price.', film: 'Walk-through with an on-screen scorecard: light, space, commute, vibe.', caption: 'Then the price drops your jaw. Rate it 1–10 below.', series: 'Rate This Apartment' },
  { id: 32, goal: 'Apartment', title: 'What Moving to NYC Actually Costs', hook: 'Here\'s the real number to move to NYC. Brace yourself.', film: 'Breakdown on screen: first month, deposit, broker fee, moving.', caption: 'Nobody tells you this part. Save it before you move.' },
  { id: 33, goal: 'Apartment', title: 'My NYC Neighborhood Shortlist', hook: 'I narrowed all of NYC down to 3 neighborhoods. Here\'s how.', film: 'Map + b-roll of each area with your criteria overlaid.', caption: 'Commute, budget, and vibe. My 3 finalists — which would you pick?', series: 'Rate This Apartment' },
  { id: 34, goal: 'Apartment', title: 'The Apartment Application Speed Run', hook: 'When you find the one, you have an hour. Here\'s my go-bag.', film: 'Show your pre-assembled document folder ready to submit instantly.', caption: 'NYC apartments go in hours. Preparation is the whole game.' },
  { id: 35, goal: 'Apartment', title: 'Testing the Commute Before I Sign', hook: 'I don\'t sign a lease until I\'ve done the commute myself.', film: 'POV of actually riding the commute to campus/where you trade.', caption: 'The listing lies. The commute doesn\'t. Always test it.', series: 'Rate This Apartment' },
  { id: 36, goal: 'Apartment', title: 'First Night in the NYC Apartment', hook: 'Day 60. This is the apartment I said I\'d get on Day 1.', film: 'Empty apartment, keys in hand, emotional first-night walkthrough.', caption: '60 days ago this was just a goal on camera. Receipts.', series: 'The Scoreboard' },
]
