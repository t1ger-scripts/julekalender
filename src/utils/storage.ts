// Gemmer fremgang separat for julekalenderen 2026.
const storageKey = 'ringsted-dun:2026:completed-days'

// Henter gennemførte dage og kontrollerer det gemte format.
export function loadCompletedDays(): number[] {
  try {
    const stored = localStorage.getItem(storageKey)

    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)

    if (!Array.isArray(parsed)) return []

    const validDays = parsed.filter(
      (day): day is number =>
        typeof day === 'number' &&
        Number.isInteger(day) &&
        day >= 1 &&
        day <= 24,
    )

    return [...new Set(validDays)].sort((a, b) => a - b)
  } catch {
    return []
  }
}

// Gemmer gennemførte dage i brugerens browser.
export function saveCompletedDays(days: number[]): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(days))
  } catch {
    console.warn('Kalenderens fremgang kunne ikke gemmes.')
  }
}