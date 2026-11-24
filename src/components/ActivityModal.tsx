import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { totalDoors } from '../utils/calendar'

interface ActivityModalProps {
  title: string
  viewKey: string
  progress?: number
  info?: ReactNode
  children: ReactNode
  onClose: () => void
  onBack?: () => void
}

function ActivityModal({
  title,
  viewKey,
  progress,
  info,
  children,
  onClose,
  onBack,
}: ActivityModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Åbn dialogen og husk det element, brugeren kom fra.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const previousOverflow = document.body.style.overflow

    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow

      if (opener?.isConnected) {
        opener.focus({ preventScroll: true })
      }
    }
  }, [])

  // Fokusér overskriften ved åbning og skift af visning.
  // Et afsluttet spil ændrer ikke viewKey og flytter derfor ikke fokus.
  useEffect(() => {
    const content = contentRef.current
    const heading = content?.querySelector<HTMLHeadingElement>('h2')

    if (heading) {
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
    } else {
      content?.focus({ preventScroll: true })
    }

    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0
    }
  }, [viewKey])

  return (
    <dialog
      ref={dialogRef}
      className="activity-modal"
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className="activity-navigation">
        {onBack && (
          <button
            type="button"
            className="activity-back activity-back--overview"
            onClick={onBack}
          >
            Tilbage til min julesamling
          </button>
        )}

        <button
          type="button"
          className="activity-back"
          onClick={onClose}
        >
          Tilbage til kalender
        </button>
      </div>

      <div
        ref={contentRef}
        className="activity-modal__content"
        tabIndex={-1}
      >
        {info ? (
          <>
            <header className="activity-heading">
              <h2>{title}</h2>

              {progress !== undefined && (
                <span className="activity-progress">
                  {progress} / {totalDoors} gennemført
                </span>
              )}
            </header>

            <div className="activity-layout">
              <div className="activity-info">{info}</div>
              {children}
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </dialog>
  )
}

export default ActivityModal
