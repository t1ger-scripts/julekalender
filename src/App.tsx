// Appens rodkomponent. Her tilkobles kalendersiden senere.
import { useEffect, useState } from "react"
import ActivityModal from "./components/ActivityModal"
import ActivityInfo from "./components/ActivityInfo"
import SpinWheel from "./components/activities/SpinWheel"
import { loadDoors } from "./api/loadDoors"
import type { WheelDoor } from "./types/calendar"

function App() {
  const [doors, setDoors] = useState<WheelDoor[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    loadDoors()
      .then(setDoors)
      .catch(() => setError(true))
  }, [])

  const door = doors.find((door) => door.day === 5)

  if (error) {
    return <p>Kunne ikke hente kalenderen.</p>
  }

  if (!door) {
    return <p>Henter dagens låge...</p>
  }

  return (
    <ActivityModal
      info={
        <ActivityInfo
          title={door.content.title}
          progress={5}
          description={door.content.description}
          rules={door.content.rules}
        />
      }
      onClose={() => console.log("Tilbage til kalender")}
    >
      <SpinWheel
  segments={door.segments}
  onComplete={(result) => {
    console.log("Låge:", door.day)
    console.log("Resultat:", result)
  }}
/>
    </ActivityModal>
  )
}

export default App