import {
  EMOTIONAL_PROMPTS,
  MAX_RISK_RULES,
  POST_MARKET_REVIEW,
  PRE_MARKET_CHECKLIST,
  SHAREABLE_TRADING_CONTENT,
  TRADING_DISCLAIMER,
  TRADING_THESIS,
  type TradingScorecard,
} from '../data/trading'
import type { Store } from '../store'
import { Bullets, Card, Disclaimer, Section } from './ui'
import { Thesis } from './Career'

export function Trading({ store }: { store: Store }) {
  const { todayISO, getDay, updateDay } = store
  const rec = getDay(todayISO)
  const sc = rec.scorecard

  function setSc(patch: Partial<TradingScorecard>) {
    updateDay(todayISO, { scorecard: { ...sc, ...patch } })
  }

  return (
    <div>
      <Disclaimer>{TRADING_DISCLAIMER}</Disclaimer>
      <Thesis text={TRADING_THESIS} accent="#ff9d4d" label="Trading Thesis" />

      <div className="grid gap-3 lg:grid-cols-2">
        <Section title="Pre-Market Checklist" subtitle="No position until every box is checked.">
          <Card>
            <Bullets items={PRE_MARKET_CHECKLIST} />
          </Card>
        </Section>
        <Section title="Post-Market Review" subtitle="The edge is built after the close.">
          <Card>
            <Bullets items={POST_MARKET_REVIEW} />
          </Card>
        </Section>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Section title="Max-Risk Rules" subtitle="Non-negotiable. Green days don't change them.">
          <Card>
            <Bullets items={MAX_RISK_RULES} />
          </Card>
        </Section>
        <Section title="Emotional-Control Prompts" subtitle="Ask before you click.">
          <Card>
            <ul className="space-y-2 text-sm text-white/75">
              {EMOTIONAL_PROMPTS.map((p, i) => (
                <li key={i} className="rounded-lg border border-white/8 bg-ink-850 px-3 py-2 italic">
                  "{p}"
                </li>
              ))}
            </ul>
          </Card>
        </Section>
      </div>

      {/* Interactive daily scorecard */}
      <Section title="Today's Trading Scorecard" subtitle="Grade the process, not the profit. Saved to today's log.">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScoreSlider label="Followed my plan (1–10)" value={sc.followedPlan ?? 5} onChange={(v) => setSc({ followedPlan: v })} />
            <ScoreSlider label="Emotional state — calm (1–10)" value={sc.emotionalState ?? 5} onChange={(v) => setSc({ emotionalState: v })} />
            <NumberField label="Rule breaks today" value={sc.ruleBreaks ?? 0} onChange={(v) => setSc({ ruleBreaks: v })} />
            <div className="flex items-end gap-4">
              <Toggle label="Journaled" value={!!sc.journaled} onChange={(v) => setSc({ journaled: v })} />
              <Toggle label="Max-loss respected" value={sc.maxLossRespected ?? true} onChange={(v) => setSc({ maxLossRespected: v })} />
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <TextField label="Best decision" value={sc.bestDecision ?? ''} onChange={(v) => setSc({ bestDecision: v })} />
            <TextField label="Worst decision" value={sc.worstDecision ?? ''} onChange={(v) => setSc({ worstDecision: v })} />
            <TextField label="One fix for tomorrow" value={sc.lessonTomorrow ?? ''} onChange={(v) => setSc({ lessonTomorrow: v })} />
          </div>
        </Card>
      </Section>

      {/* Shareable content guidance */}
      <Section title="What to Share (Without Looking Fake)" subtitle="Process content builds trust. Hype destroys it.">
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-signal-green/25">
            <div className="mb-2 text-sm font-semibold text-signal-green">✓ Do share</div>
            <Bullets items={SHAREABLE_TRADING_CONTENT.do} />
          </Card>
          <Card className="border-signal-red/25">
            <div className="mb-2 text-sm font-semibold text-signal-red">✕ Never share</div>
            <Bullets items={SHAREABLE_TRADING_CONTENT.dont} />
          </Card>
        </div>
      </Section>
    </div>
  )
}

function ScoreSlider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-mono font-semibold text-ember-400">{value}</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-ember-500"
      />
    </label>
  )
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm text-white/70">{label}</div>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="w-24 rounded-lg border border-white/15 bg-ink-800 px-3 py-1.5 text-white outline-none focus:border-ember-500"
      />
    </label>
  )
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs text-white/50">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/15 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-ember-500"
      />
    </label>
  )
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
        value ? 'border-signal-green/50 bg-signal-green/10 text-signal-green' : 'border-white/15 bg-ink-800 text-white/50'
      }`}
    >
      {value ? '✓ ' : '○ '}
      {label}
    </button>
  )
}
