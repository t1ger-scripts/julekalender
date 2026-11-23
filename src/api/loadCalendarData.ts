import type { CalendarData, CalendarDoor } from '../types/calendar'
import { calendarDates } from '../utils/calendar'

// Henter kalenderindhold fra projektets lokale JSON-filer.
export async function loadCalendarData(): Promise<CalendarData> {
  const baseUrl = import.meta.env.BASE_URL

  const [doorsResponse, activitiesResponse] = await Promise.all([
    fetch(`${baseUrl}data/doors.json`),
    fetch(`${baseUrl}data/activities.json`),
  ])

  if (!doorsResponse.ok || !activitiesResponse.ok) {
    throw new Error('Kalenderindholdet kunne ikke hentes.')
  }

  const [doors, activities] = await Promise.all([
    doorsResponse.json(),
    activitiesResponse.json(),
  ])

  if (
    !Array.isArray(doors) ||
    doors.length !== calendarDates.length ||
    !calendarDates.every(
      (date) =>
        doors.filter(
          (door) =>
            door !== null &&
            typeof door === 'object' &&
            door.date === date,
        ).length === 1,
    )
  ) {
    throw new Error('Kalenderen skal indeholde de 25 forventede datoer.')
  }

  const sortedDoors = (doors as CalendarDoor[]).sort((a, b) =>
    a.date.localeCompare(b.date),
  )

  return { doors: sortedDoors, activities }
}