import CalendarLayout from '../templates/CalendarLayout'
import Header from '../components/Header'
import Calendar from '../components/Calendar'
import DecemberJourney from '../components/DecemberJourney'
import CalendarRoute from '../components/CalendarRoute'

// Samler kalenderens indhold, brugerens fremgang og handlinger.
function CalendarPage() {
  // Eksempeldata, indtil vi tilkobler dato og lokal lagring.
  const currentDay = 8
  const completedDays = [6, 7]
  const tickets = completedDays.length

  return (
    <CalendarLayout
      header={
        <Header
          tickets={tickets}
          completedDoors={completedDays.length}
        />
      }
      journey={
        <DecemberJourney
          completedDoors={completedDays.length}
          currentDay={currentDay}
        />
      }
    >
      <div className="calendar-intro">
        <h1 className="calendar-intro__title">
          <span aria-hidden="true">✦</span>
          Julekalender 2026
          <span aria-hidden="true">✦</span>
        </h1>

        <p className="calendar-intro__description">
          24 låger. Ét juleeventyr.
        </p>
      </div>

      <Calendar
        currentDay={currentDay}
        completedDays={completedDays}
        onOpenDoor={(day) => console.log(`Åbn låge ${day}`)}
      />

      <CalendarRoute />

    </CalendarLayout>
  )
}

export default CalendarPage