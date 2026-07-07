// Day-X math for the 80-day challenge. Everything is computed from a single
// user-set start date so the whole dashboard stays in sync.

export const CHALLENGE_LENGTH = 80

/** Return YYYY-MM-DD for a Date in local time (stable key for per-day records). */
export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Parse a YYYY-MM-DD string into a local Date at midnight. */
export function fromISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Whole days between two ISO dates (b - a). */
export function daysBetween(aISO: string, bISO: string): number {
  const a = fromISODate(aISO).getTime()
  const b = fromISODate(bISO).getTime()
  return Math.round((b - a) / 86_400_000)
}

/**
 * Given a start date and "today", return the current challenge day (1-based).
 * Clamped to the 1..80 window; returns 0 before the challenge begins.
 */
export function challengeDay(startISO: string, todayISO: string): number {
  const diff = daysBetween(startISO, todayISO)
  if (diff < 0) return 0
  return Math.min(CHALLENGE_LENGTH, diff + 1)
}

/** Week index (1-based) for a given challenge day. Weeks are blocks of 7. */
export function weekOfDay(day: number): number {
  if (day <= 0) return 0
  return Math.ceil(day / 7)
}

/** Short weekday label for an ISO date, e.g. "Mon". */
export function weekdayShort(iso: string): string {
  return fromISODate(iso).toLocaleDateString('en-US', { weekday: 'short' })
}

/** Full weekday label, e.g. "Monday". */
export function weekdayLong(iso: string): string {
  return fromISODate(iso).toLocaleDateString('en-US', { weekday: 'long' })
}

/** Human date, e.g. "Mon, Jul 6". */
export function prettyDate(iso: string): string {
  return fromISODate(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

/** ISO date N days from the given ISO date. */
export function addDaysISO(iso: string, n: number): string {
  const d = fromISODate(iso)
  d.setDate(d.getDate() + n)
  return toISODate(d)
}
