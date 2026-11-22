import { useState } from 'react'
import Door from './Door'

interface CalendarProps {
  onOpenDoor: (day: number) => void
}

// Eksempelværdier, indtil vi tilkobler dato og gemt fremgang.
const currentDay = 8
const completedDays = [6, 7]
const visibleDoors = 5
const lastStartDay = 24 - visibleDoors + 1

// Adventsdage i december 2026.
// Første advent falder den 29. november og er uden for kalenderen.
const adventDays: Record<number, number> = {
  6: 2,
  13: 3,
  20: 4,
}

function getDoorStatus(day: number) {
  if (completedDays.includes(day)) return 'completed'
  if (day === currentDay) return 'available'
  if (day < currentDay) return 'missed'
  return 'locked'
}

// Viser fem låger og navigation mellem kalenderens dage.
function Calendar({ onOpenDoor }: CalendarProps) {
  const [startDay, setStartDay] = useState(6)

  const days = Array.from(
    { length: visibleDoors },
    (_, index) => startDay + index,
  )

  return (
    <section className="calendar" aria-label="Julekalenderens låger">
      <button
        type="button"
        className="calendar__arrow"
        aria-label="Vis tidligere låger"
        disabled={startDay === 1}
        onClick={() => setStartDay((day) => day - 1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6 9 12l6 6" />
        </svg>
      </button>

      <div className="calendar__doors">
        {days.map((day) => (
          <Door
            key={day}
            day={day}
            status={getDoorStatus(day)}
            onOpen={() => onOpenDoor(day)}
            adventNumber={adventDays[day]}
          />
        ))}
      </div>

      <button
        type="button"
        className="calendar__arrow"
        aria-label="Vis kommende låger"
        disabled={startDay === lastStartDay}
        onClick={() => setStartDay((day) => day + 1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
    </section>
  )
}

export default Calendar