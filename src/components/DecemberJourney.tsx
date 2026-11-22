interface DecemberJourneyProps {
  completedDoors: number
}

const milestones = [
  {
    label: '1. advent',
    date: '29/11',
    icon: '/images/icons/calendar/icon-candles-advent-1-active.png',
  },
  {
    label: '2. advent',
    date: '6/12',
    icon: '/images/icons/calendar/icon-candles-advent-2-active.png',
  },
  {
    label: '3. advent',
    date: '13/12',
    icon: '/images/icons/calendar/icon-candles-advent-3-locked.png',
  },
  {
    label: '4. advent',
    date: '20/12',
    icon: '/images/icons/calendar/icon-candles-advent-4-locked.png',
  },
  {
    label: 'Juleaften',
    date: '24/12',
    icon: null,
  },
]

// Viser antal gennemførte gaver og kalenderens milepæle.
function DecemberJourney({ completedDoors }: DecemberJourneyProps) {
  return (
    <div className="december-journey">
      <div className="december-journey__collection">
        <h2>Mine gaver</h2>

        <img
          src="/images/icons/calendar/icon-door-gift-red-small.png"
          alt=""
        />

        <p>{completedDoors} / 24 gaver gennemført</p>
      </div>

      <ol className="december-journey__milestones">
        {milestones.map((milestone) => (
          <li
            key={milestone.label}
            className="december-journey__milestone"
          >
            <div className="december-journey__icon" aria-hidden="true">
              {milestone.icon ? (
                <img src={milestone.icon} alt="" />
              ) : (
                <span>★</span>
              )}
            </div>

            <span className="december-journey__marker" />

            <p>
              {milestone.label} · {milestone.date}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default DecemberJourney