import { useState } from 'react'
import type {
  CalendarDoor,
  SavedActivityResult,
} from '../types/calendar'
import { formatCalendarDate } from '../utils/calendar'

interface ActivityResultViewProps {
  result: SavedActivityResult
  door: CalendarDoor
}

// Viser den gemte belønning og dagens tilknyttede produkt.
function ActivityResultView({
  result,
  door,
}: ActivityResultViewProps) {
  const [copyStatus, setCopyStatus] = useState('')

  const hasReward =
    result.tickets > 0 || result.discountPercent > 0

  const discountCode =
    result.discountPercent > 0 ? door.discountCode : null

  async function handleCopyCode() {
    if (!discountCode) return

    try {
      await navigator.clipboard.writeText(discountCode)
      setCopyStatus('Rabatkoden er kopieret.')
    } catch {
      setCopyStatus('Markér koden og kopiér den manuelt.')
    }
  }

  return (
    <div className="activity-summary">
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

      {discountCode && (
        <div className="activity-summary__discount">
          <h3>Din rabatkode</h3>

          <code>{discountCode}</code>

          <div className="activity-summary__actions">
            <button type="button" onClick={handleCopyCode}>
              Kopiér kode
            </button>
          </div>

          <p role="status">{copyStatus}</p>
        </div>
      )}

      {door.prize && (
        <div className="activity-summary__product">
          {door.prize.image && (
            <img
              src={door.prize.image}
              alt={door.prize.name}
              onError={(event) => {
                event.currentTarget.hidden = true
              }}
            />
          )}

          <h3>{door.prize.name}</h3>

          {door.prize.productUrl && (
            <div className="activity-summary__actions">
              <a
                href={door.prize.productUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Se produkt hos Ringsted Dun
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ActivityResultView