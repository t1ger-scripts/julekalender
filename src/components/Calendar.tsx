import { useEffect, useState } from 'react'
import Door from './Door'
import type { CalendarDoor } from '../types/calendar'

interface CalendarProps {
  currentDay: number
  completedDays: number[]
  calendarDoors: CalendarDoor[]
  onOpenDoor: (day: number) => void
}

const compactQuery = '(max-width: 1200px)'

// Viser kalenderens låger med den valgte dag i midten.
function Calendar({
  calendarDoors,
  currentDay,
  completedDays,
  onOpenDoor,
}: CalendarProps) {
  const [visibleCount, setVisibleCount] = useState(() =>
    window.matchMedia(compactQuery).matches ? 3 : 5,
  )

  const [centerIndex, setCenterIndex] = useState(() => {
    const index = calendarDoors.findIndex(
      (door) => door.day >= currentDay,
    )

    return index === -1
      ? Math.max(0, calendarDoors.length - 1)
      : index
  })

  // Tilpasser antallet af låger, når vinduets bredde ændres.
  useEffect(() => {
    const mediaQuery = window.matchMedia(compactQuery)

    function updateVisibleCount() {
      setVisibleCount(mediaQuery.matches ? 3 : 5)
    }

    mediaQuery.addEventListener('change', updateVisibleCount)

    return () => {
      mediaQuery.removeEventListener('change', updateVisibleCount)
    }
  }, [])

  function getDoorStatus(day: number) {
    if (day > currentDay) return 'locked'
    if (completedDays.includes(day)) return 'completed'
    if (day === currentDay) return 'available'
    return 'missed'
  }

  const middleSlot = Math.floor(visibleCount / 2)

  const visibleSlots = Array.from(
    { length: visibleCount },
    (_, slotIndex) => {
      const doorIndex = centerIndex + slotIndex - middleSlot

      return calendarDoors[doorIndex] ?? null
    },
  )

  return (
    <section className="calendar" aria-label="Julekalenderens låger">
      <button
        type="button"
        className="calendar__arrow"
        aria-label="Vis tidligere låger"
        disabled={centerIndex === 0}
        onClick={() =>
          setCenterIndex((index) => Math.max(0, index - 1))
        }
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6 9 12l6 6" />
        </svg>
      </button>

      <div className="calendar__doors">
        {visibleSlots.map((door, slotIndex) =>
          door ? (
            <Door
              key={door.day}
              day={door.day}
              status={getDoorStatus(door.day)}
              onOpen={() => onOpenDoor(door.day)}
              adventNumber={door.adventNumber}
            />
          ) : (
            <div
              key={`empty-${slotIndex}`}
              className="calendar__placeholder"
              aria-hidden="true"
            />
          ),
        )}
      </div>

      <button
        type="button"
        className="calendar__arrow"
        aria-label="Vis kommende låger"
        disabled={centerIndex >= calendarDoors.length - 1}
        onClick={() =>
          setCenterIndex((index) =>
            Math.min(calendarDoors.length - 1, index + 1),
          )
        }
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
    </section>
  )
}

export default Calendar