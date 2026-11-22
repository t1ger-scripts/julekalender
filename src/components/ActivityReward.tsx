/* Viser bekræftelse på optjent lod, rabatkode og produktlink. */

interface ActivityRewardProps {
  title: string
  paragraphs: string[]
}

function ActivityReward({
  title,
  paragraphs
}: ActivityRewardProps) {
  return (
    <div className="activity-reward" role="status">
      <h2>{title}</h2>

      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

export default ActivityReward