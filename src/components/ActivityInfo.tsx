interface ActivityRule {
  icon: string
  text: string
}

interface ActivityInfoProps {
  title: string
  progress: number
  description: string[]
  rules: ActivityRule[]
}

function ActivityInfo({
  title,
  progress,
  description,
  rules
}: ActivityInfoProps) {
  return (
    <div className="activity-details">
      <h1>{title}</h1>

      <div className="activity-progress">
        🎁 {progress}/24
      </div>

      <div className="activity-description">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="activity-rules">
        <h3>SÅDAN SPILLER DU</h3>

        {rules.map((rule, index) => (
          <div className="activity-rule" key={index}>
            <img src={rule.icon} alt="" />
            <p>{rule.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityInfo