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
      <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-br from-ink-850 to-ink-900 p-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-ember-400">The Account Promise</div>
        <p className="mt-2 text-lg font-medium leading-snug text-white">{ACCOUNT_PROMISE}</p>
      </div>

      <Section title="Content Pillars" subtitle="Five recurring buckets — every Reel belongs to one.">
        <div className="grid gap-3 md:grid-cols-2">
          {CONTENT_PILLARS.map((p) => (
            <Card key={p.name}>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-white">{p.name}</div>
                <GoalTag goal={p.goal} small />
              </div>
              <p className="mt-1.5 text-sm text-white/60">{p.promise}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {p.examples.map((e) => (
                  <li key={e} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/50">
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
              <div className="font-semibold text-white">{s.name}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.arc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Recurring Series" subtitle="Formats viewers learn to expect — the engine of habit-viewing.">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {SERIES.map((s) => (
            <Card key={s.name}>
              <div className="font-semibold text-white">{s.name}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-ember-400">{s.cadence}</div>
              <p className="mt-1.5 text-sm text-white/60">{s.format}</p>
              <p className="mt-2 text-xs text-white/40">Why: {s.why}</p>
            </Card>
          ))}
        </div>
      </Section>

      <div className="mb-8 grid gap-3 lg:grid-cols-2">
        <Section title="Hook Bank" subtitle="Open with tension. {N} = current day.">
          <Card>
            <ul className="space-y-2 text-sm text-white/75">
              {HOOKS.map((h, i) => (
                <li key={i} className="rounded-lg border border-white/8 bg-ink-850 px-3 py-2">
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
                  <span className="font-mono text-xs text-white/30">#{r.id}</span>
                  <span className="font-semibold text-white">{r.title}</span>
                </div>
                <GoalTag goal={r.goal} small />
              </div>
              <div className="mt-2 space-y-1.5 text-sm">
                <p className="text-white/80">
                  <span className="text-ember-400">Hook:</span> "{r.hook}"
                </p>
                <p className="text-white/60">
                  <span className="text-white/40">Film:</span> {r.film}
                </p>
                <p className="text-white/60">
                  <span className="text-white/40">Caption:</span> {r.caption}
                </p>
                {r.series && (
                  <p className="pt-1 text-[11px] text-white/40">Series: {r.series}</p>
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
  color = '#ff7a18',
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
        active ? 'text-ink-950' : 'text-white/60 hover:text-white'
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
