import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from './store'
import { useTheme } from './hooks/useTheme'
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

export default function App() {
  const store = useStore()
  const [theme, toggleTheme] = useTheme()
  const [tab, setTab] = useState<TabKey>('today')

  return (
    <div className="relative min-h-full overflow-x-hidden">
      {/* Animated aurora backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="aurora absolute -left-[10%] -top-[15%] h-[55vh] w-[55vh] rounded-full opacity-40 blur-[120px]"
          style={{ background: 'radial-gradient(circle, var(--accent), transparent 65%)' }}
        />
        <div
          className="aurora absolute -right-[10%] top-[20%] h-[50vh] w-[50vh] rounded-full opacity-30 blur-[120px]"
          style={{ background: 'radial-gradient(circle, var(--accent-2), transparent 65%)', animationDelay: '-9s' }}
        />
      </div>

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
