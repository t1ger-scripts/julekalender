import { useRef, useState } from 'react'
import type {
  ActivityResult,
  ScratchGame,
  ScratchOutcomeType,
} from '../../types/calendar'

interface ScratchCardProps {
  game: ScratchGame
  onComplete: (result: ActivityResult) => void
}

type RevealedPillows = Partial<Record<number, ScratchOutcomeType>>

// Vælger udfald med vægtningen fra JSON.
function chooseOutcome(
  weights: ScratchGame['outcomeWeights'],
): ScratchOutcomeType {
  const total = weights.gift + weights.feather + weights.ticket
  const roll = Math.random() * total

  if (roll < weights.gift) return 'gift'
  if (roll < weights.gift + weights.feather) return 'feather'

  return 'ticket'
}

// Bevarer belønningsprioriteringen fra Eskilds seneste version.
function getResult(
  game: ScratchGame,
  outcomes: ScratchOutcomeType[],
): ActivityResult {
  const gifts = outcomes.filter((value) => value === 'gift').length
  const feathers = outcomes.filter((value) => value === 'feather').length
  const tickets = outcomes.filter((value) => value === 'ticket').length

  if (gifts >= game.giftsToWin) {
    return {
      tickets: game.reward.type === 'ticket' ? game.reward.value : 0,
      discountPercent:
        game.reward.type === 'discount' ? game.reward.value : 0,
    }
  }

  const discountPercent = feathers * game.outcomes.feather.discount

  if (discountPercent > 0) {
    return { tickets: 0, discountPercent }
  }

  return { tickets, discountPercent: 0 }
}

// Vender puder og returnerer resultatet, når spillet er afsluttet.
function ScratchCard({ game, onComplete }: ScratchCardProps) {
  const revealedRef = useRef<RevealedPillows>({})
  const finishedRef = useRef(false)

  const [revealed, setRevealed] = useState<RevealedPillows>({})

  const outcomes = Object.values(revealed)
  const revealedCount = outcomes.length
  const giftsFound = outcomes.filter((value) => value === 'gift').length
  const hasFinished =
    giftsFound >= game.giftsToWin ||
    revealedCount >= game.attemptLimit

  const outcomeLabels = {
    gift: 'gave',
    feather: 'fjer',
    ticket: 'lod',
  }

  const weights = Object.values(game.outcomeWeights)
  const validWeights =
    weights.every((value) => Number.isFinite(value) && value >= 0) &&
    weights.some((value) => value > 0)

  if (
    !validWeights ||
    !Number.isInteger(game.fieldCount) ||
    !Number.isInteger(game.attemptLimit) ||
    !Number.isInteger(game.giftsToWin) ||
    game.attemptLimit < 1 ||
    game.attemptLimit > game.fieldCount ||
    game.giftsToWin < 1 ||
    game.giftsToWin > game.attemptLimit
  ) {
    return (
      <p role="alert">
        Pudeflipperens indstillinger er ugyldige.
      </p>
    )
  }

  function handleFlip(index: number) {
    const current = revealedRef.current

    if (finishedRef.current || current[index] !== undefined) return

    const next: RevealedPillows = {
      ...current,
      [index]: chooseOutcome(game.outcomeWeights),
    }

    revealedRef.current = next
    setRevealed(next)

    const nextOutcomes = Object.values(next).filter(
      (value): value is ScratchOutcomeType => value !== undefined,
    )

    const nextGifts = nextOutcomes.filter(
      (value) => value === 'gift',
    ).length

    const isFinished =
      nextGifts >= game.giftsToWin ||
      nextOutcomes.length >= game.attemptLimit

    if (!isFinished) return

    finishedRef.current = true
    onComplete(getResult(game, nextOutcomes))
  }

  return (
    <div className="scratch-game">
      <div className="scratch-grid">
        {Array.from({ length: game.fieldCount }, (_, index) => {
          const outcome = revealed[index]

          return (
            <button
              key={index}
              type="button"
              className={
                `scratch-cell${outcome ? ' is-flipped' : ''}`
              }
              onClick={() => handleFlip(index)}
              disabled={outcome !== undefined || hasFinished}
              aria-label={
                outcome
                  ? `Pude ${index + 1}: ${outcomeLabels[outcome]}`
                  : `Vend pude ${index + 1}`
              }
            >
              <span className="scratch-cell__inner">
                <span className="scratch-cell__face">
                  <img src={game.frontImage} alt="" />
                </span>

                <span className="scratch-cell__face scratch-cell__back">
                  {outcome && (
                    <img
                      src={game.outcomes[outcome].image}
                      alt=""
                    />
                  )}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <p className="pillows-flipped-counter" aria-live="polite">
        {revealedCount}/{game.attemptLimit} puder vendt
      </p>
    </div>
  )
}

export default ScratchCard
