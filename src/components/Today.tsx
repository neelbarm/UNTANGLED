import { useEffect, useRef, useState } from 'react'
import { animate, motion, useScroll, useTransform } from 'framer-motion'
import { addDaysISO, CHALLENGE_LENGTH, challengeDay, prettyDate, weekdayLong, weekOfDay } from '../lib/dates'
import { WEEK_THEMES } from '../data/masterPlan'
import { DAILY_FLOW, DAY_CONTEXT } from '../data/dailyFlow'
import { DAILY_CHECKLIST } from '../data/dailyChecklist'
import { GOAL_META } from '../data/types'
import type { DayRecord, Store } from '../store'
import { fanfare } from '../lib/sound'
import { downloadShareCard } from '../lib/shareCard'
import { AnimatedCheck, GoalTag, MotionGroup, MotionItem, ProgressBar, Section, Stat } from './ui'

// A day is "won" when 80%+ of the flow OR the non-negotiables got ticked.
const WIN_THRESHOLD = 0.8
function isWonRecord(rec: DayRecord | undefined, flowTotal: number, checkTotal: number): boolean {
  if (!rec) return false
  const f = Object.values(rec.flow ?? {}).filter(Boolean).length
  const c = Object.values(rec.checklist ?? {}).filter(Boolean).length
  return f / flowTotal >= WIN_THRESHOLD || c / checkTotal >= WIN_THRESHOLD
}

/** The big number counts up from 0 on load — a tiny product-launch moment. */
function CountUpDay({ day }: { day: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const controls = animate(0, day, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [day])
  return <>{display}</>
}

/** 60 dots, one per day — the challenge at a glance. Today pulses, won days burn. */
function DayGrid({ day, won }: { day: number; won: Set<number> }) {
  return (
    <motion.div
      className="mx-auto mt-8 grid max-w-md gap-2"
      style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.014, delayChildren: 0.3 } } }}
      initial="hidden"
      animate="show"
      aria-label={`${Math.max(0, day)} of ${CHALLENGE_LENGTH} days`}
    >
      {Array.from({ length: CHALLENGE_LENGTH }, (_, i) => {
        const n = i + 1
        const past = n < day
        const current = n === day
        const isWon = won.has(n)
        const background = isWon
          ? 'linear-gradient(135deg, #ff9d2e, #ff5e3a)' // flame — day was won
          : current
            ? 'linear-gradient(135deg, var(--accent), var(--accent-2))'
            : past
              ? 'var(--line-strong)' // elapsed but not won
              : 'var(--elevated)' // future
        return (
          <motion.span
            key={n}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 22 } },
            }}
            className={`mx-auto h-2.5 w-2.5 rounded-full ${current ? 'pulse-dot' : ''}`}
            style={{
              background,
              boxShadow: isWon ? '0 0 8px rgba(255, 138, 46, 0.7)' : undefined,
            }}
            title={`Day ${n}${isWon ? ' · won 🔥' : ''}`}
          />
        )
      })}
    </motion.div>
  )
}

/** Full-screen confetti burst — fires when the day hits 100%. */
function Celebration({ trigger }: { trigger: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (trigger === 0) return
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(t)
  }, [trigger])
  if (!visible) return null
  const colors = ['var(--accent)', 'var(--accent-2)', '#5b9d78', '#c0a24a', '#cf6b6b']
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]" key={trigger}>
      {Array.from({ length: 44 }, (_, i) => {
        const dx = (Math.random() - 0.5) * 640
        const up = -(120 + Math.random() * 260)
        const rot = (Math.random() - 0.5) * 720
        const size = 5 + Math.random() * 6
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: size,
              height: size * 0.45,
              borderRadius: 2,
              backgroundColor: colors[i % colors.length],
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: dx, y: [0, up, 420], opacity: [1, 1, 0], rotate: rot }}
            transition={{ duration: 1.7 + Math.random() * 0.5, ease: 'easeOut', delay: Math.random() * 0.12 }}
          />
        )
      })}
    </div>
  )
}

const MARQUEE_GOALS = ['Lose 10 lbs', 'Trade with discipline', 'Break into VC / AI', 'Move to NYC']

/** Infinite marquee of the four goals — the mission, always in motion. */
function GoalMarquee() {
  const half = (
    <>
      {MARQUEE_GOALS.map((g) => (
        <span key={g} className="flex shrink-0 items-center gap-8">
          <span>{g}</span>
          <span aria-hidden className="h-1 w-1 rounded-full" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }} />
        </span>
      ))}
    </>
  )
  return (
    <div
      className="mt-10 overflow-hidden py-1"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 18%, black 82%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 18%, black 82%, transparent)',
      }}
    >
      <div className="marquee-track flex w-max gap-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-faint">
        {half}
        {half}
      </div>
    </div>
  )
}

export function Today({ store }: { store: Store }) {
  const { startDate, setStartDate, todayISO, getDay, toggleChecklist, toggleFlow, updateDay, days } = store
  const day = challengeDay(startDate, todayISO)
  const week = Math.max(1, weekOfDay(day))
  const theme = WEEK_THEMES[Math.min(week, WEEK_THEMES.length) - 1]
  const weekdayKey = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase().slice(0, 3)
  const dayContext = DAY_CONTEXT[weekdayKey]
  const rec = getDay(todayISO)

  const flowItems = DAILY_FLOW.flatMap((p) => p.items)
  const flowDone = flowItems.filter((i) => rec.flow[i.id]).length
  const checkedCount = DAILY_CHECKLIST.filter((i) => rec.checklist[i.id]).length
  const notStarted = day === 0

  // Gentle parallax: the hero recedes as you scroll into the work below it.
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 480], [1, 0.15])
  const heroScale = useTransform(scrollY, [0, 480], [1, 0.96])
  const heroY = useTransform(scrollY, [0, 480], [0, 48])

  // Celebrate finishing the whole day — flow or non-negotiables hitting 100%.
  const allFlow = flowItems.length > 0 && flowDone === flowItems.length
  const allChecks = checkedCount === DAILY_CHECKLIST.length
  const prevDone = useRef({ flow: allFlow, checks: allChecks })
  const [celebrate, setCelebrate] = useState(0)
  useEffect(() => {
    if ((allFlow && !prevDone.current.flow) || (allChecks && !prevDone.current.checks)) {
      setCelebrate((c) => c + 1)
      fanfare()
    }
    prevDone.current = { flow: allFlow, checks: allChecks }
  }, [allFlow, allChecks])

  // Won days + current streak (consecutive won days ending today/yesterday).
  const won = new Set<number>()
  for (let n = 1; n <= Math.min(Math.max(day, 0), CHALLENGE_LENGTH); n++) {
    if (isWonRecord(days[addDaysISO(startDate, n - 1)], flowItems.length, DAILY_CHECKLIST.length)) {
      won.add(n)
    }
  }
  let streak = 0
  for (let n = won.has(day) ? day : day - 1; n >= 1 && won.has(n); n--) streak++

  function shareCard() {
    downloadShareCard({
      day: Math.max(1, day),
      total: CHALLENGE_LENGTH,
      dateLabel: prettyDate(todayISO),
      weekTitle: theme.title,
      weekNumber: week,
      flowDone,
      flowTotal: flowItems.length,
      checkDone: checkedCount,
      checkTotal: DAILY_CHECKLIST.length,
      streak,
      won,
    })
  }

  return (
    <div>
      <Celebration trigger={celebrate} />

      {/* Cinematic hero */}
      <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}>
        <motion.div
          className="mb-14 pt-4 text-center sm:pt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[13px] font-semibold uppercase tracking-[0.25em] text-accent">
            {notStarted ? 'Challenge not started' : `Week ${week} · ${theme.phase}`}
          </div>
          <div className="relative mt-3 flex items-end justify-center gap-3">
            {/* Breathing glow behind the number */}
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
              style={{ background: 'radial-gradient(circle, var(--accent-glow), transparent 70%)' }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="-mb-1 inline-block overflow-hidden pb-1">
              <motion.span
                className="shimmer-text inline-block text-7xl font-semibold leading-none tracking-tighter tabular-nums sm:text-9xl"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              >
                {notStarted ? '—' : (
                  <>
                    Day <CountUpDay day={day} />
                  </>
                )}
              </motion.span>
            </span>
            <span className="pb-2 text-2xl font-medium text-faint sm:text-3xl">/ {CHALLENGE_LENGTH}</span>
          </div>
          <div className="mt-4 text-[15px] text-muted">{prettyDate(todayISO)}</div>
          {dayContext && (
            <div className="mt-4 inline-flex rounded-full border border-line bg-card px-4 py-1.5 text-[13px] text-muted backdrop-blur-xl">
              {dayContext}
            </div>
          )}

          {/* 60 dots — one per day, flames on won days */}
          <DayGrid day={day} won={won} />

          {streak > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.6 }}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[13px] font-semibold backdrop-blur-xl"
              style={{ borderColor: 'rgba(255,138,46,0.4)', background: 'rgba(255,138,46,0.1)' }}
            >
              <span aria-hidden>🔥</span>
              <span className="text-ink">
                {streak}-day streak{streak >= 7 ? ' — unstoppable' : ''}
              </span>
            </motion.div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={shareCard}
              className="rounded-full px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundImage: 'linear-gradient(120deg, var(--accent), var(--accent-2))' }}
            >
              Share today's card ↓
            </button>
            <label className="inline-flex items-center gap-2 text-xs text-faint">
              <span>Start date</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value || todayISO)}
                className="rounded-lg border border-line bg-card px-2.5 py-1 text-ink outline-none backdrop-blur-xl focus:border-accent"
              />
            </label>
          </div>

          {!notStarted && (
            <div
              className="mx-auto mt-8 max-w-xl rounded-3xl p-[1px]"
              style={{
                backgroundImage: 'linear-gradient(120deg, var(--accent), var(--accent-2), var(--accent))',
                backgroundSize: '200% 200%',
                animation: 'shimmer 6s linear infinite',
              }}
            >
              <div className="rounded-[calc(1.5rem-1px)] p-5 text-left backdrop-blur-xl" style={{ background: 'var(--canvas)' }}>
                <div className="text-[15px] font-semibold text-ink">This week — {theme.title}</div>
                <div className="mt-1.5 text-[14px] leading-relaxed text-muted">{theme.focus}</div>
                <div className="mt-3 flex items-center gap-2 text-[13px] text-accent">
                  <span aria-hidden>🎬</span>
                  <span>Flagship Reel: {theme.filmThis}</span>
                </div>
              </div>
            </div>
          )}

          <GoalMarquee />

          {/* Scroll cue */}
          <motion.div
            aria-hidden
            className="mt-6 text-lg text-faint"
            animate={{ y: [0, 7, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⌄
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Today's flow — check off what you did, in order, no clock times */}
      <Section
        title={`Today's Flow — ${weekdayLong(todayISO)}`}
        subtitle={`Work through it and tick what you did · ${flowDone}/${flowItems.length} done`}
      >
        <div className="mb-4">
          <ProgressBar value={flowDone} max={flowItems.length} />
        </div>
        <div className="space-y-5">
          {DAILY_FLOW.map((phase) => (
            <div key={phase.phase}>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-faint">{phase.phase}</div>
              <MotionGroup className="space-y-2">
                {phase.items.map((item) => {
                  const on = !!rec.flow[item.id]
                  return (
                    <MotionItem key={item.id}>
                      <button
                        onClick={() => toggleFlow(todayISO, item.id)}
                        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                          on ? 'border-accent bg-accent-soft' : 'border-line bg-card hover:border-line-strong'
                        }`}
                      >
                        <AnimatedCheck on={on} />
                        <span className="flex-1">
                          <span className={`text-sm ${on ? 'text-faint line-through' : 'text-ink'}`}>
                            {item.label}
                          </span>
                          {item.note && <span className="ml-2 text-xs text-faint">· {item.note}</span>}
                        </span>
                        <GoalTag goal={item.goal} />
                      </button>
                    </MotionItem>
                  )
                })}
              </MotionGroup>
            </div>
          ))}
        </div>
      </Section>

      {/* Daily non-negotiables — the minimum that must be true every day */}
      <Section
        title="Daily Non-Negotiables"
        subtitle={`The minimum bar for every challenge day · ${checkedCount}/${DAILY_CHECKLIST.length} done`}
      >
        <div className="mb-4">
          <ProgressBar value={checkedCount} max={DAILY_CHECKLIST.length} accent="#5b9d78" />
        </div>
        <MotionGroup className="grid gap-2 sm:grid-cols-2">
          {DAILY_CHECKLIST.map((item) => {
            const on = !!rec.checklist[item.id]
            return (
              <MotionItem key={item.id}>
                <button
                  onClick={() => toggleChecklist(todayISO, item.id)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                    on ? 'border-signal-green/40 bg-signal-green/5' : 'border-line bg-card hover:border-line-strong'
                  }`}
                >
                  <span className="mt-0.5">
                    <AnimatedCheck on={on} color="#5b9d78" />
                  </span>
                  <span className="flex-1">
                    <span className={`block text-sm ${on ? 'text-faint line-through' : 'text-ink'}`}>
                      {item.label}
                    </span>
                    {item.detail && <span className="mt-0.5 block text-xs text-faint">{item.detail}</span>}
                  </span>
                  <span className="mt-0.5">
                    <GoalTag goal={item.goal} />
                  </span>
                </button>
              </MotionItem>
            )
          })}
        </MotionGroup>
      </Section>

      {/* Daily trackers */}
      <Section title="Daily trackers" subtitle="Log the numbers — trend beats any single day">
        <div className="grid gap-3 sm:grid-cols-3">
          <TrackerInput
            label="Weight"
            placeholder="e.g. 182.4"
            value={rec.weight}
            onChange={(v) => updateDay(todayISO, { weight: v })}
            accent={GOAL_META.Body.accent}
          />
          <TrackerInput
            label="Steps"
            placeholder="e.g. 9200"
            value={rec.steps}
            onChange={(v) => updateDay(todayISO, { steps: v })}
            accent={GOAL_META.Body.accent}
          />
          <TrackerInput
            label="Sleep (hrs)"
            placeholder="e.g. 7.5"
            value={rec.sleep}
            onChange={(v) => updateDay(todayISO, { sleep: v })}
            accent={GOAL_META.Body.accent}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Flow done" value={`${flowDone}/${flowItems.length}`} accent="#c88a49" />
          <Stat label="Non-negotiables" value={`${checkedCount}/${DAILY_CHECKLIST.length}`} accent="#5b9d78" />
          <Stat label="Challenge day" value={notStarted ? '—' : String(day)} accent="#5b86c9" />
          <Stat label="Days left" value={String(CHALLENGE_LENGTH - Math.max(0, day))} accent="#9a78c2" />
        </div>
      </Section>
    </div>
  )
}

function TrackerInput({
  label,
  value,
  onChange,
  placeholder,
  accent,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  accent: string
}) {
  return (
    <label className="block rounded-xl border border-line bg-card p-3">
      <span className="text-xs text-faint">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode="decimal"
        className="mt-1 w-full bg-transparent text-lg font-semibold text-ink outline-none placeholder:text-faint"
        style={{ caretColor: accent }}
      />
    </label>
  )
}
