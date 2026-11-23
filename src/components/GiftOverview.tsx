import type { CalendarDoor } from '../types/calendar'
import { formatCalendarDate } from '../utils/calendar'

interface GiftOverviewProps {
  doors: CalendarDoor[]
  currentDate: string
  completedDates: string[]
  onSelectGift: (date: string) => void
}

const statusLabels = {
  completed: 'Se din gave',
  locked: 'Låst',
  available: 'Åbn i kalenderen',
  missed: 'Ikke åbnet',
}

// Viser alle datoer og giver adgang til gennemførte dages belønninger.
function GiftOverview({
  doors,
  currentDate,
  completedDates,
  onSelectGift,
}: GiftOverviewProps) {
  function getStatus(date: string) {
    if (date > currentDate) return 'locked'
    if (completedDates.includes(date)) return 'completed'
    if (date === currentDate) return 'available'
    return 'missed'
  }

  return (
    <div className="gift-overview">
      <div className="gift-overview__intro">
        <h2>Mine gaver</h2>

        <p>
          Vælg en gennemført dag for at se din gemte belønning.
        </p>
      </div>

      <ul className="gift-overview__grid">
        {doors.map((door) => {
          const status = getStatus(door.date)
          const day = Number(door.date.slice(8, 10))
          const month =
            door.date.slice(5, 7) === '11' ? 'November' : 'December'

          return (
            <li key={door.date}>
              <button
                type="button"
                className={`gift-overview__day gift-overview__day--${status}`}
                disabled={status !== 'completed'}
                onClick={() => onSelectGift(door.date)}
                aria-label={
                  `${formatCalendarDate(door.date)} - ` +
                  statusLabels[status]
                }
              >
                <span
                  className="gift-overview__icon"
                  aria-hidden="true"
                >
                  {status === 'completed' && '✓'}

                  {status === 'locked' && (
                    <img
                      src="/images/icons/calendar/icon-lock-red-big.png"
                      alt=""
                    />
                  )}

                  {status === 'available' && (
                    <img
                      src="/images/icons/calendar/icon-door-gift-golden-big.png"
                      alt=""
                    />
                  )}

                  {status === 'missed' && '–'}
                </span>

                <span className="gift-overview__number">{day}</span>
                <span className="gift-overview__month">{month}</span>
                <span className="gift-overview__status">
                  {statusLabels[status]}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GiftOverview