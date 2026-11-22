// Viser den dekorative rute gennem kalenderens vinterlandskab.
function CalendarRoute() {
  return (
    <div className="calendar-route" aria-hidden="true">
      <svg
        viewBox="0 0 1000 110"
        preserveAspectRatio="none"
        className="calendar-route__line"
      >
        <path
          className="calendar-route__past"
          d="M20 25 C90 10 110 60 190 50 S350 95 500 85"
        />

        <path
          className="calendar-route__future"
          d="M500 85 C640 95 700 30 790 45 S910 15 980 20"
        />
      </svg>

      <img
        src="/images/icons/calendar/icon-goose-black.png"
        alt=""
        className="calendar-route__goose"
      />
    </div>
  )
}

export default CalendarRoute