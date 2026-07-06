import type { ReactNode } from 'react'
import { GOAL_META, type Goal } from '../data/types'

export function Section({
  title,
  subtitle,
  children,
  id,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  id?: string
}) {
  return (
    <section id={id} className="mb-8">
      <div className="mb-3">
        <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`panel rounded-2xl border border-white/10 bg-ink-900 p-4 ${className}`}>{children}</div>
  )
}

export function GoalTag({ goal, small = false }: { goal: Goal; small?: boolean }) {
  const m = GOAL_META[goal]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${
        small ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
      style={{ borderColor: `${m.accent}55`, color: m.accent, backgroundColor: `${m.accent}12` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.accent }} />
      {m.label}
    </span>
  )
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 text-xs leading-relaxed text-amber-200/80">
      <span aria-hidden className="mt-0.5 select-none">⚠️</span>
      <p>{children}</p>
    </div>
  )
}

export function ProgressBar({ value, max, accent = '#ff7a18' }: { value: number; max: number; accent?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: accent }} />
    </div>
  )
}

export function Bullets({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 text-sm text-white/70 ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember-500" />
          <span className="leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  )
}

/** A 1–10 dot meter used for self-scoring. */
export function ScoreMeter({ value }: { value: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: i < value ? '#ff7a18' : 'rgba(255,255,255,0.12)' }}
        />
      ))}
    </div>
  )
}

export function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-ink-850 p-3">
      <div className="text-2xl font-bold" style={{ color: accent ?? '#fff' }}>
        {value}
      </div>
      <div className="mt-0.5 text-xs text-white/45">{label}</div>
    </div>
  )
}
