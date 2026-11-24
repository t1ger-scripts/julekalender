import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { totalDoors } from '../utils/calendar'

interface ActivityModalProps {
  title: string
  progress?: number
  info?: ReactNode
  children: ReactNode
  onClose: () => void
  onBack?: () => void
}

// Genbruger samme dialog til aktiviteter, gaveoversigt og belønninger.
function ActivityModal({
  title,
  progress,
  info,
  children,
  onClose,
  onBack,
}: ActivityModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow

    dialog?.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

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
            Tilbage til Mine gaver
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
    </dialog>
  )
}

export default ActivityModal