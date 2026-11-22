interface DoorProps {
  day: number
  status: 'available' | 'completed' | 'locked' | 'missed'
  onOpen: () => void
  adventNumber?: number
}

// Viser en låge med dato, status og knap.
function Door({ day, status, onOpen, adventNumber }: DoorProps) {
  const isDisabled = status === 'locked' || status === 'missed'
  const isChristmas = day === 24

  const statusText = {
    available: 'Dagens låge',
    completed: 'Gennemført',
    locked: 'Låst',
    missed: 'Misset',
  }

  const buttonText = {
    available: 'Åbn lågen',
    completed: 'Genbesøg',
    locked: `Åbner ${day}. dec.`,
    missed: 'Dagen er udløbet',
  }

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
              src={`/images/icons/calendar/icon-candles-advent-${adventNumber}-${isDisabled ? 'locked' : 'active'}.png`}
              alt=""
            />
          ) : (
            <>
              {status === 'available' && (
                <img
                  src="/images/icons/calendar/icon-feather-black.png"
                  alt=""
                />
              )}

              {status === 'completed' && (
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8 12 3 3 5-6" />
                </svg>
              )}

              {status === 'locked' && (
                <img
                  src="/images/icons/calendar/icon-lock-red-big.png"
                  alt=""
                  className="door__lock"
                />
              )}

              {status === 'missed' && (
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m9 9 6 6m0-6-6 6" />
                </svg>
              )}
            </>
          )}
        </div>

        <span className="door__day">{day}</span>
        <span className="door__month">December</span>

        <p className="door__status">
          {isChristmas
            ? 'Juleaften'
            : adventNumber
              ? `${adventNumber}. advent`
              : statusText[status]}
        </p>

        <button
          type="button"
          className="door__button"
          disabled={isDisabled}
          onClick={onOpen}
          aria-label={`${buttonText[status]} - ${day}. december`}
        >
          {buttonText[status]}
        </button>
      </div>
    </article>
  )
}

export default Door