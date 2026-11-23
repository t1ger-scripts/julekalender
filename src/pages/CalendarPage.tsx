import { useEffect, useRef, useState } from 'react'
import { loadCalendarData } from '../api/loadCalendarData'
import ActivityInfo from '../components/ActivityInfo'
import ActivityModal from '../components/ActivityModal'
import Calendar from '../components/Calendar'
import CalendarRoute from '../components/CalendarRoute'
import DecemberJourney from '../components/DecemberJourney'
import Header from '../components/Header'
import CalendarLayout from '../templates/CalendarLayout'
import type {
  CalendarData,
  SavedActivityResult,
} from '../types/calendar'
import { loadActivityResults } from '../utils/activityResults'
import { animateGoose } from '../utils/animateGoose'
import {
  formatCalendarDate,
  getCalendarDate,
  totalDoors,
} from '../utils/calendar'

// Testindstillinger bruges kun lokalt og gemmes ikke i browseren.
// Sæt enabled til false for at bruge rigtig dato og gemte resultater.
const testConfig = {
  enabled: true,
  date: '2026-12-08',
  results: [
    {
      date: '2026-12-06',
      tickets: 1,
      discountPercent: 0,
    },
    {
      date: '2026-12-07',
      tickets: 2,
      discountPercent: 10,
    },
  ],
}

const isTestMode = import.meta.env.DEV && testConfig.enabled

function getCurrentDate(): string {
  return isTestMode ? testConfig.date : getCalendarDate()
}

// Samler kalenderens indhold, resultater og åbning af aktiviteter.
function CalendarPage() {
  const isOpeningDoor = useRef(false)

  const [currentDate, setCurrentDate] = useState(getCurrentDate)
  const [activityResults] = useState<SavedActivityResult[]>(() =>
    isTestMode
      ? testConfig.results.map((result) => ({ ...result }))
      : loadActivityResults(),
  )
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null)
  const [loadError, setLoadError] = useState(false)

  const completedDates = activityResults.map((result) => result.date)

  const tickets = activityResults.reduce(
    (total, result) => total + result.tickets,
    0,
  )

  const selectedDoor = calendarData?.doors.find(
    (door) => door.date === selectedDate,
  )

  const activityContent = selectedDoor?.activity
    ? calendarData?.activities[selectedDoor.activity] ?? null
    : null

  const activityTitle =
    activityContent?.title ??
    (selectedDoor ? formatCalendarDate(selectedDoor.date) : '')

  // Holder datoen opdateret ved midnat og ved tilbagevenden til siden.
  useEffect(() => {
    function updateDate() {
      setCurrentDate(getCurrentDate())
    }

    const intervalId = window.setInterval(updateDate, 60_000)
    window.addEventListener('focus', updateDate)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', updateDate)
    }
  }, [])

  // Henter indhold fra de lokale JSON-filer.
  useEffect(() => {
    let isActive = true

    loadCalendarData()
      .then((data) => {
        if (isActive) setCalendarData(data)
      })
      .catch(() => {
        if (isActive) setLoadError(true)
      })

    return () => {
      isActive = false
    }
  }, [])

  async function handleOpenDoor(date: string): Promise<void> {
    const canOpen =
      date === currentDate || completedDates.includes(date)

    if (!canOpen || isOpeningDoor.current) return

    isOpeningDoor.current = true

    try {
      await animateGoose(date)
    } catch {
      // En afbrudt animation må ikke forhindre åbning.
    } finally {
      isOpeningDoor.current = false
    }

    setSelectedDate(date)
  }

  return (
    <CalendarLayout
      header={
        <Header
          tickets={tickets}
          completedDoors={completedDates.length}
        />
      }
      journey={
        <DecemberJourney
          completedDoors={completedDates.length}
          currentDate={currentDate}
        />
      }
    >
      <div className="calendar-intro">
        <h1 className="calendar-intro__title">
          <span aria-hidden="true">✦</span>
          Julekalender 2026
          <span aria-hidden="true">✦</span>
        </h1>

        <p className="calendar-intro__description">
          {totalDoors} låger. Ét juleeventyr.
        </p>
      </div>

      {calendarData ? (
        <Calendar
          key={currentDate}
          calendarDoors={calendarData.doors}
          currentDate={currentDate}
          completedDates={completedDates}
          onOpenDoor={handleOpenDoor}
        />
      ) : loadError ? (
        <p role="alert">
          Kalenderen kunne ikke indlæses. Prøv at genindlæse siden.
        </p>
      ) : (
        <p role="status">Henter kalenderen...</p>
      )}

      <CalendarRoute currentDate={currentDate} />

      {selectedDoor && (
        <ActivityModal
          title={activityTitle}
          onClose={() => setSelectedDate(null)}
          info={
            <ActivityInfo
              title={activityTitle}
              progress={completedDates.length}
              description={
                activityContent?.description ?? [
                  formatCalendarDate(selectedDoor.date),
                ]
              }
              rules={activityContent?.rules ?? []}
            />
          }
        >
          <p>Aktiviteten vises her.</p>
        </ActivityModal>
      )}
    </CalendarLayout>
  )
}

export default CalendarPage