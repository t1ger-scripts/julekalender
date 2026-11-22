import type { CalendarDoor } from '../types/calendar'

// Adventsdage i december 2026.
// Første advent falder før kalenderens start.
const adventDays: Record<number, number> = {
  6: 2,
  13: 3,
  20: 4,
}

// Kalenderens indhold. Brugerens fremgang gemmes separat.
export const calendarDoors: CalendarDoor[] = Array.from(
  { length: 24 },
  (_, index) => {
    const day = index + 1
    const adventNumber = adventDays[day]

    return {
      day,
      activity: adventNumber ? 'advent' : null,
      adventNumber,
    }
  },
)