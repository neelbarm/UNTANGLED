import { motion } from 'framer-motion'
import { CHALLENGE_LENGTH, challengeDay, prettyDate, weekdayLong, weekOfDay } from '../lib/dates'
import { WEEK_THEMES } from '../data/masterPlan'
import { DAILY_FLOW, DAY_CONTEXT } from '../data/dailyFlow'
import { DAILY_CHECKLIST } from '../data/dailyChecklist'
import { GOAL_META } from '../data/types'
import type { Store } from '../store'
import { AnimatedCheck, GoalTag, MotionGroup, MotionItem, ProgressBar, Section, Stat } from './ui'

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
      {/* Cinematic hero */}
      <motion.div
        className="mb-14 pt-4 text-center sm:pt-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-[13px] font-semibold uppercase tracking-[0.25em] text-accent">
          {notStarted ? 'Challenge not started' : `Week ${week} · ${theme.phase}`}
        </div>
        <div className="mt-3 flex items-end justify-center gap-3">
          <span className="grad-text text-7xl font-semibold leading-none tracking-tighter sm:text-8xl">
            {notStarted ? '—' : `Day ${day}`}
          </span>
          <span className="pb-2 text-2xl font-medium text-faint sm:text-3xl">/ {CHALLENGE_LENGTH}</span>
        </div>
        <div className="mt-4 text-[15px] text-muted">{prettyDate(todayISO)}</div>
        {dayContext && (
          <div className="mt-4 inline-flex rounded-full border border-line bg-card px-4 py-1.5 text-[13px] text-muted backdrop-blur-xl">
            {dayContext}
          </div>
        )}

        <div className="mx-auto mt-8 max-w-lg">
          <div className="mb-2 flex justify-between text-xs text-faint">
            <span>Progress</span>
            <span>{Math.round((Math.max(0, day) / CHALLENGE_LENGTH) * 100)}%</span>
          </div>
          <ProgressBar value={Math.max(0, day)} max={CHALLENGE_LENGTH} />
          <label className="mt-4 inline-flex items-center gap-2 text-xs text-faint">
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
          <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-line bg-card p-5 text-left backdrop-blur-xl">
            <div className="text-[15px] font-semibold text-ink">This week — {theme.title}</div>
            <div className="mt-1.5 text-[14px] leading-relaxed text-muted">{theme.focus}</div>
            <div className="mt-3 flex items-center gap-2 text-[13px] text-accent">
              <span aria-hidden>🎬</span>
              <span>Flagship Reel: {theme.filmThis}</span>
            </div>
          </div>
        )}
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
