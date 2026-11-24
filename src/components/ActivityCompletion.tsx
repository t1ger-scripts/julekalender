import type { SavedActivityResult } from '../types/calendar'
import { completedActivityMessage, getRewardMessages } from '../utils/rewardMessages'

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
          {completedActivityMessage}
        </p>
      </div>

      <button type="button" onClick={onViewGift}>
        Se dit resultat
      </button>
    </div>
  )
}

export default ActivityCompletion