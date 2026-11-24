import { formatCalendarDate } from '../utils/calendar'

interface DoorProps {
  date: string
  status: 'available' | 'completed' | 'locked' | 'missed'
  onOpen: () => void
  adventNumber?: number
}

const statusLabels = {
  available: 'Dagens gave',
  completed: 'Gennemført',
  locked: 'Låst',
  missed: 'Ikke åbnet',
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
    status === 'completed' ? 'Se dit resultat' : 'Åbn gaven'

  const className = [
    'door',
    `door--${status}`,
    adventNumber ? 'door--advent' : '',
    isChristmas ? 'door--christmas' : '',
  ].filter(Boolean).join(' ')

  let statusText = statusLabels[status]

  if (!isPast && adventNumber) {
    statusText = `${adventNumber}. advent`
  }

  if (!isPast && isChristmas) {
    statusText = 'Juleaften'
  }

  function renderIcon() {
    if (isChristmas) {
      return (
        <svg viewBox="0 0 24 24" className="door__star">
          <path d="m12 2 3 6.5 7 .9-5.1 4.9 1.3 7-6.2-3.4-6.2 3.4 1.3-7L2 9.4l7-.9Z" />
        </svg>
      )
    }

    if (adventNumber) {
      const iconState =
        isPast || status === 'locked' ? 'locked' : 'active'

      return (
        <img
          src={`/images/calendar/candles/advent-${adventNumber}-${iconState}.png`}
          alt=""
        />
      )
    }

    if (status === 'completed') {
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 3 3 5-6" />
        </svg>
      )
    }

    if (status === 'locked') {
      return (
        <img
          src="/images/calendar/lock-red-big.png"
          alt=""
        />
      )
    }

    return (
      <img
        src="/images/calendar/door-gift-golden-big.png"
        alt=""
      />
    )
  }

  return (
    <article className={className} data-door-date={date}>
      <div className="door__header">
        <img src="/images/branding/logo.webp" alt="Ringsted Dun" />
      </div>

      <div className="door__body">
        <div className="door__icon" aria-hidden="true">
          {renderIcon()}
        </div>

        <span className="door__day">{day}</span>
        <span className="door__month">{month}</span>

        <p className="door__status">{statusText}</p>

        <div className="door__footer">
          {canOpen && (
            <button
              type="button"
              className="door__button"
              onClick={onOpen}
              aria-label={`${buttonText} - ${formatCalendarDate(date)}`}
            >
              {buttonText}
            </button>
          )}

          {status === 'locked' && (
            <p className="door__notice">
              Åbner {day}. {shortMonth}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default Door
