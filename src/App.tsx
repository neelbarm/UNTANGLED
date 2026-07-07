import { useState } from 'react'
import { useStore } from './store'
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
  { key: 'today', label: 'Today', emoji: '⚡' },
  { key: 'plan', label: 'Plan', emoji: '🗺️' },
  { key: 'schedule', label: 'Flow', emoji: '🧭' },
  { key: 'content', label: 'Content', emoji: '🎬' },
  { key: 'career', label: 'Career', emoji: '💼' },
  { key: 'apartment', label: 'Apartment', emoji: '🏙️' },
  { key: 'body', label: 'Body', emoji: '💪' },
  { key: 'trading', label: 'Trading', emoji: '📈' },
  { key: 'review', label: 'Review', emoji: '🔄' },
  { key: 'reference', label: 'Reference', emoji: '📌' },
] as const

type TabKey = (typeof TABS)[number]['key']

export default function App() {
  const store = useStore()
  const [tab, setTab] = useState<TabKey>('today')

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-ink-950/85 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember-500 font-black text-ink-950">
                60
              </div>
              <div>
                <div className="text-sm font-bold leading-tight text-white">Neel Barmecha</div>
                <div className="text-[11px] leading-tight text-white/45">60-Day Operating System</div>
              </div>
            </div>
            <a
              href="#"
              className="no-print hidden text-xs text-white/40 sm:block"
              onClick={(e) => {
                e.preventDefault()
                window.print()
              }}
            >
              Print
            </a>
          </div>
          {/* Tabs */}
          <nav className="no-print mt-3 flex gap-1 overflow-x-auto pb-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  tab === t.key
                    ? 'bg-white text-ink-950'
                    : 'text-white/55 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span aria-hidden>{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-5xl px-4 py-6">
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
      </main>

      <footer className="mx-auto max-w-5xl px-4 py-8 text-center text-xs text-white/30">
        Built for visible life change in public · 60 days · 4 goals · Not medical or financial advice.
      </footer>
    </div>
  )
}
