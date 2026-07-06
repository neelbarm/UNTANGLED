import { PHASES, WEEK_THEMES } from '../data/masterPlan'
import { Card, Section } from './ui'

export function Plan() {
  return (
    <div>
      <Section title="The 60-Day Master Plan" subtitle="Three phases, nine weeks. One theme per week — all four goals always moving.">
        <div className="grid gap-3 md:grid-cols-3">
          {PHASES.map((p) => (
            <Card key={p.name}>
              <div className="text-xs font-semibold uppercase tracking-wider text-ember-400">{p.range}</div>
              <div className="mt-1 text-base font-semibold text-white">{p.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p.thesis}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Weekly themes">
        <div className="space-y-3">
          {WEEK_THEMES.map((w) => (
            <Card key={w.week}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-white/25">W{w.week}</span>
                  <div>
                    <div className="text-base font-semibold text-white">{w.title}</div>
                    <div className="text-xs uppercase tracking-wider text-ember-400">{w.phase}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-ember-400">
                  <span aria-hidden>🎬</span>
                  <span className="max-w-xs text-right text-white/50">{w.filmThis}</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-white/60">{w.focus}</p>
              <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                <Move label="Body" color="#3ddc84" text={w.bodyMove} />
                <Move label="Trading" color="#ff9d4d" text={w.tradingMove} />
                <Move label="Career" color="#5aa9ff" text={w.careerMove} />
                <Move label="Apartment" color="#c78bff" text={w.apartmentMove} />
                <Move label="Content" color="#ffd24d" text={w.contentMove} />
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Move({ label, color, text }: { label: string; color: string; text: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-ink-850 p-2.5">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
        {label}
      </div>
      <div className="text-white/65">{text}</div>
    </div>
  )
}
