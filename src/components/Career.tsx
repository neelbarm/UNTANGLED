import {
  CAREER_THESIS,
  NETWORKING_CADENCE,
  OUTREACH_TARGETS,
  PROOF_OF_WORK,
  WEEKLY_APPLICATION_GOALS,
  WHAT_TO_POST_TO_LOOK_HIREABLE,
} from '../data/career'
import { Bullets, Card, Section } from './ui'

export function Career() {
  return (
    <div>
      <Thesis text={CAREER_THESIS} accent="#5aa9ff" label="Career Thesis" />

      <Section title="Outreach Targets" subtitle="Who to reach — and the angle that actually lands.">
        <div className="grid gap-3 md:grid-cols-2">
          {OUTREACH_TARGETS.map((t) => (
            <Card key={t.group}>
              <div className="font-semibold text-white">{t.group}</div>
              <p className="mt-1.5 text-sm text-white/70">
                <span className="text-white/40">Who:</span> {t.who}
              </p>
              <p className="mt-1.5 text-sm text-white/70">
                <span className="text-white/40">Angle:</span> {t.angle}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Weekly Application Goals" subtitle="Volume with intent — quality over spray.">
        <Card>
          <div className="space-y-2">
            {WEEKLY_APPLICATION_GOALS.map((g) => (
              <div key={g.metric} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/5 pb-2 last:border-0">
                <div>
                  <span className="text-sm font-medium text-white">{g.metric}</span>
                  <span className="ml-2 text-xs text-white/40">{g.note}</span>
                </div>
                <span className="rounded-full bg-signal-blue/15 px-2.5 py-0.5 text-xs font-semibold text-signal-blue">
                  {g.target}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <div className="grid gap-3 lg:grid-cols-2">
        <Section title="Networking Cadence" subtitle="Turn one conversation into three.">
          <Card>
            <Bullets items={NETWORKING_CADENCE} />
          </Card>
        </Section>
        <Section title="Proof-of-Work Ideas" subtitle="Build the thing that gets you hired.">
          <Card>
            <Bullets items={PROOF_OF_WORK} />
          </Card>
        </Section>
      </div>

      <Section title="What to Post to Look Hireable" subtitle="Let the work ask for you.">
        <Card>
          <Bullets items={WHAT_TO_POST_TO_LOOK_HIREABLE} />
        </Card>
      </Section>
    </div>
  )
}

export function Thesis({ text, accent, label }: { text: string; accent: string; label: string }) {
  return (
    <div className="mb-6 rounded-2xl border p-5" style={{ borderColor: `${accent}30`, backgroundColor: `${accent}0d` }}>
      <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
        {label}
      </div>
      <p className="mt-2 text-base font-medium leading-snug text-white">{text}</p>
    </div>
  )
}
