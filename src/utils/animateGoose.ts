// Animerer gåsen op til en låges håndtag og tilbage til ruten. Lavet vha. AI.
export async function animateGoose(date: string): Promise<void> {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const goose = document.querySelector<HTMLImageElement>(
    '.calendar-route__goose',
  )

  const door = document.querySelector<HTMLElement>(
    `[data-door-date="${date}"]`,
  )

  if (!goose || !door) return

  const gooseRect = goose.getBoundingClientRect()
  const doorRect = door.getBoundingClientRect()

  const startX = gooseRect.left + gooseRect.width / 2
  const startY = gooseRect.top + gooseRect.height / 2

  const handleX = doorRect.left + doorRect.width / 2
  const handleY = doorRect.bottom + 18

  const direction = handleX >= startX ? 1 : -1

  const distanceX = handleX - startX - direction * 18
  const distanceY = handleY - startY + 12

  const outwardScale = direction === 1 ? -1 : 1
  const returnScale = -outwardScale

  function transform(x: number, y: number, scale: number) {
    return (
      `translate(-50%, -100%) ` +
      `translate(${x}px, ${y}px) scaleX(${scale})`
    )
  }

  const animations: Animation[] = []
  const previousZIndex = goose.style.zIndex
  goose.style.zIndex = '10'

  try {
    const outward = goose.animate(
      [
        { transform: transform(0, 0, outwardScale) },
        {
          transform: transform(
            distanceX / 2,
            distanceY / 2 - 60,
            outwardScale,
          ),
        },
        {
          transform: transform(
            distanceX,
            distanceY,
            outwardScale,
          ),
        },
      ],
      {
        duration: 450,
        endDelay: 120,
        easing: 'ease-in-out',
        fill: 'forwards',
      },
    )

    animations.push(outward)
    await outward.finished

    const returning = goose.animate(
      [
        {
          transform: transform(
            distanceX,
            distanceY,
            returnScale,
          ),
        },
        {
          transform: transform(
            distanceX / 2,
            distanceY / 2 - 60,
            returnScale,
          ),
        },
        { transform: transform(0, 0, returnScale) },
      ],
      {
        duration: 450,
        easing: 'ease-in-out',
        fill: 'forwards',
      },
    )

    animations.push(returning)
    await returning.finished
  } finally {
    animations.forEach((animation) => animation.cancel())
    goose.style.zIndex = previousZIndex
  }
}
