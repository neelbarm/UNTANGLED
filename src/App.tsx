import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useStore } from './store'
import { useTheme } from './hooks/useTheme'
import { useLocalStorage } from './hooks/useLocalStorage'
import { setSoundEnabled } from './lib/sound'
import { CHALLENGE_LENGTH, challengeDay } from './lib/dates'
import { Today } from './components/Today'
import { Plan } from './components/Plan'
import { Schedule } from './components/Schedule'
import { Content } from './components/Content'
import { Career } from './components/Career'
import { Apartment } from './components/Apartment'
import { Body } from './components/Body'
import { Trading } from './components/Trading'
import { Review } from './components/Review'
import { Reference } from './components/Reference'

const TABS = [
  { key: 'today', label: 'Today' },
  { key: 'plan', label: 'Plan' },
  { key: 'schedule', label: 'Flow' },
  { key: 'content', label: 'Content' },
  { key: 'career', label: 'Career' },
  { key: 'apartment', label: 'Apartment' },
  { key: 'body', label: 'Body' },
  { key: 'trading', label: 'Trading' },
  { key: 'review', label: 'Review' },
  { key: 'reference', label: 'Reference' },
] as const

type TabKey = (typeof TABS)[number]['key']

/** Tiny live progress ring for the nav — the whole challenge in 30px. */
function ProgressRing({ day }: { day: number }) {
  const pct = Math.max(0, Math.min(1, day / CHALLENGE_LENGTH))
  const r = 11
  const c = 2 * Math.PI * r
  return (
    <div className="relative hidden h-9 w-9 shrink-0 items-center justify-center sm:flex" title={`Day ${day} of ${CHALLENGE_LENGTH}`}>
      <svg width="30" height="30" viewBox="0 0 30 30" className="-rotate-90">
        <circle cx="15" cy="15" r={r} fill="none" stroke="var(--elevated)" strokeWidth="2.5" />
        <motion.circle
          cx="15"
          cy="15"
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-[8px] font-bold tabular-nums text-muted">{Math.max(0, day)}</span>
    </div>
  )
}

export default function App() {
  const store = useStore()
  const [theme, toggleTheme] = useTheme()
  const [tab, setTab] = useState<TabKey>('today')
  const day = challengeDay(store.startDate, store.todayISO)

  // Each section starts at the top — no inherited scroll position.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [tab])

  // UI sounds (tick + fanfare) — persisted preference, on by default.
  const [sound, setSound] = useLocalStorage<boolean>('sixty:sound', true)
  useEffect(() => {
    setSoundEnabled(sound)
  }, [sound])

  // The aurora leans toward the cursor — the page feels alive, not static.
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])
  const spring = { stiffness: 40, damping: 20 }
  const b1x = useSpring(useTransform(mx, [0, 1], [-50, 50]), spring)
  const b1y = useSpring(useTransform(my, [0, 1], [-30, 30]), spring)
  const b2x = useSpring(useTransform(mx, [0, 1], [40, -40]), spring)
  const b2y = useSpring(useTransform(my, [0, 1], [25, -25]), spring)

  return (
    <div className="relative min-h-full overflow-x-hidden">
      {/* Animated aurora backdrop — drifts on its own, leans with the mouse */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute -left-[10%] -top-[15%]" style={{ x: b1x, y: b1y }}>
          <div
            className="aurora h-[55vh] w-[55vh] rounded-full opacity-40 blur-[120px]"
            style={{ background: 'radial-gradient(circle, var(--accent), transparent 65%)' }}
          />
        </motion.div>
        <motion.div className="absolute -right-[10%] top-[20%]" style={{ x: b2x, y: b2y }}>
          <div
            className="aurora h-[50vh] w-[50vh] rounded-full opacity-30 blur-[120px]"
            style={{ background: 'radial-gradient(circle, var(--accent-2), transparent 65%)', animationDelay: '-9s' }}
          />
        </motion.div>
        <div
          className="aurora absolute bottom-[-20%] left-[30%] h-[45vh] w-[45vh] rounded-full opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(circle, var(--accent-2), transparent 65%)', animationDelay: '-14s' }}
        />
        {/* Ghost "60" watermark */}
        <div
          aria-hidden
          className="absolute -bottom-24 -right-10 select-none text-[26rem] font-black leading-none opacity-40"
          style={{ WebkitTextStroke: '1.5px var(--line)', color: 'transparent' }}
        >
          60
        </div>
      </div>

      {/* Film grain — sits above everything, purely aesthetic */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.05]" />

      {/* Frosted top nav */}
      <header className="no-print sticky top-0 z-50 border-b border-line bg-glass backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <button onClick={() => setTab('today')} className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-[13px] font-black text-white" style={{ backgroundImage: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}>
              60
            </span>
            <span className="hidden text-[15px] font-semibold tracking-tight text-ink sm:block">Neel Barmecha</span>
          </button>

          <nav className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const active = tab === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-elevated"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              )
            })}
          </nav>

          <ProgressRing day={day} />
          <button
            onClick={() => setSound((s) => !s)}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink sm:flex"
            aria-label="Toggle sound"
            title={sound ? 'Sound on' : 'Sound off'}
          >
            {sound ? '♪' : '−'}
          </button>
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === 'today' && <Today store={store} />}
            {tab === 'plan' && <Plan />}
            {tab === 'schedule' && <Schedule />}
            {tab === 'content' && <Content />}
            {tab === 'career' && <Career />}
            {tab === 'apartment' && <Apartment store={store} />}
            {tab === 'body' && <Body />}
            {tab === 'trading' && <Trading store={store} />}
            {tab === 'review' && <Review store={store} />}
            {tab === 'reference' && <Reference />}
          </motion.div>
        </AnimatePresence>

        <footer className="mt-16 border-t border-line pt-8 text-center text-[13px] text-faint">
          Built for visible life change in public · 60 days · 4 goals · Not medical or financial advice.
        </footer>
      </main>
    </div>
  )
}
