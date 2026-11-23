interface DevToolbarProps {
  currentDate: string
  onDateChange: (date: string) => void
  onReset: () => void
}

// Giver adgang til testdato og nulstilling under lokal udvikling.
function DevToolbar({
  currentDate,
  onDateChange,
  onReset,
}: DevToolbarProps) {
  return (
    <details className="dev-toolbar">
      <summary>Udviklerværktøjer</summary>

      <div className="dev-toolbar__controls">
        <label>
          Kalenderdato
          <input
            type="date"
            value={currentDate}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </label>

        <button type="button" onClick={onReset}>
          Nulstil fremgang
        </button>

        <p>
          Nulstilling fjerner testresultater, lodder og belønninger
          i denne browser.
        </p>
      </div>
    </details>
  )
}

export default DevToolbar