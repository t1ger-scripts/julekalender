import type { ActivityRule } from '../types/calendar'

interface ActivityInfoProps {
  description: string[]
  rules?: ActivityRule[]
}

function ActivityInfo({
  description,
  rules = [],
}: ActivityInfoProps) {
  return (
    <div className="activity-details">
      <div className="activity-description">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="activity-newsletter">
        <a
          href="https://ringsted-dun.dk/nyhedsbrev-tilmeld/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tilmeld dig nyhedsbrevet hos Ringsted Dun (åbner i en ny fane)"
        >
          Tilmeld dig nyhedsbrevet
        </a>
      </div>

      {rules.length > 0 && (
        <div className="activity-rules">
          <h3>Sådan spiller du</h3>

          {rules.map((rule, index) => (
            <div className="activity-rule" key={index}>
              <img src={rule.icon} alt="" />
              <p>{rule.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActivityInfo