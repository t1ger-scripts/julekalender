interface DoorProps {
  day: number
  status: 'available' | 'completed' | 'locked' | 'missed'
  onOpen: () => void
}

// Viser en låge med dato, status og knap.
function Door({ day, status, onOpen }: DoorProps) {
  const isDisabled = status === 'locked' || status === 'missed'

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
    <article className={`door door--${status}`}>
      <div className="door__header">
        <img src="/images/logo.webp" alt="Ringsted Dun" />
      </div>

      <div className="door__body">
        <span className="door__day">{day}</span>
        <span className="door__month">December</span>

        <p className="door__status">{statusText[status]}</p>

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