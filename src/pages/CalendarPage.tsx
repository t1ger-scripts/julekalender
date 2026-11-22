import { useEffect, useState } from 'react'
import {
  loadCompletedDays,
  saveCompletedDays,
} from '../utils/storage'
import CalendarLayout from '../templates/CalendarLayout'
import Header from '../components/Header'
import Calendar from '../components/Calendar'
import DecemberJourney from '../components/DecemberJourney'
import CalendarRoute from '../components/CalendarRoute'
import ActivityModal from '../components/ActivityModal'
import { calendarDoors } from '../data/doors'
import { getCalendarDay } from '../utils/calendar'
import ActivityInfo from '../components/ActivityInfo'
import { activityContents } from '../data/activities'

// Lokal testdato: 1-24 vælger en decemberdag.
// Sæt til null for at bruge den rigtige dato.
const testDay: number | null = 8

function getCurrentDay(): number {
  if (import.meta.env.DEV && testDay !== null) {
    return testDay
  }

  return getCalendarDay()
}

// Samler kalenderens indhold, brugerens fremgang og handlinger.
function CalendarPage() {
  const [currentDay, setCurrentDay] = useState(getCurrentDay)

  const [completedDays] = useState<number[]>(loadCompletedDays)

  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const selectedDoor = calendarDoors.find(
    (door) => door.day === selectedDay,
  )

  const activityContent = selectedDoor?.activity
    ? activityContents[selectedDoor.activity]
    : null

  // Foreløbig beregning, indtil gruppen har aftalt lodreglerne.
  const tickets = completedDays.length

  useEffect(() => {
    saveCompletedDays(completedDays)
  }, [completedDays])

  // Opdaterer datoen, hvis siden står åben hen over midnat.
  useEffect(() => {
    function updateDay() {
      setCurrentDay(getCurrentDay())
    }

    const intervalId = window.setInterval(updateDay, 60_000)

    window.addEventListener('focus', updateDay)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', updateDay)
    }
  }, [])

  return (
    <CalendarLayout
      header={
        <Header
          tickets={tickets}
          completedDoors={completedDays.length}
        />
      }
      journey={
        <DecemberJourney
          completedDoors={completedDays.length}
          currentDay={currentDay}
        />
      }
    >
      <div className="calendar-intro">
        <h1 className="calendar-intro__title">
          <span aria-hidden="true">✦</span>
          Julekalender 2026
          <span aria-hidden="true">✦</span>
        </h1>

        <p className="calendar-intro__description">
          24 låger. Ét juleeventyr.
        </p>
      </div>

      <Calendar
        currentDay={currentDay}
        completedDays={completedDays}
        onOpenDoor={(day) => {
          if (day !== currentDay && !completedDays.includes(day)) return

          setSelectedDay(day)
        }}
      />

      <CalendarRoute />

      {selectedDoor && (
        <ActivityModal
          title={activityContent?.title ?? `Gave ${selectedDoor.day}`}
          onClose={() => setSelectedDay(null)}
          info={
            <ActivityInfo
              title={activityContent?.title ?? `Gave ${selectedDoor.day}`}
              progress={completedDays.length}
              description={
                activityContent?.description ?? [
                  `${selectedDoor.day}. december`,
                ]
              }
              rules={activityContent?.rules ?? []}
            />
          }
        >
          <p>Aktiviteten vises her.</p>
        </ActivityModal>
      )}

    </CalendarLayout>
  )
}

export default CalendarPage