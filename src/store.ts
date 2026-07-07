import { useLocalStorage } from './hooks/useLocalStorage'
import { toISODate } from './lib/dates'
import type { ApartmentOption } from './data/apartment'
import type { TradingScorecard } from './data/trading'
import type { WeeklyReview } from './data/review'

// One store hook holding all persistent challenge state. Kept flat and simple:
// a start date, a map of per-day records, apartment options, and weekly reviews.

export interface DayRecord {
  checklist: Record<string, boolean>
  flow: Record<string, boolean>
  weight: string
  steps: string
  sleep: string
  scorecard: Partial<TradingScorecard>
  notes: string
}

export function emptyDay(): DayRecord {
  return { checklist: {}, flow: {}, weight: '', steps: '', sleep: '', scorecard: {}, notes: '' }
}

function todayISO(): string {
  return toISODate(new Date())
}

export function useStore() {
  const [startDate, setStartDate] = useLocalStorage<string>('sixty:startDate', todayISO())
  const [days, setDays] = useLocalStorage<Record<string, DayRecord>>('sixty:days', {})
  const [apartments, setApartments] = useLocalStorage<ApartmentOption[]>('sixty:apartments', [])
  const [reviews, setReviews] = useLocalStorage<Record<number, WeeklyReview>>('sixty:reviews', {})

  function getDay(iso: string): DayRecord {
    return days[iso] ?? emptyDay()
  }

  function updateDay(iso: string, patch: Partial<DayRecord>) {
    setDays((prev) => ({ ...prev, [iso]: { ...emptyDay(), ...prev[iso], ...patch } }))
  }

  function toggleChecklist(iso: string, itemId: string) {
    setDays((prev) => {
      const cur = prev[iso] ?? emptyDay()
      return {
        ...prev,
        [iso]: { ...cur, checklist: { ...cur.checklist, [itemId]: !cur.checklist[itemId] } },
      }
    })
  }

  function toggleFlow(iso: string, itemId: string) {
    setDays((prev) => {
      const cur = prev[iso] ?? emptyDay()
      return {
        ...prev,
        [iso]: { ...cur, flow: { ...cur.flow, [itemId]: !cur.flow[itemId] } },
      }
    })
  }

  return {
    startDate,
    setStartDate,
    days,
    getDay,
    updateDay,
    toggleChecklist,
    toggleFlow,
    apartments,
    setApartments,
    reviews,
    setReviews,
    todayISO: todayISO(),
  }
}

export type Store = ReturnType<typeof useStore>
