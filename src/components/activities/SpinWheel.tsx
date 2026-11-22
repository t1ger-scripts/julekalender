import { useState } from "react"
import type { WheelSegment } from "../../types/calendar"
import WheelResult from "./WheelResult"

interface SpinWheelProps {
  segments: WheelSegment[]
  onComplete: (result: WheelSegment) => void
}

function getIcon(segment: WheelSegment) {
  const iconColor = segment.color === "red" ? "white" : "red"

  if (segment.type === "discount") {
    return "icon-door-gift-red-small.png"
  }

  if (segment.type === "ticket") {
    return `icon-ticket-${iconColor}.png`
  }

  return `icon-broken-heart-${iconColor}.png`
}

function SpinWheel({ segments, onComplete }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<WheelSegment | null>(null)

  // Rotationsberegning og håndtering af animation med AI-assistance
  function handleSpin() {
    if (isSpinning || result !== null) return

    setIsSpinning(true)

    const randomIndex = Math.floor(Math.random() * segments.length)
    const segmentAngle = 360 / segments.length
    const targetAngle = (360 - randomIndex * segmentAngle) % 360
    const currentAngle = rotation % 360
    const extraRotation = (targetAngle - currentAngle + 360) % 360

    setRotation(rotation + 1800 + extraRotation)

    const winningSegment = segments[randomIndex]

    setResult(winningSegment)
    onComplete(winningSegment)
  }

  return (
    <div className="wheel-game">
      <div className="spin-wheel">
        <div
          className="wheel-inner"
          style={{ transform: `rotate(${rotation}deg)` }}
          onTransitionEnd={(event) => {
            if (
              event.target === event.currentTarget &&
              event.propertyName === "transform"
            ) {
              setIsSpinning(false)
            }
          }}
        >
          {segments.map((segment, index) => (
            <div
              key={index}
              className="wheel-segment"
              style={{
                transform: `rotate(${index * 45 - 90}deg)`
              }}
            >
              <img
                src={`/images/icons/games/wheel/wheel-segment-${segment.color}.png`}
                alt=""
                className="wheel-segment-image"
              />

              <img
                src={`/images/icons/games/${getIcon(segment)}`}
                alt=""
                className="wheel-icon"
              />

              <span className={`wheel-label ${segment.color}`}>
                {segment.label}
              </span>
            </div>
          ))}
        </div>

        <img
          src="/images/icons/games/wheel/wheel-pointer.png"
          alt=""
          className="wheel-pointer"
        />

        {result !== null && !isSpinning && (
          <WheelResult result={result} />
        )}
      </div>

      <button
        className="wheel-button"
        type="button"
        onClick={handleSpin}
        disabled={isSpinning || result !== null}
      >
        {isSpinning
          ? "Hjulet drejer..."
          : result !== null
            ? "Du har spillet"
            : "Drej hjulet"}
      </button>
    </div>
  )
}

export default SpinWheel