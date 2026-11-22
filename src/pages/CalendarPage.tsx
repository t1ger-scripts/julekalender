import CalendarLayout from '../templates/CalendarLayout'
import Header from '../components/Header'
import Door from '../components/Door'

// Samler kalenderens indhold, brugerens fremgang og handlinger.
function CalendarPage() {
  return (
    <CalendarLayout
      header={<Header tickets={0} completedDoors={0} />}
      journey={<p>Decemberrejse placeres her</p>}
    >
      <div className="calendar-intro">
        <h1 className="calendar-intro__title">
          24 låger. Ét juleeventyr.
        </h1>

        <p className="calendar-intro__description">
          Saml lodder på din vej mod juleaftens hovedpræmie.
        </p>
      </div>

      <Door
        day={8}
        status="available"
        onOpen={() => console.log('Åbn låge 8')}
      />
    </CalendarLayout>
  )
}

export default CalendarPage