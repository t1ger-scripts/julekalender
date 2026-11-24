import type { SavedActivityResult } from '../types/calendar'
import { getRewardMessages } from '../utils/rewardMessages'

interface ActivityCompletionProps {
  result: SavedActivityResult
  onViewGift: () => void
}

function ActivityCompletion({
  result,
  onViewGift,
}: ActivityCompletionProps) {
  const hasReward = result.tickets > 0 || result.discountPercent > 0

  return (
    <div
      className={
        'activity-completion' +
        (hasReward ? ' activity-completion--reward' : '')
      }
    >
      <div role="status">
        {getRewardMessages(result).map((message) => (
          <p key={message}>{message}</p>
        ))}

        <p className="activity-completion__saved">
          Aktiviteten er gennemført. Dit resultat er gemt.
        </p>
      </div>

      <button type="button" onClick={onViewGift}>
        Se din gave
      </button>
    </div>
  )
}

export default ActivityCompletion