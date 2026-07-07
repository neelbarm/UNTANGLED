import { DAILY_FLOW, WEEKLY_ANCHORS } from '../data/dailyFlow'
import { Bullets, Card, GoalTag, Section } from './ui'

export function Schedule() {
  return (
    <div>
      <Section
        title="The Daily Flow"
        subtitle="One repeatable flow you work through and tick off — no clock times, just the shape of the day. Check it off live on the Today tab."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {DAILY_FLOW.map((phase) => (
            <Card key={phase.phase}>
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">{phase.phase}</div>
              <ul className="space-y-1.5">
                {phase.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-2.5 rounded-md px-1 py-1">
                    <span className="h-4 w-4 shrink-0 rounded border border-line" />
                    <span className="flex-1 text-sm text-muted">
                      {item.label}
                      {item.note && <span className="ml-1.5 text-[11px] text-faint">· {item.note}</span>}
                    </span>
                    <GoalTag goal={item.goal} small />
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Weekly Anchors"
        subtitle="The fixed rhythm of the week — the realities the daily flow bends around."
      >
        <Card>
          <Bullets items={WEEKLY_ANCHORS} />
        </Card>
      </Section>
    </div>
  )
}
