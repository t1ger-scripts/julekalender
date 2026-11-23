import { calendarDates } from './calendar'

const storageKey = 'ringsted-dun:2026:completed-days'

// Henter gennemførte datoer og understøtter tidligere gemte dagnumre.
export function loadCompletedDays(): string[] {
  try {
    const stored = localStorage.getItem(storageKey)

    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)

    if (!Array.isArray(parsed)) return []

    const dates = parsed.map((value: unknown) => {
      if (
        typeof value === 'number' &&
        Number.isInteger(value) &&
        value >= 1 &&
        value <= 24
      ) {
        return `2026-12-${String(value).padStart(2, '0')}`
      }

      return value
    })

    const validDates = dates.filter(
      (date): date is string =>
        typeof date === 'string' && calendarDates.includes(date),
    )

    return [...new Set(validDates)].sort()
  } catch {
    return []
  }
}

// Gemmer gennemførte datoer i brugerens browser.
export function saveCompletedDays(dates: string[]): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(dates))
  } catch {
    console.warn('Kalenderens fremgang kunne ikke gemmes.')
  }
}