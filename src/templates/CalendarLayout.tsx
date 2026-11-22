import type { ReactNode } from 'react'

interface CalendarLayoutProps {
  header: ReactNode
  children: ReactNode
  journey: ReactNode
}

// Placerer header, kalender og decemberrejse.
function CalendarLayout({
  header,
  children,
  journey,
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
      </main>
    </div>
  )
}

export default CalendarLayout