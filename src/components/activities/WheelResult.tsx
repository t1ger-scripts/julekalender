import type { WheelSegment } from '../../types/calendar'
import ActivityReward from '../ActivityReward'

interface WheelResultProps {
  result: WheelSegment
}

function WheelResult({ result }: WheelResultProps) {
  if (result.type === "discount") {
    return (
      <ActivityReward
        title="TILLYKKE!"
        paragraphs={[
          `Juleheldet var med dig! Lykkehjulet har givet dig ${result.value}% rabat på dagens hovedpræmie.`,
          "Forkæl dig selv eller en, du holder af, med lidt ekstra juleluksus.",
          "Du finder din rabatkode i din præmieoversigt under 'Mine gaver'."
        ]}
      />
    )
  }

  if (result.type === "ticket") {
    return (
      <ActivityReward
        title="TILLYKKE!"
        paragraphs={[
          `Lykkehjulet har givet dig ${result.value} ekstra ${result.value === 1 ? "lod" : "lodder"} i konkurrencen om vores store julepræmie.`,
          "Du er nu et skridt tættere på at vinde en fantastisk julegave.",
          "Du finder alle dine lodder i din præmieoversigt under 'Mine gaver'."
        ]}
      />
    )
  }

  return (
    <ActivityReward
      title="ØV!"
      paragraphs={[
        "Juleheldet var desværre ikke med dig i dag.",
        "Men julen er fuld af overraskelser, og der gemmer sig stadig masser af spændende præmier og hyggelige oplevelser bag kalenderens kommende låger.",
        "Vi glæder os til at se dig igen i morgen!"
      ]}
    />
  )
}

export default WheelResult