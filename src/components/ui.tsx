import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { GOAL_META, type Goal } from '../data/types'
import { fadeUp, springy, staggerContainer } from '../lib/motion'

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
    <section id={id} className="mb-10">
      <div className="mb-4">
        <h2 className="text-[15px] font-semibold tracking-tight text-ink">{title}</h2>
        {subtitle && <p className="mt-1 text-[13px] leading-relaxed text-faint">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      className={`rounded-xl border border-line bg-card p-4 transition-colors hover:border-line-strong hover:shadow-soft ${className}`}
    >
      {children}
    </motion.div>
  )
}

/** Stagger container — wrap a list/grid of MotionItem for a gentle reveal. */
export function MotionGroup({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MotionItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}

export function GoalTag({ goal }: { goal: Goal; small?: boolean }) {
  const m = GOAL_META[goal]
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-faint">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.accent }} />
      {m.label}
    </span>
  )
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex gap-3 rounded-xl border border-line bg-accent-soft p-3.5 text-[13px] leading-relaxed text-muted">
      <span aria-hidden className="mt-0.5 select-none opacity-70">⚠︎</span>
      <p>{children}</p>
    </div>
  )
}

export function ProgressBar({ value, max, accent = 'var(--accent)' }: { value: number; max: number; accent?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-elevated">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: accent }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export function Bullets({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 text-[13px] text-muted ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
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
          style={{ backgroundColor: i < value ? 'var(--accent)' : 'var(--elevated)' }}
        />
      ))}
    </div>
  )
}

export function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-line bg-elevated p-3">
      <div className="text-2xl font-bold tracking-tight" style={{ color: accent ?? 'var(--ink)' }}>
        {value}
      </div>
      <div className="mt-0.5 text-xs text-faint">{label}</div>
    </div>
  )
}

/** Animated checkbox — springy pop + check on toggle. */
export function AnimatedCheck({ on, color = 'var(--accent)' }: { on: boolean; color?: string }) {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border"
      style={{
        borderColor: on ? color : 'var(--line-strong)',
        backgroundColor: on ? color : 'transparent',
      }}
    >
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        initial={false}
        animate={{ scale: on ? 1 : 0 }}
        transition={springy}
      >
        <path d="M2.5 6.5L5 9L9.5 3.5" stroke="var(--canvas)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </span>
  )
}
