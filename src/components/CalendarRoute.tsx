import { useLayoutEffect, useRef } from 'react'
import { calendarDates } from '../utils/calendar'

interface CalendarRouteProps {
  currentDate: string
}

// Nedenstående er kodet vha. AI.

const routePath =
  'M40 25 C90 10 110 60 190 50 S350 95 500 85 C640 95 700 30 790 45 S910 15 960 20'

const firstDate = Date.parse(`${calendarDates[0]}T00:00:00Z`)
const lastDate = Date.parse(
  `${calendarDates[calendarDates.length - 1]}T00:00:00Z`,
)

function CalendarRoute({ currentDate }: CalendarRouteProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const gooseRef = useRef<HTMLImageElement>(null)

  const today = Date.parse(`${currentDate}T00:00:00Z`)
  const progress = Math.max(
    0,
    Math.min(1, (today - firstDate) / (lastDate - firstDate)),
  )

  useLayoutEffect(() => {
    const path = pathRef.current
    const goose = gooseRef.current

    if (!path || !goose) return

    const point = path.getPointAtLength(
      path.getTotalLength() * progress,
    )

    goose.style.left = `${(point.x / 1000) * 100}%`
    goose.style.top = `${(point.y / 110) * 100}%`
  }, [progress])

  return (
    <div className="calendar-route" aria-hidden="true">
      <svg
        viewBox="0 0 1000 110"
        preserveAspectRatio="none"
        className="calendar-route__line"
      >
        <defs>
          <mask
            id="calendar-route-progress"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="110"
          >
            <path
              d={routePath}
              pathLength={100}
              fill="none"
              stroke="white"
              strokeWidth={12}
              strokeDasharray={`${progress * 100} 100`}
            />
          </mask>
        </defs>

        <path
          ref={pathRef}
          className="calendar-route__future"
          d={routePath}
        />

        <path
          className="calendar-route__past"
          d={routePath}
          mask="url(#calendar-route-progress)"
        />
      </svg>

      <img
        ref={gooseRef}
        src="/images/branding/goose-red.png"
        alt=""
        className="calendar-route__goose"
      />
    </div>
  )
}

export default CalendarRoute
