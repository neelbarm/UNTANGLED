import { CHALLENGE_LENGTH, challengeDay, prettyDate, weekdayLong, weekOfDay } from '../lib/dates'
import { WEEK_THEMES } from '../data/masterPlan'
import { DAILY_FLOW, DAY_CONTEXT } from '../data/dailyFlow'
import { DAILY_CHECKLIST } from '../data/dailyChecklist'
import { GOAL_META } from '../data/types'
import type { Store } from '../store'
import { GoalTag, ProgressBar, Section, Stat } from './ui'

export function Today({ store }: { store: Store }) {
  const { startDate, setStartDate, todayISO, getDay, toggleChecklist, toggleFlow, updateDay } = store
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

  return (
    <div>
      {/* Hero */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-br from-ink-850 to-ink-900 p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-ember-400">
              {notStarted ? 'Challenge not started' : `Week ${week} · ${theme.phase}`}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tight text-white">
                {notStarted ? '—' : `Day ${day}`}
              </span>
              <span className="text-lg text-white/40">/ {CHALLENGE_LENGTH}</span>
            </div>
            <div className="mt-1 text-sm text-white/50">{prettyDate(todayISO)}</div>
            {dayContext && (
              <div className="mt-2 inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                {dayContext}
              </div>
            )}
          </div>
          <label className="text-xs text-white/50">
            <span className="mr-2">Start date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value || todayISO)}
              className="rounded-lg border border-white/15 bg-ink-800 px-2 py-1 text-white/80 outline-none focus:border-ember-500"
            />
          </label>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs text-white/45">
            <span>Progress</span>
            <span>{Math.round((Math.max(0, day) / CHALLENGE_LENGTH) * 100)}%</span>
          </div>
          <ProgressBar value={Math.max(0, day)} max={CHALLENGE_LENGTH} />
        </div>
        {!notStarted && (
          <div className="mt-4 rounded-xl border border-white/10 bg-ink-900/60 p-3">
            <div className="text-sm font-semibold text-white">This week: {theme.title}</div>
            <div className="mt-1 text-sm text-white/60">{theme.focus}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-ember-400">
              <span aria-hidden>🎬</span>
              <span>Flagship Reel: {theme.filmThis}</span>
            </div>
          </div>
        )}
      </div>

      {/* Today's flow — check off what you did, in order, no clock times */}
      <Section
        title={`Today's Flow — ${weekdayLong(todayISO)}`}
        subtitle={`Work through it and tick what you did · ${flowDone}/${flowItems.length} done`}
      >
        <div className="mb-3">
          <ProgressBar value={flowDone} max={flowItems.length} accent="#ff7a18" />
        </div>
        <div className="space-y-4">
          {DAILY_FLOW.map((phase) => (
            <div key={phase.phase}>
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ember-400">{phase.phase}</div>
              <div className="space-y-2">
                {phase.items.map((item) => {
                  const on = !!rec.flow[item.id]
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleFlow(todayISO, item.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                        on ? 'border-ember-500/40 bg-ember-500/5' : 'border-white/10 bg-ink-900 hover:border-white/20'
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                          on ? 'border-ember-500 bg-ember-500 text-ink-950' : 'border-white/25 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                      <span className="flex-1">
                        <span className={`text-sm ${on ? 'text-white/50 line-through' : 'text-white/85'}`}>
                          {item.label}
                        </span>
                        {item.note && <span className="ml-2 text-xs text-white/35">· {item.note}</span>}
                      </span>
                      <GoalTag goal={item.goal} small />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Daily non-negotiables — the minimum that must be true every day */}
      <Section
        title="Daily Non-Negotiables"
        subtitle={`The minimum bar for every challenge day · ${checkedCount}/${DAILY_CHECKLIST.length} done`}
      >
        <div className="mb-3">
          <ProgressBar value={checkedCount} max={DAILY_CHECKLIST.length} accent="#3ddc84" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {DAILY_CHECKLIST.map((item) => {
            const on = !!rec.checklist[item.id]
            return (
              <button
                key={item.id}
                onClick={() => toggleChecklist(todayISO, item.id)}
                className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                  on ? 'border-signal-green/40 bg-signal-green/5' : 'border-white/10 bg-ink-900 hover:border-white/20'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                    on ? 'border-signal-green bg-signal-green text-ink-950' : 'border-white/25 text-transparent'
                  }`}
                >
                  ✓
                </span>
                <span className="flex-1">
                  <span className={`block text-sm ${on ? 'text-white/50 line-through' : 'text-white/85'}`}>
                    {item.label}
                  </span>
                  {item.detail && <span className="mt-0.5 block text-xs text-white/35">{item.detail}</span>}
                </span>
                <span className="mt-0.5">
                  <GoalTag goal={item.goal} small />
                </span>
              </button>
            )
          })}
        </div>
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
          <Stat label="Flow done" value={`${flowDone}/${flowItems.length}`} accent="#ff9d4d" />
          <Stat label="Non-negotiables" value={`${checkedCount}/${DAILY_CHECKLIST.length}`} accent="#3ddc84" />
          <Stat label="Challenge day" value={notStarted ? '—' : String(day)} accent="#5aa9ff" />
          <Stat label="Days left" value={String(CHALLENGE_LENGTH - Math.max(0, day))} accent="#c78bff" />
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
    <label className="block rounded-xl border border-white/10 bg-ink-900 p-3">
      <span className="text-xs text-white/45">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode="decimal"
        className="mt-1 w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-white/20"
        style={{ caretColor: accent }}
      />
    </label>
  )
}
