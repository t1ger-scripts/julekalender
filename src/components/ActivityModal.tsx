import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface ActivityModalProps {
  title: string
  info: ReactNode
  children: ReactNode
  onClose: () => void
}

// Viser dagens aktivitet foran kalenderen.
function ActivityModal({
  title,
  info,
  children,
  onClose,
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
      <button
        className="activity-back"
        type="button"
        onClick={onClose}
      >
        Tilbage til kalender
      </button>

      <div className="activity-layout">
        <div className="activity-info">{info}</div>
        <div className="activity-game">{children}</div>
      </div>
    </dialog>
  )
}

export default ActivityModal