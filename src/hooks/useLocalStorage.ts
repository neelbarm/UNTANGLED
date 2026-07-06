import { useCallback, useEffect, useState } from 'react'

/**
 * A tiny typed localStorage-backed state hook. Keeps the whole dashboard
 * persistent across reloads with no backend. Values are JSON-serialized.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // Storage full or unavailable (private mode) — fail quietly; the app
      // still works for the current session.
    }
  }, [key, state])

  const set = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => (typeof value === 'function' ? (value as (p: T) => T)(prev) : value))
  }, [])

  return [state, set]
}
