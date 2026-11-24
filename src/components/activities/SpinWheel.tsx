import { useRef, useState } from 'react'
import type {
  ActivityResult,
  WheelSegment,
} from '../../types/calendar'

interface SpinWheelProps {
  segments: WheelSegment[]
  onComplete: (result: ActivityResult) => void
}

function getIcon(segment: WheelSegment): string {
  const iconColor = segment.color === 'red' ? 'white' : 'red'

  if (segment.type === 'discount') {
    return 'icon-door-gift-red-small.png'
  }

  if (segment.type === 'ticket') {
    return `icon-ticket-${iconColor}.png`
  }

  return `icon-broken-heart-${iconColor}.png`
}

// Drejer hjulet og melder resultatet tilbage efter animationen.
function SpinWheel({ segments, onComplete }: SpinWheelProps) {
  const hasStarted = useRef(false)
  const hasCompleted = useRef(false)

  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<WheelSegment | null>(null)

  if (segments.length !== 8) {
    return (
      <p role="alert">
        Lykkehjulet skal have otte felter.
      </p>
    )
  }

  function handleSpin() {
    if (hasStarted.current) return

    hasStarted.current = true

    const randomIndex = Math.floor(Math.random() * segments.length)
    const segmentAngle = 360 / segments.length
    const targetAngle = (360 - randomIndex * segmentAngle) % 360

    setResult(segments[randomIndex])
    setIsSpinning(true)
    setRotation(1800 + targetAngle)
  }

  function handleComplete() {
    if (!isSpinning || !result || hasCompleted.current) return

    hasCompleted.current = true
    setIsSpinning(false)

    onComplete({
      tickets: result.type === 'ticket' ? result.value : 0,
      discountPercent: result.type === 'discount' ? result.value : 0,
    })
  }

  return (
    <div className="wheel-game">
      <div className="spin-wheel">
        <div className="wheel-disc">
          <div
            className="wheel-inner"
            style={{ transform: `rotate(${rotation}deg)` }}
            onTransitionEnd={(event) => {
              if (
                event.target === event.currentTarget &&
                event.propertyName === 'transform'
              ) {
                handleComplete()
              }
            }}
          >
            {segments.map((segment, index) => (
              <div
                key={index}
                className="wheel-segment"
                style={{
                  transform: `rotate(${index * 45 - 90}deg)`,
                }}
              >
                <img
                  src={`/images/games/wheel/wheel-segment-${segment.color}.png`}
                  alt=""
                  className="wheel-segment-image"
                />

                <img
                  src={`/images/games/icons/${getIcon(segment)}`}
                  alt=""
                  className="wheel-icon"
                />

                <span className={`wheel-label ${segment.color}`}>
                  {segment.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <img
          src="/images/games/wheel/wheel-pointer.png"
          alt=""
          className="wheel-pointer"
        />
      </div>

      <button
        type="button"
        className="wheel-button"
        onClick={handleSpin}
        disabled={isSpinning || result !== null}
      >
        {isSpinning
          ? 'Hjulet drejer...'
          : result
            ? 'Hjulet er stoppet'
            : 'Drej hjulet'}
      </button>
    </div>
  )
}

export default SpinWheel
