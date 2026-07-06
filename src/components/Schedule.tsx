import { WEEKLY_SCHEDULE } from '../data/weeklySchedule'
import { Card, GoalTag, Section } from './ui'

const TYPE_COLOR: Record<string, string> = {
  Class: '#5aa9ff',
  Build: '#ff9d4d',
  Reset: '#c78bff',
}

export function Schedule() {
  return (
    <div>
      <Section
        title="Weekly Schedule Template"
        subtitle="Built around your real week: 5am gym, the NY market open, classes Tue/Wed/Fri, commute-as-content, building, and posting."
      >
        <div className="grid gap-3 lg:grid-cols-2">
          {WEEKLY_SCHEDULE.map((d) => (
            <Card key={d.key}>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold text-white">{d.day}</div>
                  <div className="text-xs text-white/50">{d.headline}</div>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ color: TYPE_COLOR[d.type], backgroundColor: `${TYPE_COLOR[d.type]}18` }}
                >
                  {d.type}
                </span>
              </div>
              <ol className="space-y-1">
                {d.blocks.map((b, i) => (
                  <li key={i} className="flex items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-white/5">
                    <span className="w-24 shrink-0 font-mono text-[11px] text-white/40">{b.time}</span>
                    <span className="flex-1 text-sm text-white/75">
                      {b.label}
                      {b.note && <span className="ml-1.5 text-[11px] text-white/35">· {b.note}</span>}
                    </span>
                    <GoalTag goal={b.goal} small />
                  </li>
                ))}
              </ol>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
