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
        <span aria-hidden="true">‹</span>
      </button>

      <div className="calendar__doors">
        {days.map((day) => (
          <Door
            key={day}
            day={day}
            status={getDoorStatus(day)}
            onOpen={() => onOpenDoor(day)}
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
        <span aria-hidden="true">›</span>
      </button>
    </section>
  )
}

export default Calendar