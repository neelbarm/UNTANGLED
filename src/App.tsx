import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from './store'
import { useTheme } from './hooks/useTheme'
import { tabTransition } from './lib/motion'
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
  { key: 'today', label: 'Today', emoji: '◇' },
  { key: 'plan', label: 'Plan', emoji: '◈' },
  { key: 'schedule', label: 'Flow', emoji: '❯' },
  { key: 'content', label: 'Content', emoji: '✳' },
  { key: 'career', label: 'Career', emoji: '◆' },
  { key: 'apartment', label: 'Apartment', emoji: '⌂' },
  { key: 'body', label: 'Body', emoji: '❤' },
  { key: 'trading', label: 'Trading', emoji: '↗' },
  { key: 'review', label: 'Review', emoji: '↺' },
  { key: 'reference', label: 'Reference', emoji: '✎' },
] as const

type TabKey = (typeof TABS)[number]['key']

export default function App() {
  const store = useStore()
  const [theme, toggleTheme] = useTheme()
  const [tab, setTab] = useState<TabKey>('today')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const select = (k: TabKey) => {
    setTab(k)
    setDrawerOpen(false)
  }

  const nav = (
    <nav className="flex flex-col gap-0.5">
      {TABS.map((t) => {
        const active = tab === t.key
        return (
          <button
            key={t.key}
            onClick={() => select(t.key)}
            className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              active ? 'text-ink' : 'text-muted hover:bg-hover hover:text-ink'
            }`}
          >
            {active && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-lg bg-elevated"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <span aria-hidden className="relative z-10 w-4 text-center text-[13px] text-faint">{t.emoji}</span>
            <span className="relative z-10 font-medium">{t.label}</span>
          </button>
        )
      })}
    </nav>
  )

  const brand = (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-black text-canvas">
        60
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-ink">Neel Barmecha</div>
        <div className="text-[11px] text-faint">60-Day Operating System</div>
      </div>
    </div>
  )

  const themeButton = (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-hover hover:text-ink"
      aria-label="Toggle theme"
    >
      <span className="w-4 text-center">{theme === 'dark' ? '☾' : '☀'}</span>
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )

  return (
    <div className="flex min-h-full bg-canvas">
      {/* Desktop sidebar */}
      <aside className="no-print sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-sidebar px-3 py-4 lg:flex">
        <div className="px-2 pb-5">{brand}</div>
        <div className="flex-1 overflow-y-auto">{nav}</div>
        <div className="mt-3 border-t border-line pt-3">{themeButton}</div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="no-print fixed inset-0 z-30 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              className="no-print fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-sidebar px-3 py-4 lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="px-2 pb-5">{brand}</div>
              <div className="flex-1 overflow-y-auto">{nav}</div>
              <div className="mt-3 border-t border-line pt-3">{themeButton}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="no-print sticky top-0 z-20 flex items-center justify-between border-b border-line bg-canvas/85 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-hover"
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          {brand}
          <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-hover" aria-label="Toggle theme">
            {theme === 'dark' ? '☾' : '☀'}
          </button>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              variants={tabTransition}
              initial="initial"
              animate="animate"
              exit="exit"
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

          <footer className="mt-12 border-t border-line pt-6 text-center text-xs text-faint">
            Built for visible life change in public · 60 days · 4 goals · Not medical or financial advice.
          </footer>
        </main>
      </div>
    </div>
  )
}
