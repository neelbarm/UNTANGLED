import { BODY_ACCOUNTABILITY, BODY_DAILY_TRACK, BODY_DISCLAIMER, BODY_HABITS, BODY_THESIS } from '../data/body'
import { Bullets, Card, Disclaimer, Section } from './ui'
import { Thesis } from './Career'

export function Body() {
  return (
    <div>
      <Disclaimer>{BODY_DISCLAIMER}</Disclaimer>
      <Thesis text={BODY_THESIS} accent="#5b9d78" label="Body Thesis" />

      <Section title="The Habit System" subtitle="Six habits, repeated for 60 days. General and non-medical by design.">
        <div className="grid gap-3 md:grid-cols-2">
          {BODY_HABITS.map((h) => (
            <Card key={h.name}>
              <div className="font-semibold text-ink">{h.name}</div>
              <p className="mt-1.5 text-sm text-muted">
                <span className="text-faint">How:</span> {h.how}
              </p>
              <p className="mt-1.5 text-sm text-muted">
                <span className="text-faint">Why:</span> {h.why}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <div className="grid gap-3 lg:grid-cols-2">
        <Section title="What to Track Daily" subtitle="These feed the trackers on the Today tab.">
          <Card>
            <ul className="space-y-2">
              {BODY_DAILY_TRACK.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-muted">
                  <span className="h-4 w-4 shrink-0 rounded border border-signal-green/50" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </Section>
        <Section title="Accountability" subtitle="Public tracking makes skipping expensive.">
          <Card>
            <Bullets items={BODY_ACCOUNTABILITY} />
          </Card>
        </Section>
      </div>
    </div>
  )
}
