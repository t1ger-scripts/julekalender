/* Viser dagens foruddefinerede aktivitet i en modal. */
import type { ReactNode } from 'react'

interface ActivityModalProps {
  info: ReactNode
  children: ReactNode
  onClose: () => void
}

function ActivityModal({ info, children, onClose }: ActivityModalProps) {
  return (
    <section className="activity-modal">

      <button
        className="activity-back"
        type="button"
        onClick={onClose}
      >
        Tilbage til kalender
      </button>

      <div className="activity-layout">

        <div className="activity-info">
          {info}
        </div>

        <div className="activity-game">
          {children}
        </div>

      </div>

    </section>
  )
}

export default ActivityModal