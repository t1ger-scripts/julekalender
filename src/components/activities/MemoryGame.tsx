import { useEffect, useRef, useState } from 'react'
import type {
  ActivityResult,
  MemoryGame as MemoryGameConfig,
} from '../../types/calendar'

interface MemoryGameProps {
  game: MemoryGameConfig
  onComplete: (result: ActivityResult) => void
}

type PairName = keyof MemoryGameConfig['outcomes']

interface MemoryCard {
  id: string
  pair: PairName
  image: string
}

// Opretter to kort pr. motiv og blander kortene.
function createDeck(game: MemoryGameConfig): MemoryCard[] {
  const pairs = Object.keys(game.outcomes) as PairName[]

  const cards = pairs.flatMap((pair) => [
    {
      id: `${pair}-1`,
      pair,
      image: game.outcomes[pair].image,
    },
    {
      id: `${pair}-2`,
      pair,
      image: game.outcomes[pair].image,
    },
  ])

  for (let index = cards.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const card = cards[index]

    cards[index] = cards[randomIndex]
    cards[randomIndex] = card
  }

  return cards
}

// Finder par og returnerer belønningen ved sejr eller nederlag.
// Kortblanding og matchlogik bygger på Eskilds implementering.
function MemoryGame({ game, onComplete }: MemoryGameProps) {
  const finishedRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [cards] = useState(() => createDeck(game))
  const [selected, setSelected] = useState<string[]>([])
  const [matchedPairs, setMatchedPairs] = useState<PairName[]>([])
  const [attempts, setAttempts] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const pairCount = cards.length / 2
  const attemptsLeft = Math.max(0, game.attemptLimit - attempts)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function handleFlip(card: MemoryCard) {
    if (
      finishedRef.current ||
      selected.length === 2 ||
      selected.includes(card.id) ||
      matchedPairs.includes(card.pair)
    ) {
      return
    }

    const nextSelected = [...selected, card.id]
    setSelected(nextSelected)

    if (nextSelected.length !== 2) return

    const nextAttempts = attempts + 1
    const firstCard = cards.find(
      (item) => item.id === nextSelected[0],
    )
    const isMatch = firstCard?.pair === card.pair

    setAttempts(nextAttempts)

    // Giver tid til at se de vendte kort.
    timeoutRef.current = setTimeout(() => {
      const nextMatchedCount =
        matchedPairs.length + (isMatch ? 1 : 0)

      if (isMatch) {
        setMatchedPairs((current) => [...current, card.pair])
      }

      setSelected([])
      timeoutRef.current = null

      const hasWon = nextMatchedCount === pairCount
      const hasLost =
        !hasWon && nextAttempts >= game.attemptLimit

      if ((!hasWon && !hasLost) || finishedRef.current) return

      finishedRef.current = true
      setIsFinished(true)

      onComplete({
        tickets:
          hasWon && game.reward.type === 'ticket'
            ? game.reward.value
            : 0,
        discountPercent:
          hasWon && game.reward.type === 'discount'
            ? game.reward.value
            : 0,
      })
    }, isMatch ? 500 : 1000)
  }

  if (
    cards.length !== game.fieldCount ||
    pairCount === 0 ||
    !Number.isInteger(game.attemptLimit) ||
    game.attemptLimit < pairCount
  ) {
    return (
      <p role="alert">
        Pudematcherens indstillinger passer ikke til spillefeltet.
      </p>
    )
  }

  return (
    <div className="memory-game">
      <div
        className="memory-grid"
        aria-label="Pudematcherens spillefelt"
      >
        {cards.map((card, index) => {
          const isMatched = matchedPairs.includes(card.pair)
          const isVisible =
            isMatched || selected.includes(card.id)

          return (
            <button
              key={card.id}
              type="button"
              className={
                `memory-cell` +
                (isVisible ? ' is-flipped' : '') +
                (isMatched ? ' is-matched' : '')
              }
              onClick={() => handleFlip(card)}
              disabled={
                isMatched ||
                selected.length === 2 ||
                isFinished
              }
              aria-label={
                isMatched
                  ? `Pude ${index + 1}: match fundet`
                  : isVisible
                    ? `Pude ${index + 1}: ${card.pair}`
                    : `Vend pude ${index + 1}`
              }
            >
              <img
                src={isVisible ? card.image : game.frontImage}
                alt=""
              />
            </button>
          )
        })}
      </div>

      <p className="memory-progress" aria-live="polite">
        {matchedPairs.length}/{pairCount} par fundet
        {' · '}
        {attemptsLeft} forsøg tilbage
      </p>
    </div>
  )
}

export default MemoryGame