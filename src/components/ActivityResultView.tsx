import { useState } from 'react'
import type {
  CalendarDoor,
  SavedActivityResult,
} from '../types/calendar'
import { formatCalendarDate } from '../utils/calendar'
import {
  completedActivityMessage,
  getRewardMessages,
} from '../utils/rewardMessages'

interface ActivityResultViewProps {
  result: SavedActivityResult
  door: CalendarDoor
}

function ActivityResultView({
  result,
  door,
}: ActivityResultViewProps) {
  const [copyStatus, setCopyStatus] = useState('')
  const [imageFailed, setImageFailed] = useState(false)

  const prize = door.prize
  const hasReward = result.tickets > 0 || result.discountPercent > 0

  const discountCode =
    result.discountPercent > 0 && prize?.id
      ? `${prize.id.toUpperCase()}-JUL${result.discountPercent}`
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
    <section className="result-view">
      <header className="result-view__heading">
        <h2>Dit resultat</h2>

        <span className="result-view__date">
          {formatCalendarDate(result.date)}
        </span>

        <span className="result-view__completed">
          <span aria-hidden="true">✓</span> Gennemført
        </span>
      </header>

      <div
        className={
          'result-view__layout' +
          (!prize ? ' result-view__layout--no-product' : '')
        }
      >
        {prize && (
          <figure className="result-view__image">
            {prize.image && !imageFailed ? (
              <img
                src={prize.image}
                alt={prize.name}
                onError={() => setImageFailed(true)}
              />
            ) : (
              <p>Produktbilledet er ikke tilgængeligt.</p>
            )}

            <figcaption>Dagens præmie</figcaption>
          </figure>
        )}

        <div className="result-view__content">
          {prize && (
            <div className="result-view__product">
              <p className="result-view__eyebrow">Dagens præmie</p>
              <h3>{prize.name}</h3>
            </div>
          )}

          <div className="result-view__participation">
            <p>{completedActivityMessage}</p>

            {prize && (
              <p>
                Dagens præmie er produktet vist her.
                Gennemførsel er ikke en bekræftelse på, at du har vundet produktet.
              </p>
            )}
          </div>

          <div
            className={
              'result-view__bonus' +
              (hasReward ? ' result-view__bonus--won' : '')
            }
          >
            <h3>Din ekstra gevinst</h3>

            {getRewardMessages(result).map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>

          {discountCode && (
            <div className="result-view__discount">
              <h3>Din rabatkode</h3>
              <code>{discountCode}</code>

              <button type="button" onClick={handleCopyCode}>
                Kopiér kode
              </button>

              <p role="status">{copyStatus}</p>
            </div>
          )}

          {prize?.productUrl && (
            <div className="result-view__actions">
              <a
                href={prize.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  `Se ${prize.name} hos Ringsted Dun (åbner i en ny fane)`
                }
              >
                Se produkt hos Ringsted Dun
                <span aria-hidden="true"> ↗</span>
              </a>

              <p>Åbner i en ny fane</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ActivityResultView