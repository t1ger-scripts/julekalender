import CalendarLayout from '../templates/CalendarLayout'
import Header from '../components/Header'

// Samler kalenderens indhold, brugerens fremgang og handlinger.
function CalendarPage() {
  return (
    <CalendarLayout
      header={<Header tickets={0} completedDoors={0} />}
      journey={<p>Decemberrejse placeres her</p>}
    >
      <h1>24 låger. Ét juleeventyr.</h1>
      <p>Saml lodder på din vej mod juleaftens hovedpræmie.</p>
    </CalendarLayout>
  )
}

export default CalendarPage