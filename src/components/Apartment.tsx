import {
  APARTMENT_STATUSES,
  APARTMENT_THESIS,
  DOCUMENT_CHECKLIST,
  NEIGHBORHOOD_WORKFLOW,
  URGENCY_AND_TRACKING,
  WEEKLY_APARTMENT_TASKS,
  type ApartmentOption,
} from '../data/apartment'
import type { Store } from '../store'
import { Bullets, Card, Section } from './ui'
import { Thesis } from './Career'

const STATUS_COLOR: Record<ApartmentOption['status'], string> = {
  Researching: '#8a8a99',
  'Viewing booked': '#5b86c9',
  Viewed: '#c0a24a',
  Applied: '#5b9d78',
  Backup: '#9a78c2',
  Passed: '#cf6b6b',
}

export function Apartment({ store }: { store: Store }) {
  const { apartments, setApartments } = store

  function addOption() {
    const id = `${apartments.length + 1}-${apartments.reduce((m, a) => Math.max(m, Number(a.id.split('-')[0]) || 0), 0) + 1}`
    setApartments([
      ...apartments,
      { id, address: '', neighborhood: '', rent: '', commute: '', score: 5, status: 'Researching', notes: '' },
    ])
  }

  function update(id: string, patch: Partial<ApartmentOption>) {
    setApartments(apartments.map((a) => (a.id === id ? { ...a, ...patch } : a)))
  }

  function remove(id: string) {
    setApartments(apartments.filter((a) => a.id !== id))
  }

  return (
    <div>
      <Thesis text={APARTMENT_THESIS} accent="#9a78c2" label="Apartment Thesis" />

      <Section title="Weekly Tasks" subtitle="A phased hunt — decide, view, verify, sign.">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {WEEKLY_APARTMENT_TASKS.map((w) => (
            <Card key={w.week}>
              <div className="mb-2 text-sm font-semibold text-ink">{w.week}</div>
              <ul className="space-y-1.5 text-sm text-muted">
                {w.tasks.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9a78c2]" />
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Interactive options tracker */}
      <Section title="Options Tracker" subtitle="Score every place the same way. Always keep a #2 alive.">
        <div className="mb-3">
          <button
            onClick={addOption}
            className="rounded-xl border border-[#9a78c2]/40 bg-[#9a78c2]/10 px-4 py-2 text-sm font-medium text-[#9a78c2] transition hover:bg-[#9a78c2]/20"
          >
            + Add apartment
          </button>
        </div>
        {apartments.length === 0 ? (
          <Card>
            <p className="text-sm text-faint">No options yet. Add your first apartment to start tracking and scoring.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {apartments.map((a) => (
              <Card key={a.id}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Field label="Address" value={a.address} onChange={(v) => update(a.id, { address: v })} placeholder="123 Example St" />
                  <Field label="Neighborhood" value={a.neighborhood} onChange={(v) => update(a.id, { neighborhood: v })} placeholder="e.g. Bushwick" />
                  <Field label="Rent" value={a.rent} onChange={(v) => update(a.id, { rent: v })} placeholder="$/mo" />
                  <Field label="Commute" value={a.commute} onChange={(v) => update(a.id, { commute: v })} placeholder="e.g. 35 min" />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2">
                    <span className="text-xs text-faint">Score</span>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={a.score}
                      onChange={(e) => update(a.id, { score: Number(e.target.value) })}
                      className="w-32 accent-[#9a78c2]"
                    />
                    <span className="w-6 font-mono text-sm font-semibold text-[#9a78c2]">{a.score}</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-xs text-faint">Status</span>
                    <select
                      value={a.status}
                      onChange={(e) => update(a.id, { status: e.target.value as ApartmentOption['status'] })}
                      className="rounded-lg border border-line bg-elevated px-2 py-1 text-sm text-ink outline-none"
                      style={{ color: STATUS_COLOR[a.status] }}
                    >
                      {APARTMENT_STATUSES.map((s) => (
                        <option key={s} value={s} className="text-ink">
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button onClick={() => remove(a.id)} className="ml-auto text-xs text-faint hover:text-signal-red">
                    Remove
                  </button>
                </div>
                <div className="mt-3">
                  <Field label="Notes" value={a.notes} onChange={(v) => update(a.id, { notes: v })} placeholder="Light, landlord, next action…" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <div className="grid gap-3 lg:grid-cols-3">
        <Section title="Document Checklist" subtitle="Have this go-bag ready to submit in an hour.">
          <Card>
            <ul className="space-y-2">
              {DOCUMENT_CHECKLIST.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-[#9a78c2]/50" />
                  {d}
                </li>
              ))}
            </ul>
          </Card>
        </Section>
        <Section title="Neighborhood Workflow" subtitle="Filter on paper, then verify on foot.">
          <Card>
            <Bullets items={NEIGHBORHOOD_WORKFLOW} />
          </Card>
        </Section>
        <Section title="Urgency & Tracking" subtitle="Create your own deadline.">
          <Card>
            <Bullets items={URGENCY_AND_TRACKING} />
          </Card>
        </Section>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs text-faint">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-elevated px-3 py-2 text-sm text-ink outline-none focus:border-[#9a78c2] placeholder:text-faint"
      />
    </label>
  )
}
