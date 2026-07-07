import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { GOAL_META, type Goal } from '../data/types'
import { fadeUp, springy, staggerContainer } from '../lib/motion'

const revealViewport = { once: true, margin: '-60px' }

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
    <motion.section
      id={id}
      className="mb-14"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-5">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-[28px]">{title}</h2>
        {subtitle && <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">{subtitle}</p>}
      </div>
      {children}
    </motion.section>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`rounded-3xl border border-line bg-card p-5 backdrop-blur-xl transition-shadow duration-300 hover:border-line-strong hover:shadow-glow ${className}`}
    >
      {children}
    </motion.div>
  )
}

/** Stagger container — wrap MotionItem children for a cascading reveal. */
export function MotionGroup({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className={className}>
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
    <div className="mb-8 flex gap-3 rounded-2xl border border-line bg-card p-4 text-[13px] leading-relaxed text-muted backdrop-blur-xl">
      <span aria-hidden className="mt-0.5 select-none opacity-70">⚠︎</span>
      <p>{children}</p>
    </div>
  )
}

export function ProgressBar({ value, max, accent }: { value: number; max: number; accent?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  const style = accent
    ? { backgroundColor: accent }
    : { backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-elevated">
      <motion.div
        className="h-full rounded-full"
        style={style}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

export function Bullets({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 text-[14px] leading-relaxed text-muted ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundImage: 'linear-gradient(120deg, var(--accent), var(--accent-2))' }} />
          <span>{it}</span>
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
        <span key={i} className="h-2 w-2 rounded-full" style={{ backgroundColor: i < value ? 'var(--accent)' : 'var(--elevated)' }} />
      ))}
    </div>
  )
}

export function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4 backdrop-blur-xl">
      <div className="text-3xl font-semibold tracking-tight" style={accent ? { color: accent } : undefined}>
        {value}
      </div>
      <div className="mt-1 text-[13px] text-faint">{label}</div>
    </div>
  )
}

/** Animated checkbox — springy pop + check on toggle. */
export function AnimatedCheck({ on, color }: { on: boolean; color?: string }) {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border"
      style={{
        borderColor: on ? color ?? 'var(--accent)' : 'var(--line-strong)',
        backgroundColor: on ? color ?? 'var(--accent)' : 'transparent',
      }}
    >
      <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none" initial={false} animate={{ scale: on ? 1 : 0 }} transition={springy}>
        <path d="M2.5 6.5L5 9L9.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </span>
  )
}
