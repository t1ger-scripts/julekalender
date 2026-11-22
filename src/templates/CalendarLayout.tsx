import type { ReactNode } from 'react'

interface CalendarLayoutProps {
  header: ReactNode
  children: ReactNode
  journey: ReactNode
}

// Placerer header, hovedindhold og decemberrejse på siden.
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

      <main className="calendar-layout__main">
        {children}
      </main>

      <section
        className="calendar-layout__journey"
        aria-label="Din decemberrejse"
      >
        {journey}
      </section>
    </div>
  )
}

export default CalendarLayout