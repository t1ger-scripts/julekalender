import type { CalendarDoor } from '../types/calendar'
import { formatCalendarDate } from '../utils/calendar'

interface ResultOverviewProps {
  doors: CalendarDoor[]
  currentDate: string
  completedDates: string[]
  onSelectResult: (date: string) => void
}

function ResultOverview({
  doors,
  currentDate,
  completedDates,
  onSelectResult,
}: ResultOverviewProps) {
  function getStatus(date: string) {
    if (date > currentDate) return 'locked'
    if (completedDates.includes(date)) return 'completed'
    if (date === currentDate) return 'available'
    return 'missed'
  }

  return (
    <div className="result-overview">
      <div className="result-overview__intro">
        <h2>Min julesamling</h2>
        <p>
          Genbesøg dine åbnede låger, og se dagens præmier
          og dine ekstra gevinster.
        </p>
      </div>

      <ul className="result-overview__grid">
        {doors.map((door) => {
          const status = getStatus(door.date)
          const isToday = door.date === currentDate
          const day = Number(door.date.slice(8, 10))
          const isNovember = door.date.slice(5, 7) === '11'
          const month = isNovember ? 'November' : 'December'
          const shortMonth = isNovember ? 'nov.' : 'dec.'

          const statusText = {
            completed: 'Se din låge',
            locked: `Åbner ${day}. ${shortMonth}`,
            available: 'Åbn i kalenderen',
            missed: 'Misset',
          }[status]

          const className =
            `result-overview__day result-overview__day--${status}`

          const content = (
            <>
              {isToday && (
                <span className="result-overview__today">I dag</span>
              )}

              <span className="result-overview__icon" aria-hidden="true">
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
                    src="/images/calendar/door-gift-golden-big.png"
                    alt=""
                  />
                )}

                {status === 'missed' && '–'}
              </span>

              <span className="result-overview__number">{day}</span>
              <span className="result-overview__month">{month}</span>
              <span className="result-overview__status">{statusText}</span>
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
                  onClick={() => onSelectResult(door.date)}
                  aria-label={
                    `${formatCalendarDate(door.date)} – Se din låge` +
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

export default ResultOverview
