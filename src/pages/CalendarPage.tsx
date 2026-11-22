import CalendarLayout from '../templates/CalendarLayout'

// Samler kalenderens indhold, brugerens fremgang og handlinger.
function CalendarPage() {
  return (
    <CalendarLayout
      header={<p>Header placeres her</p>}
      journey={<p>Decemberrejse placeres her</p>}
    >
      <h1>24 låger. Ét juleeventyr.</h1>
      <p>Saml lodder på din vej mod juleaftens hovedpræmie.</p>
    </CalendarLayout>
  )
}

export default CalendarPage