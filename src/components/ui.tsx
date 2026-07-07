import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
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
        <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-ink sm:text-[32px]">{title}</h2>
        {subtitle && <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">{subtitle}</p>}
      </div>
      {children}
    </motion.section>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  // Cursor physics: the pointer position drives a soft spotlight glow AND a
  // subtle 3D tilt (max ~5°), both via CSS vars so React never re-renders.
  function track(e: MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    el.style.setProperty('--ry', `${px * 5}deg`)
    el.style.setProperty('--rx', `${-py * 5}deg`)
  }
  function reset(e: MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      style={{ perspective: 900 }}
    >
      <div
        onMouseMove={track}
        onMouseLeave={reset}
        className={`relative overflow-hidden rounded-3xl border border-line bg-card p-5 backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-200 ease-out group-hover:border-line-strong group-hover:shadow-glow ${className}`}
        style={{ transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))', transformStyle: 'preserve-3d' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 70%)' }}
        />
        <div className="relative">{children}</div>
      </div>
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

/** Animated checkbox — springy pop + a tiny particle burst when checked. */
export function AnimatedCheck({ on, color }: { on: boolean; color?: string }) {
  const prev = useRef(on)
  const [burst, setBurst] = useState(0)

  useEffect(() => {
    if (on && !prev.current) setBurst((b) => b + 1) // false -> true edge only
    prev.current = on
  }, [on])

  const c = color ?? 'var(--accent)'
  return (
    <span
      className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border"
      style={{
        borderColor: on ? c : 'var(--line-strong)',
        backgroundColor: on ? c : 'transparent',
      }}
    >
      <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none" initial={false} animate={{ scale: on ? 1 : 0 }} transition={springy}>
        <path d="M2.5 6.5L5 9L9.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
      {burst > 0 && (
        <span key={burst} aria-hidden className="pointer-events-none absolute inset-0">
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (i / 6) * Math.PI * 2
            return (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full"
                style={{ backgroundColor: c }}
                initial={{ x: '-50%', y: '-50%', translateX: 0, translateY: 0, opacity: 1, scale: 1 }}
                animate={{ translateX: Math.cos(angle) * 16, translateY: Math.sin(angle) * 16, opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            )
          })}
        </span>
      )}
    </span>
  )
}
