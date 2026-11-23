import type {
  ActivityResult,
  SavedActivityResult,
} from '../types/calendar'
import { calendarDates } from './calendar'

const storageKey = 'ringsted-dun:2026:activity-results'

// Kontrollerer data, der kommer fra browserens lokale lagring.
function isSavedResult(value: unknown): value is SavedActivityResult {
  if (typeof value !== 'object' || value === null) return false

  if (
    !('date' in value) ||
    !('tickets' in value) ||
    !('discountPercent' in value)
  ) {
    return false
  }

  return (
    typeof value.date === 'string' &&
    calendarDates.includes(value.date) &&
    typeof value.tickets === 'number' &&
    Number.isInteger(value.tickets) &&
    value.tickets >= 0 &&
    typeof value.discountPercent === 'number' &&
    Number.isFinite(value.discountPercent) &&
    value.discountPercent >= 0 &&
    value.discountPercent <= 100
  )
}

// Henter gyldige resultater. Hver dato kan kun forekomme én gang.
export function loadActivityResults(): SavedActivityResult[] {
  try {
    const stored = localStorage.getItem(storageKey)

    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)

    if (!Array.isArray(parsed)) return []

    const results: SavedActivityResult[] = []

    for (const value of parsed) {
      if (
        isSavedResult(value) &&
        !results.some((result) => result.date === value.date)
      ) {
        results.push({
          date: value.date,
          tickets: value.tickets,
          discountPercent: value.discountPercent,
        })
      }
    }

    return results.sort((a, b) => a.date.localeCompare(b.date))
  } catch {
    return []
  }
}

// Gemmer dagens første resultat og bevarer allerede gemte belønninger.
// Returnerer resultatlisten, så kalenderens visning kan opdateres.
export function saveActivityResult(
  date: string,
  result: ActivityResult,
): SavedActivityResult[] {
  const savedResult: SavedActivityResult = {
    date,
    tickets: result.tickets,
    discountPercent: result.discountPercent,
  }

  if (!isSavedResult(savedResult)) {
    throw new Error('Aktivitetsresultatet er ugyldigt.')
  }

  const results = loadActivityResults()

  if (results.some((existing) => existing.date === date)) {
    return results
  }

  const updatedResults = [...results, savedResult].sort(
    (a, b) => a.date.localeCompare(b.date),
  )

  // En fejl sendes videre, så kalenderen kan vise,
  // at belønningen ikke kunne gemmes.
  localStorage.setItem(storageKey, JSON.stringify(updatedResults))

  return updatedResults
}