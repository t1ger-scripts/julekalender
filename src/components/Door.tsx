import { formatCalendarDate } from '../utils/calendar'

interface DoorProps {
  date: string
  status: 'available' | 'completed' | 'locked' | 'missed'
  onOpen: () => void
  adventNumber?: number
}

// Viser dato, status og eventuel handling for en kalenderlåge.
function Door({ date, status, onOpen, adventNumber }: DoorProps) {
  const day = Number(date.slice(8, 10))
  const isNovember = date.slice(5, 7) === '11'
  const month = isNovember ? 'November' : 'December'
  const shortMonth = isNovember ? 'nov.' : 'dec.'
  const isChristmas = date === '2026-12-24'
  const isPast = status === 'completed' || status === 'missed'
  const canOpen = status === 'available' || status === 'completed'

  const buttonText =
    status === 'completed' ? 'Se din gave' : 'Åbn gaven'

  const statusText = isPast
    ? status === 'completed'
      ? 'Gennemført'
      : 'Ikke åbnet'
    : isChristmas
      ? 'Juleaften'
      : adventNumber
        ? `${adventNumber}. advent`
        : status === 'locked'
          ? 'Låst'
          : 'Dagens gave'

  return (
    <article
      className={`door door--${status}${adventNumber ? ' door--advent' : ''}${isChristmas ? ' door--christmas' : ''}`}
    >
      <div className="door__header">
        <img src="/images/logo.webp" alt="Ringsted Dun" />
      </div>

      <div className="door__body">
        <div className="door__icon" aria-hidden="true">
          {isChristmas ? (
            <svg viewBox="0 0 24 24" className="door__star">
              <path d="m12 2 3 6.5 7 .9-5.1 4.9 1.3 7-6.2-3.4-6.2 3.4 1.3-7L2 9.4l7-.9Z" />
            </svg>
          ) : adventNumber ? (
            <img
              src={`/images/icons/calendar/icon-candles-advent-${adventNumber}-${isPast || status === 'locked' ? 'locked' : 'active'}.png`}
              alt=""
            />
          ) : status === 'completed' ? (
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 3 3 5-6" />
            </svg>
          ) : status === 'locked' ? (
            <img
              src="/images/icons/calendar/icon-lock-red-big.png"
              alt=""
              className="door__lock"
            />
          ) : (
            <img
              src="/images/icons/calendar/icon-door-gift-golden-big.png"
              alt=""
            />
          )}
        </div>

        <span className="door__day">{day}</span>
        <span className="door__month">{month}</span>

        <p className="door__status">{statusText}</p>

        <div className="door__footer">
          {canOpen ? (
            <button
              type="button"
              className="door__button"
              onClick={onOpen}
              aria-label={`${buttonText} - ${formatCalendarDate(date)}`}
            >
              {buttonText}
            </button>
          ) : status === 'locked' ? (
            <p className="door__notice">
              Åbner {day}. {shortMonth}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default Door