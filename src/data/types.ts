// Shared types for the static content that drives the dashboard.

export type Goal = 'Body' | 'Trading' | 'Career' | 'Apartment' | 'Meta'

export const GOALS: Goal[] = ['Body', 'Trading', 'Career', 'Apartment', 'Meta']

export const GOAL_META: Record<Goal, { label: string; blurb: string; accent: string }> = {
  Body: { label: 'Body', blurb: 'Lose 10 lbs through consistent habits', accent: '#3ddc84' },
  Trading: { label: 'Trading', blurb: '$25k via process, discipline & risk control', accent: '#ff9d4d' },
  Career: { label: 'Career', blurb: 'Land a VC / startup / AI role', accent: '#5aa9ff' },
  Apartment: { label: 'Apartment', blurb: 'Move into an NYC apartment', accent: '#c78bff' },
  Meta: { label: 'Brand', blurb: 'Build the public brand & the challenge itself', accent: '#ffd24d' },
}

export interface WeekTheme {
  week: number
  phase: string
  title: string
  focus: string
  bodyMove: string
  tradingMove: string
  careerMove: string
  apartmentMove: string
  contentMove: string
  filmThis: string
}

export interface ChecklistItem {
  id: string
  label: string
  goal: Goal
  detail?: string
}

export interface ScheduleBlock {
  time: string
  label: string
  goal: Goal
  note?: string
}

export interface DaySchedule {
  key: string // 'mon', 'tue', ...
  day: string
  type: 'Class' | 'Build' | 'Reset'
  headline: string
  blocks: ScheduleBlock[]
}

export interface ReelIdea {
  id: number
  goal: Goal
  title: string
  hook: string
  film: string
  caption: string
  series?: string
}

export interface ContentPillar {
  name: string
  goal: Goal
  promise: string
  examples: string[]
}

export interface Series {
  name: string
  cadence: string
  format: string
  why: string
}
