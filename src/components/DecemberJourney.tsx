import { totalDoors } from '../utils/calendar'

interface DecemberJourneyProps {
  completedDoors: number
  currentDay: number
}

const milestones = [
  {
    day: -1,
    label: '1. advent',
    date: '29/11',
    icon: '/images/icons/calendar/icon-candles-advent-1-active.png',
  },
  {
    day: 6,
    label: '2. advent',
    date: '6/12',
    icon: '/images/icons/calendar/icon-candles-advent-2-active.png',
  },
  {
    day: 13,
    label: '3. advent',
    date: '13/12',
    icon: '/images/icons/calendar/icon-candles-advent-3-locked.png',
  },
  {
    day: 20,
    label: '4. advent',
    date: '20/12',
    icon: '/images/icons/calendar/icon-candles-advent-4-locked.png',
  },
  {
    day: 24,
    label: 'Juleaften',
    date: '24/12',
    icon: null,
  },
]

// Viser antal gennemførte gaver og kalenderens milepæle.
function DecemberJourney({
  completedDoors,
  currentDay,
}: DecemberJourneyProps) {
  const nextIndex = milestones.findIndex(
    (milestone) => milestone.day > currentDay,
  )

  let progress = 0

  if (nextIndex === -1) {
    progress = 100
  } else if (nextIndex > 0) {
    const previousDay = milestones[nextIndex - 1].day
    const nextDay = milestones[nextIndex].day
    const fraction = (currentDay - previousDay) / (nextDay - previousDay)

    progress = ((nextIndex - 1 + fraction) / (milestones.length - 1)) * 100
  }
  return (
    <div className="december-journey">
      <div className="december-journey__collection">
        <h2>Mine gaver</h2>

        <img
          src="/images/icons/calendar/icon-door-gift-red-small.png"
          alt=""
        />

        <p>{completedDoors} / {totalDoors} gaver gennemført</p>
      </div>

      <div className="december-journey__timeline">
        <div className="december-journey__track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        <ol className="december-journey__milestones">
          {milestones.map((milestone) => {
            const isReached = currentDay >= milestone.day

            return (
              <li
                key={milestone.label}
                className={`december-journey__milestone${isReached ? ' is-reached' : ''}`}
              >
                <div className="december-journey__icon" aria-hidden="true">
                  {milestone.icon ? (
                    <img
                      src={milestone.icon.replace(
                        /-(active|locked)\.png$/,
                        `-${isReached ? 'active' : 'locked'}.png`,
                      )}
                      alt=""
                    />
                  ) : (
                    <span>★</span>
                  )}
                </div>

                <span className="december-journey__marker" aria-hidden="true">
                  {isReached && '✓'}
                </span>

                <p>{milestone.label} · {milestone.date}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default DecemberJourney