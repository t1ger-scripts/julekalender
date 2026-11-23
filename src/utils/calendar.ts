export const calendarDates = [
  '2026-11-29',
  ...Array.from(
    { length: 24 },
    (_, index) => `2026-12-${String(index + 1).padStart(2, '0')}`,
  ),
]

export const totalDoors = calendarDates.length

// Finder dagens dato i Danmark.
export function getCalendarDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Copenhagen',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)

  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value

  return `${year}-${month}-${day}`
}

// Formaterer datoen til eksempelvis "29. november".
export function formatCalendarDate(date: string): string {
  return new Intl.DateTimeFormat('da-DK', {
    timeZone: 'Europe/Copenhagen',
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${date}T12:00:00Z`))
}