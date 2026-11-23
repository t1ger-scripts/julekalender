import type {
  ActivitiesData,
  CalendarData,
  CalendarDoor,
  QuizEntry,
} from '../types/calendar'
import { calendarDates } from '../utils/calendar'

// Henter en JSON-fil fra projektets public/data-mappe.
async function readJson<T>(filename: string): Promise<T> {
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/${filename}`,
  )

  if (!response.ok) {
    throw new Error(`Kunne ikke hente ${filename}.`)
  }

  return response.json() as Promise<T>
}

// Indlæser låger, spilindstillinger og quizspørgsmål.
export async function loadCalendarData(): Promise<CalendarData> {
  const [doors, activities, quizzes] = await Promise.all([
    readJson<CalendarDoor[]>('doors.json'),
    readJson<ActivitiesData>('activities.json'),
    readJson<QuizEntry[]>('quiz.json'),
  ])

  // Hver forventet dato skal forekomme præcis én gang.
  if (
    !Array.isArray(doors) ||
    doors.length !== calendarDates.length ||
    !calendarDates.every(
      (date) =>
        doors.filter((door) => door?.date === date).length === 1,
    )
  ) {
    throw new Error('Kalenderen skal indeholde de 25 forventede datoer.')
  }

  if (
    !activities?.wheel ||
    !activities.scratch ||
    !activities.memory ||
    !activities.quiz
  ) {
    throw new Error('Der mangler indstillinger til en aktivitet.')
  }

  if (
    !Array.isArray(activities.wheel.segments) ||
    activities.wheel.segments.length !== 8
  ) {
    throw new Error('Lykkehjulet skal have otte felter.')
  }

  if (!Array.isArray(quizzes)) {
    throw new Error('Quizfilen skal indeholde en liste med spørgsmål.')
  }

  for (const door of doors) {
    if (
      !['wheel', 'scratch', 'memory', 'quiz'].includes(door.activity)
    ) {
      throw new Error(`Ukendt aktivitet for ${door.date}.`)
    }

    if (
      door.activity === 'quiz' &&
      quizzes.filter((entry) => entry?.id === door.quizId).length !== 1
    ) {
      throw new Error(`Quizreferencen er ugyldig for ${door.date}.`)
    }
  }

  return {
    doors: [...doors].sort((a, b) => a.date.localeCompare(b.date)),
    activities,
    quizzes,
  }
}