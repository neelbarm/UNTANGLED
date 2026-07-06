// NYC apartment-hunt system. NYC moves fast and rewards preparation — the whole
// strategy is: decide criteria up front, keep documents ready, and act within
// the hour when the right place appears.

export const APARTMENT_THESIS =
  'NYC apartments go in hours, not days. You don\'t out-search the market — you out-prepare it. Criteria set, documents ready, decision rules pre-made, so when the right one appears you move before anyone else.'

export const WEEKLY_APARTMENT_TASKS = [
  { week: 'Weeks 1–2', tasks: ['Lock budget + total move-in cost ceiling', 'Pick 3 candidate neighborhoods', 'List non-negotiables vs. nice-to-haves', 'Assemble the document folder'] },
  { week: 'Weeks 3–4', tasks: ['Book 3–5 viewings/week', 'Score every place the same way', 'Test the real commute for top options', 'Narrow to 1–2 neighborhoods'] },
  { week: 'Weeks 5–6', tasks: ['Second-round viewings on finalists', 'Verify lease terms + total cost in writing', 'Get paperwork pre-verified so you can sign fast', 'Set your walk-away price'] },
  { week: 'Weeks 7–8', tasks: ['Submit application on the top choice', 'Keep a backup ready in case it falls through', 'Negotiate where possible', 'Sign the lease + book moving logistics'] },
  { week: 'Week 9', tasks: ['Move in', 'Film the first-night arc', 'Close the apartment goal on camera'] },
]

export const DOCUMENT_CHECKLIST = [
  'Government photo ID',
  'Proof of income (pay stubs, offer letter, or founder/1099 income docs)',
  'Bank statements (typically last 2–3 months)',
  'Tax return or W-2/1099 (most recent)',
  'Employment/income verification letter (or founder equivalent)',
  'Credit report / score (know it before they ask)',
  'References (previous landlord and/or professional)',
  'Guarantor documents if applicable (common for students/founders)',
  'Funds ready for first month + deposit + any broker fee',
]

export const NEIGHBORHOOD_WORKFLOW = [
  'Define the filter first: max rent, max commute time to campus/where you trade, safety, and vibe.',
  'Shortlist 3 neighborhoods that pass the filter on paper before visiting anything.',
  'Do daylight + nighttime recon walks — an area feels different at 9pm than at noon.',
  'Actually ride the commute from each to campus/your trading spot during rush hour.',
  'Check the essentials on foot: gym, grocery, transit, quiet enough to work at 5am.',
  'Rank the three, then focus 80% of your viewing time on the top one.',
]

export const URGENCY_AND_TRACKING = [
  'Keep every option in one tracker: address, rent, total move-in cost, commute, score, status, next action.',
  'Score each place on the same 1–10 scale immediately after viewing, while it\'s fresh.',
  'Set a personal deadline ("lease signed by Day 50") and work backward — urgency you create beats urgency you wait for.',
  'When a place scores 8+, be ready to apply the same day — hesitation is how you lose NYC apartments.',
  'Always keep a #2 alive so you never negotiate from desperation.',
  'Review the tracker every Sunday in the weekly review and prune dead options.',
]

// Fields for the interactive apartment options tracker (persisted in localStorage).
export interface ApartmentOption {
  id: string
  address: string
  neighborhood: string
  rent: string
  commute: string
  score: number
  status: 'Researching' | 'Viewing booked' | 'Viewed' | 'Applied' | 'Backup' | 'Passed'
  notes: string
}

export const APARTMENT_STATUSES: ApartmentOption['status'][] = [
  'Researching',
  'Viewing booked',
  'Viewed',
  'Applied',
  'Backup',
  'Passed',
]
