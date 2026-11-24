import Counter from './Counter'
import { totalDoors } from '../utils/calendar'

interface HeaderProps {
  tickets: number
  completedDoors: number
  onOpenGifts: () => void
}

// Viser gaveoversigt og fremgang øverst på baggrunden.
function Header({
  tickets,
  completedDoors,
  onOpenGifts,
}: HeaderProps) {
  return (
    <div className="site-header">
      <div className="site-header__counters">
        <button
          type="button"
          className="site-header__gifts"
          onClick={onOpenGifts}
          aria-haspopup="dialog"
        >
          Mine resultater
        </button>

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