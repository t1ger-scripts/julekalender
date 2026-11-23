import Counter from './Counter'
import { totalDoors } from '../utils/calendar'

interface HeaderProps {
  tickets: number
  completedDoors: number
}

// Viser logo og brugerens fremgang.
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

      <div className="site-header__counters">
        <Counter
          value={tickets}
          label={tickets === 1 ? 'lod' : 'lodder'}
          className="site-header__counter"
        />

        <Counter
          value={completedDoors}
          total={totalDoors}
          label="gennemført"
          className="site-header__counter"
        />
      </div>
    </div>
  )
}

export default Header