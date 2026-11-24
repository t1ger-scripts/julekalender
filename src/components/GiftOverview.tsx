import type { CalendarDoor } from '../types/calendar'
import { formatCalendarDate } from '../utils/calendar'

interface GiftOverviewProps {
  doors: CalendarDoor[]
  currentDate: string
  completedDates: string[]
  onSelectGift: (date: string) => void
}

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
        <p>Vælg en gennemført dag for at se din gemte belønning.</p>
      </div>

      <ul className="gift-overview__grid">
        {doors.map((door) => {
          const status = getStatus(door.date)
          const isToday = door.date === currentDate
          const day = Number(door.date.slice(8, 10))
          const isNovember = door.date.slice(5, 7) === '11'
          const month = isNovember ? 'November' : 'December'
          const shortMonth = isNovember ? 'nov.' : 'dec.'

          const statusText = {
            completed: 'Se din gave',
            locked: `Åbner ${day}. ${shortMonth}`,
            available: 'Åbn i kalenderen',
            missed: 'Misset',
          }[status]

          const className =
            `gift-overview__day gift-overview__day--${status}`

          const content = (
            <>
              {isToday && (
                <span className="gift-overview__today">I dag</span>
              )}

              <span className="gift-overview__icon" aria-hidden="true">
                {status === 'completed' && (
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8 12 3 3 5-6" />
                  </svg>
                )}

                {status === 'locked' && (
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
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
              <span className="gift-overview__status">{statusText}</span>
            </>
          )

          return (
            <li
              key={door.date}
              aria-current={isToday ? 'date' : undefined}
            >
              {status === 'completed' ? (
                <button
                  type="button"
                  className={className}
                  onClick={() => onSelectGift(door.date)}
                  aria-label={
                    `${formatCalendarDate(door.date)} – Se din gave` +
                    (isToday ? ' – I dag' : '')
                  }
                >
                  {content}
                </button>
              ) : (
                <div className={className}>{content}</div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GiftOverview