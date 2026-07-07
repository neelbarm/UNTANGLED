import { useState } from 'react'
import { REVIEW_PROMPTS, REVIEW_THESIS, SUNDAY_RESET_STEPS, type WeeklyReview } from '../data/review'
import { challengeDay, weekOfDay } from '../lib/dates'
import type { Store } from '../store'
import { Bullets, Card, Section } from './ui'
import { Thesis } from './Career'

function emptyReview(week: number): WeeklyReview {
  return {
    weekNumber: week,
    bodyScore: 5,
    tradingScore: 5,
    careerScore: 5,
    apartmentScore: 5,
    contentScore: 5,
    biggestWin: '',
    biggestMiss: '',
    ruleBrokenMost: '',
    oneThingToFix: '',
    nextWeekPriority: '',
  }
}

export function Review({ store }: { store: Store }) {
  const { startDate, todayISO, reviews, setReviews } = store
  const currentWeek = Math.max(1, weekOfDay(challengeDay(startDate, todayISO)) || 1)
  const [week, setWeek] = useState(currentWeek)
  const review = reviews[week] ?? emptyReview(week)

  function update(patch: Partial<WeeklyReview>) {
    setReviews({ ...reviews, [week]: { ...review, ...patch } })
  }

  return (
    <div>
      <Thesis text={REVIEW_THESIS} accent="#c0a24a" label="Weekly Review" />

      <Section title="The Sunday Reset" subtitle="One honest hour that makes the whole system self-correcting.">
        <Card>
          <Bullets items={SUNDAY_RESET_STEPS} />
        </Card>
      </Section>

      <Section title="Weekly Review Template" subtitle="Score the week, face the misses, pre-decide next week. Saved per week.">
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-faint">Week</span>
            <select
              value={week}
              onChange={(e) => setWeek(Number(e.target.value))}
              className="rounded-lg border border-line bg-elevated px-3 py-1.5 text-sm text-ink outline-none focus:border-accent"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>
                  Week {w}
                  {reviews[w] ? ' ✓' : ''}
                </option>
              ))}
            </select>
            {week === currentWeek && (
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">current</span>
            )}
          </div>

          <div className="space-y-4">
            {REVIEW_PROMPTS.map((p) =>
              p.type === 'score' ? (
                <label key={p.key} className="block">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted">{p.label}</span>
                    <span className="font-mono font-semibold text-accent">
                      {(review[p.key as keyof WeeklyReview] as number) ?? 5}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={(review[p.key as keyof WeeklyReview] as number) ?? 5}
                    onChange={(e) => update({ [p.key]: Number(e.target.value) } as Partial<WeeklyReview>)}
                    className="w-full accent-accent"
                  />
                </label>
              ) : (
                <label key={p.key} className="block">
                  <div className="mb-1 text-sm text-muted">{p.label}</div>
                  <textarea
                    rows={2}
                    value={(review[p.key as keyof WeeklyReview] as string) ?? ''}
                    onChange={(e) => update({ [p.key]: e.target.value } as Partial<WeeklyReview>)}
                    className="w-full resize-y rounded-lg border border-line bg-elevated px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                  />
                </label>
              ),
            )}
          </div>

          <div className="mt-5 rounded-xl border border-line bg-elevated p-3">
            <div className="text-xs text-faint">Week {week} average score</div>
            <div className="text-2xl font-bold text-accent">
              {(
                (review.bodyScore + review.tradingScore + review.careerScore + review.apartmentScore + review.contentScore) /
                5
              ).toFixed(1)}
              <span className="text-base text-faint"> / 10</span>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  )
}
