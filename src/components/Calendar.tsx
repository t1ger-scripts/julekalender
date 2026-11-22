import { useState } from 'react'
import Door from './Door'

interface CalendarProps {
  currentDay: number
  completedDays: number[]
  onOpenDoor: (day: number) => void
}

// Eksempelværdier, indtil vi tilkobler dato og gemt fremgang.
const visibleDoors = 5
const lastStartDay = 24 - visibleDoors + 1

// Adventsdage i december 2026.
// Første advent falder den 29. november og er uden for kalenderen.
const adventDays: Record<number, number> = {
  6: 2,
  13: 3,
  20: 4,
}

// Viser fem låger og navigation mellem kalenderens dage.
function Calendar({
  currentDay,
  completedDays,
  onOpenDoor,
}: CalendarProps) {
  const [startDay, setStartDay] = useState(() =>
    Math.max(1, Math.min(currentDay - 2, lastStartDay)),
  )

  function getDoorStatus(day: number) {
    if (day > currentDay) return 'locked'
    if (completedDays.includes(day)) return 'completed'
    if (day === currentDay) return 'available'
    return 'missed'
  }

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