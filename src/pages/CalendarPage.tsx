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

// Samler kalenderens indhold, brugerens fremgang og handlinger.
function CalendarPage() {
  // Midlertidig dato, mens aktiviteterne kobles til.
  const currentDay = 8

  const [completedDays] = useState<number[]>(loadCompletedDays)

  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const selectedDoor = calendarDoors.find(
    (door) => door.day === selectedDay,
  )

  // Foreløbig beregning, indtil gruppen har aftalt lodreglerne.
  const tickets = completedDays.length

  useEffect(() => {
    saveCompletedDays(completedDays)
  }, [completedDays])

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
          title={`Gave ${selectedDoor.day}`}
          onClose={() => setSelectedDay(null)}
          info={
            <>
              <h2>Gave {selectedDoor.day}</h2>
              <p>{selectedDoor.day}. december</p>
            </>
          }
        >
          <p>Aktiviteten vises her.</p>
        </ActivityModal>
      )}

    </CalendarLayout>
  )
}

export default CalendarPage