import { useState } from 'react'
import type {
  CalendarDoor,
  SavedActivityResult,
} from '../types/calendar'
import { formatCalendarDate } from '../utils/calendar'
import {
  completedActivityMessage,
  getRewardMessages,
  getRewardTitle,
} from '../utils/rewardMessages'

interface ActivityResultViewProps {
  result: SavedActivityResult
  door: CalendarDoor
}

// Viser den gemte besked, produktet og eventuel rabatkode.
function ActivityResultView({
  result,
  door,
}: ActivityResultViewProps) {
  const [copyStatus, setCopyStatus] = useState('')

  const discountCode =
    result.discountPercent > 0 && door.prize?.id
      ? `${door.prize.id.toUpperCase()}-JUL${result.discountPercent}`
      : null

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

      <h2>{getRewardTitle(result)}</h2>

      {getRewardMessages(result).map((message) => (
        <p key={message}>{message}</p>
      ))}

      <p>{completedActivityMessage}</p>

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