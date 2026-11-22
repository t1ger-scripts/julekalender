interface HeaderProps {
  tickets: number
  completedDoors: number
}

// Viser brand, navigation og brugerens fremgang.
function Header({ tickets, completedDoors }: HeaderProps) {
  return (
    <div className="site-header">
      <div className="site-header__brand">
        <img
          src="/images/logo.webp"
          alt="Ringsted Dun - Established 1947"
          className="site-header__logo"
        />
      </div>

      <nav className="site-header__navigation" aria-label="Hovednavigation">
        <button type="button" className="site-header__link">
          Sådan deltager du
        </button>

        <button type="button" className="site-header__link">
          Præmier
        </button>
      </nav>

      <div className="site-header__counters">
        <span className="site-header__counter">
          {tickets} lodder
        </span>

        <span className="site-header__counter">
          {completedDoors} / 24 gennemført
        </span>
      </div>
    </div>
  )
}

export default Header