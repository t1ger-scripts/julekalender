const calendarYear = 2026
const millisecondsPerDay = 24 * 60 * 60 * 1000

// Finder kalenderdagen ud fra datoen i Danmark.
// Før december bliver værdien under 1.
// Efter juleaften bliver værdien over 24.
export function getCalendarDay(now = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Copenhagen',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(now)

  const year = Number(parts.find((part) => part.type === 'year')?.value)
  const month = Number(parts.find((part) => part.type === 'month')?.value)
  const day = Number(parts.find((part) => part.type === 'day')?.value)

  const today = Date.UTC(year, month - 1, day)
  const firstDecember = Date.UTC(calendarYear, 11, 1)

  return Math.round((today - firstDecember) / millisecondsPerDay) + 1
}