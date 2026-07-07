import { useState } from 'react'
import {
  ACCOUNT_PROMISE,
  ADDICTIVE_MECHANICS,
  CAPTION_FORMULAS,
  CONTENT_PILLARS,
  HOOKS,
  REEL_IDEAS,
  SERIES,
  STORYLINES,
} from '../data/content'
import { GOALS, GOAL_META, type Goal } from '../data/types'
import { Bullets, Card, GoalTag, Section } from './ui'

export function Content() {
  const [filter, setFilter] = useState<Goal | 'All'>('All')
  const ideas = filter === 'All' ? REEL_IDEAS : REEL_IDEAS.filter((r) => r.goal === filter)

  return (
    <div>
      <div className="mb-6 rounded-2xl border border-line bg-card p-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-accent">The Account Promise</div>
        <p className="mt-2 text-lg font-medium leading-snug text-ink">{ACCOUNT_PROMISE}</p>
      </div>

      <Section title="Content Pillars" subtitle="Five recurring buckets — every Reel belongs to one.">
        <div className="grid gap-3 md:grid-cols-2">
          {CONTENT_PILLARS.map((p) => (
            <Card key={p.name}>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-ink">{p.name}</div>
                <GoalTag goal={p.goal} small />
              </div>
              <p className="mt-1.5 text-sm text-muted">{p.promise}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {p.examples.map((e) => (
                  <li key={e} className="rounded-full bg-elevated px-2 py-0.5 text-[11px] text-faint">
                    {e}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Storylines" subtitle="The narratives that make a challenge worth following.">
        <div className="grid gap-3 md:grid-cols-2">
          {STORYLINES.map((s) => (
            <Card key={s.name}>
              <div className="font-semibold text-ink">{s.name}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.arc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Recurring Series" subtitle="Formats viewers learn to expect — the engine of habit-viewing.">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {SERIES.map((s) => (
            <Card key={s.name}>
              <div className="font-semibold text-ink">{s.name}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-accent">{s.cadence}</div>
              <p className="mt-1.5 text-sm text-muted">{s.format}</p>
              <p className="mt-2 text-xs text-faint">Why: {s.why}</p>
            </Card>
          ))}
        </div>
      </Section>

      <div className="mb-8 grid gap-3 lg:grid-cols-2">
        <Section title="Hook Bank" subtitle="Open with tension. {N} = current day.">
          <Card>
            <ul className="space-y-2 text-sm text-muted">
              {HOOKS.map((h, i) => (
                <li key={i} className="rounded-lg border border-line bg-elevated px-3 py-2">
                  "{h}"
                </li>
              ))}
            </ul>
          </Card>
        </Section>
        <div>
          <Section title="Caption Formulas" subtitle="Every caption should earn a comment.">
            <Card>
              <Bullets items={CAPTION_FORMULAS} />
            </Card>
          </Section>
          <Section title="Make It Addictive to Follow" subtitle="Mechanics that turn viewers into a returning audience.">
            <Card>
              <Bullets items={ADDICTIVE_MECHANICS} />
            </Card>
          </Section>
        </div>
      </div>

      {/* Reel idea bank */}
      <Section
        title={`Reel Idea Bank — ${REEL_IDEAS.length} ideas`}
        subtitle="Specific Reels pulled from your real life. Filter by goal."
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <FilterChip label="All" active={filter === 'All'} onClick={() => setFilter('All')} count={REEL_IDEAS.length} />
          {GOALS.map((g) => (
            <FilterChip
              key={g}
              label={GOAL_META[g].label}
              active={filter === g}
              onClick={() => setFilter(g)}
              count={REEL_IDEAS.filter((r) => r.goal === g).length}
              color={GOAL_META[g].accent}
            />
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {ideas.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-faint">#{r.id}</span>
                  <span className="font-semibold text-ink">{r.title}</span>
                </div>
                <GoalTag goal={r.goal} small />
              </div>
              <div className="mt-2 space-y-1.5 text-sm">
                <p className="text-ink">
                  <span className="text-accent">Hook:</span> "{r.hook}"
                </p>
                <p className="text-muted">
                  <span className="text-faint">Film:</span> {r.film}
                </p>
                <p className="text-muted">
                  <span className="text-faint">Caption:</span> {r.caption}
                </p>
                {r.series && (
                  <p className="pt-1 text-[11px] text-faint">Series: {r.series}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
  count,
  color = '#c2620f',
}: {
  label: string
  active: boolean
  onClick: () => void
  count: number
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active ? 'text-canvas' : 'text-muted hover:text-ink'
      }`}
      style={{
        borderColor: active ? color : 'rgba(255,255,255,0.15)',
        backgroundColor: active ? color : 'transparent',
      }}
    >
      {label} <span className={active ? 'opacity-70' : 'opacity-40'}>{count}</span>
    </button>
  )
}
