import { totalDoors } from '../utils/calendar'

interface DecemberJourneyProps {
  completedDoors: number
  currentDate: string
  onOpenResults: () => void
}

const milestones = [
  { date: '2026-11-29', label: '1. advent', adventNumber: 1 },
  { date: '2026-12-06', label: '2. advent', adventNumber: 2 },
  { date: '2026-12-13', label: '3. advent', adventNumber: 3 },
  { date: '2026-12-20', label: '4. advent', adventNumber: 4 },
  { date: '2026-12-24', label: 'Juleaften', adventNumber: null },
]

function getTimestamp(date: string): number {
  return Date.parse(`${date}T00:00:00Z`)
}

// Viser brugerens gennemførte aktiviteter og datoernes milepæle.
function DecemberJourney({
  completedDoors,
  currentDate,
  onOpenResults,
}: DecemberJourneyProps) {
  const nextIndex = milestones.findIndex(
    (milestone) => milestone.date > currentDate,
  )

  let progress = 0

  if (nextIndex === -1) {
    progress = 100
  } else if (nextIndex > 0) {
    const previousDate = getTimestamp(milestones[nextIndex - 1].date)
    const nextDate = getTimestamp(milestones[nextIndex].date)
    const today = getTimestamp(currentDate)

    const fraction = (today - previousDate) / (nextDate - previousDate)

    progress =
      ((nextIndex - 1 + fraction) / (milestones.length - 1)) * 100
  }

  return (
    <div className="december-journey">
      <button
        type="button"
        className="december-journey__collection"
        onClick={onOpenResults}
        aria-haspopup="dialog"
      >
        <span className="december-journey__collection-title">
          Mine resultater
        </span>

        <img
          src="/images/calendar/door-gift-red-small.png"
          alt=""
        />

        <span className="december-journey__collection-count">
          {completedDoors} / {totalDoors} aktiviteter gennemført
        </span>
      </button>

      <div className="december-journey__timeline">
        <div className="december-journey__track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        <ol className="december-journey__milestones">
          {milestones.map((milestone) => {
            const isReached = currentDate >= milestone.date
            const iconState = isReached ? 'active' : 'locked'

            const shortDate =
              `${Number(milestone.date.slice(8, 10))}/` +
              Number(milestone.date.slice(5, 7))

            return (
              <li
                key={milestone.date}
                className={
                  `december-journey__milestone` +
                  (isReached ? ' is-reached' : '')
                }
              >
                <div
                  className="december-journey__icon"
                  aria-hidden="true"
                >
                  {milestone.adventNumber ? (
                    <img
                      src={
                        '/images/calendar/candles/' +
                        `advent-${milestone.adventNumber}-${iconState}.png`
                      }
                      alt=""
                    />
                  ) : (
                    <span>★</span>
                  )}
                </div>

                <span
                  className="december-journey__marker"
                  aria-hidden="true"
                >
                  {isReached && '✓'}
                </span>

                <p>{milestone.label} · {shortDate}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default DecemberJourney
