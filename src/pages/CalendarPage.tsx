import CalendarLayout from '../templates/CalendarLayout'
import Header from '../components/Header'
import Calendar from '../components/Calendar'

// Samler kalenderens indhold, brugerens fremgang og handlinger.
function CalendarPage() {
  return (
    <CalendarLayout
      header={<Header tickets={0} completedDoors={0} />}
      journey={<p>Decemberrejse placeres her</p>}
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
        onOpenDoor={(day) => console.log(`Åbn låge ${day}`)}
      />
    </CalendarLayout>
  )
}

export default CalendarPage