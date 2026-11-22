import { useState } from 'react'
import Door from './Door'
import type { CalendarDoor } from '../types/calendar'

interface CalendarProps {
  currentDay: number
  completedDays: number[]
  calendarDoors: CalendarDoor[]
  onOpenDoor: (day: number) => void
}

// Eksempelværdier, indtil vi tilkobler dato og gemt fremgang.
const visibleDoors = 5

// Viser fem låger og navigation mellem kalenderens dage.
function Calendar({
  calendarDoors,
  currentDay,
  completedDays,
  onOpenDoor,
}: CalendarProps) {
  const lastStartDay = calendarDoors.length - visibleDoors + 1
  
  const [startDay, setStartDay] = useState(() =>
    Math.max(1, Math.min(currentDay - 2, lastStartDay)),
  )

  function getDoorStatus(day: number) {
    if (day > currentDay) return 'locked'
    if (completedDays.includes(day)) return 'completed'
    if (day === currentDay) return 'available'
    return 'missed'
  }

  const visibleCalendarDoors = calendarDoors.slice(
    startDay - 1,
    startDay - 1 + visibleDoors,
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
        {visibleCalendarDoors.map((door) => (
          <Door
            key={door.day}
            day={door.day}
            status={getDoorStatus(door.day)}
            onOpen={() => onOpenDoor(door.day)}
            adventNumber={door.adventNumber}
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