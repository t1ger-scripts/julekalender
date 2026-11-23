import type { SavedActivityResult } from '../types/calendar'
import { formatCalendarDate } from '../utils/calendar'

interface ActivityResultViewProps {
  result: SavedActivityResult
}

// Viser den gemte belønning uden at starte aktiviteten igen.
function ActivityResultView({ result }: ActivityResultViewProps) {
  const hasReward =
    result.tickets > 0 || result.discountPercent > 0

  return (
    <div className="activity-summary" role="status">
      <p className="activity-summary__date">
        {formatCalendarDate(result.date)}
      </p>

      <h2>{hasReward ? 'Din belønning' : 'Tak for spillet'}</h2>

      {result.tickets > 0 && (
        <p>
          Du har vundet {result.tickets}{' '}
          {result.tickets === 1 ? 'lod' : 'lodder'} til konkurrencen
          om juleaftens hovedpræmie.
        </p>
      )}

      {result.discountPercent > 0 && (
        <p>
          Du har vundet {result.discountPercent} % rabat på dagens
          produkt.
        </p>
      )}

      {!hasReward && (
        <p>
          Det blev ikke til en gevinst denne gang. Der venter flere
          muligheder bag kalenderens kommende låger.
        </p>
      )}

      <p>Dagens aktivitet er gennemført.</p>
    </div>
  )
}

export default ActivityResultView