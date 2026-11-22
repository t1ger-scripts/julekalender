import type { ReactNode } from 'react'

interface CalendarLayoutProps {
  header: ReactNode
  children: ReactNode
  journey: ReactNode
  afterJourney?: ReactNode
}

// Placerer header, kalender, decemberrejse og efterfølgende indhold.
function CalendarLayout({
  header,
  children,
  journey,
  afterJourney,
}: CalendarLayoutProps) {
  return (
    <div className="calendar-layout">
      <header className="calendar-layout__header">
        {header}
      </header>

      <main className="calendar-layout__page">
        <div className="calendar-layout__main">
          {children}
        </div>

        <section
          className="calendar-layout__journey"
          aria-label="Din decemberrejse"
        >
          {journey}
        </section>

        {afterJourney}
      </main>
    </div>
  )
}

export default CalendarLayout