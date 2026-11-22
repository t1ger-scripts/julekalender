import Door from './Door'

interface CalendarProps {
  onOpenDoor: (day: number) => void
}

// Midlertidige eksempeldata til opsætning af kalenderens udseende.
const previewDoors = [
  { day: 6, status: 'completed' },
  { day: 7, status: 'completed' },
  { day: 8, status: 'available' },
  { day: 9, status: 'locked' },
  { day: 10, status: 'locked' },
] as const

// Viser kalenderens låger.
function Calendar({ onOpenDoor }: CalendarProps) {
  return (
    <section className="calendar" aria-label="Julekalenderens låger">
      <div className="calendar__doors">
        {previewDoors.map((door) => (
          <Door
            key={door.day}
            day={door.day}
            status={door.status}
            onOpen={() => onOpenDoor(door.day)}
          />
        ))}
      </div>
    </section>
  )
}

export default Calendar