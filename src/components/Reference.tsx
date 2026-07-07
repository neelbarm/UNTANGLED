import { DAY_ONE_SCRIPT, NOTION_DASHBOARD, SAMPLE_SCORECARD } from '../data/samples'
import { Card, Section } from './ui'

// The sample scorecard scores five lanes including "Content", which isn't part
// of the four-goal enum — so render a self-contained colored label here.
const LANE_COLOR: Record<string, string> = {
  Body: '#5b9d78',
  Trading: '#c88a49',
  Career: '#5b86c9',
  Apartment: '#9a78c2',
  Content: '#c0a24a',
}

function LaneTag({ lane }: { lane: string }) {
  const color = LANE_COLOR[lane] ?? '#8a8a99'
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{ borderColor: `${color}55`, color, backgroundColor: `${color}12` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {lane}
    </span>
  )
}

export function Reference() {
  return (
    <div>
      {/* Day One script */}
      <Section title={DAY_ONE_SCRIPT.title} subtitle={`${DAY_ONE_SCRIPT.runtime} · ${DAY_ONE_SCRIPT.format}`}>
        <Card>
          <div className="space-y-3">
            {DAY_ONE_SCRIPT.beats.map((b) => (
              <div key={b.t} className="flex gap-3">
                <span className="w-10 shrink-0 font-mono text-xs text-accent">{b.t}</span>
                <div>
                  <div className="text-xs italic text-faint">{b.direction}</div>
                  <div className="mt-0.5 text-sm text-ink">{b.line}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-line bg-elevated p-3">
            <div className="text-xs font-semibold text-faint">Caption</div>
            <p className="mt-1 text-sm text-muted">{DAY_ONE_SCRIPT.caption}</p>
          </div>
          <ul className="mt-3 space-y-1.5 text-xs text-faint">
            {DAY_ONE_SCRIPT.postingNotes.map((n) => (
              <li key={n} className="flex gap-2">
                <span aria-hidden className="text-accent">›</span>
                {n}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* Sample scorecard */}
      <Section title="Sample Weekly Scorecard" subtitle={SAMPLE_SCORECARD.week}>
        <Card>
          <div className="space-y-2">
            {SAMPLE_SCORECARD.goals.map((g) => (
              <div key={g.goal} className="flex flex-wrap items-center gap-3 border-b border-line py-2 last:border-0">
                <div className="w-24 shrink-0">
                  <LaneTag lane={g.goal} />
                </div>
                <span className="font-mono text-lg font-bold text-accent">{g.score}</span>
                <span className="flex-1 text-sm text-muted">{g.metric}</span>
                <span className="rounded-full bg-elevated px-2 py-0.5 text-xs text-faint">{g.trend}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <SampleField label="Biggest win" value={SAMPLE_SCORECARD.biggestWin} accent="#5b9d78" />
            <SampleField label="Biggest miss" value={SAMPLE_SCORECARD.biggestMiss} accent="#cf6b6b" />
            <SampleField label="One thing to fix" value={SAMPLE_SCORECARD.oneThingToFix} accent="#c0a24a" />
            <SampleField label="Next week priority" value={SAMPLE_SCORECARD.nextWeekPriority} accent="#5b86c9" />
          </div>
        </Card>
      </Section>

      {/* Notion dashboard structure */}
      <Section title="Notion Dashboard Structure" subtitle={NOTION_DASHBOARD.intro}>
        {NOTION_DASHBOARD.topLevel.map((t) => (
          <Card key={t.name} className="mb-3">
            <div className="font-semibold text-ink">{t.name}</div>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {t.children.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden className="text-accent">└</span>
                  {c}
                </li>
              ))}
            </ul>
          </Card>
        ))}
        <div className="grid gap-3 md:grid-cols-2">
          {NOTION_DASHBOARD.databases.map((db) => (
            <Card key={db.name}>
              <div className="font-semibold text-ink">{db.name}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-faint">Properties</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {db.props.map((p) => (
                  <span key={p} className="rounded-md bg-elevated px-2 py-0.5 text-[11px] text-muted">
                    {p}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-faint">Views</div>
              <ul className="mt-1 space-y-1 text-xs text-muted">
                {db.views.map((v) => (
                  <li key={v}>• {v}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}

function SampleField({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-line bg-elevated p-3">
      <div className="text-xs font-semibold" style={{ color: accent }}>
        {label}
      </div>
      <p className="mt-1 text-muted">{value}</p>
    </div>
  )
}
