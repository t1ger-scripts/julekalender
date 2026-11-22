import type { CalendarData } from '../types/calendar'

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

  if (!Array.isArray(doors) || doors.length !== 24) {
    throw new Error('Kalenderen skal indeholde 24 låger.')
  }

  return { doors, activities }
}