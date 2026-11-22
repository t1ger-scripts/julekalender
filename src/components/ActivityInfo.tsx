import type { ActivityRule } from '../types/calendar'

interface ActivityInfoProps {
  title: string
  progress: number
  description: string[]
  rules?: ActivityRule[]
}

// Viser aktivitetens titel, fremgang, beskrivelse og spilleregler.
function ActivityInfo({
  title,
  progress,
  description,
  rules = [],
}: ActivityInfoProps) {
  return (
    <div className="activity-details">
      <h2>{title}</h2>

      <div className="activity-progress">
        {progress} / 24 gaver gennemført
      </div>

      <div className="activity-description">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
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