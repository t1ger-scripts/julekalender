import type { SavedActivityResult } from '../types/calendar'
import {
  completedActivityMessage,
  getRewardMessages,
  getRewardTitle,
} from '../utils/rewardMessages'

interface ActivityCompletionProps {
  result: SavedActivityResult
  onViewGift: () => void
}

// Viser resultatet efter spillet og før den fulde gavevisning.
function ActivityCompletion({
  result,
  onViewGift,
}: ActivityCompletionProps) {
  return (
    <div className="activity-summary activity-completion">
      <div role="status">
        <h2>{getRewardTitle(result)}</h2>

        {getRewardMessages(result).map((message) => (
          <p key={message}>{message}</p>
        ))}

        <p>{completedActivityMessage}</p>
      </div>

      <div className="activity-summary__actions">
        <button type="button" onClick={onViewGift}>
          Se din gave
        </button>
      </div>
    </div>
  )
}

export default ActivityCompletion