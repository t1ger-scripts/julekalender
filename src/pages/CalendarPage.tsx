import { useEffect, useRef, useState } from 'react'
import { loadCalendarData } from '../api/loadCalendarData'
import ActivityInfo from '../components/ActivityInfo'
import ActivityModal from '../components/ActivityModal'
import ActivityResultView from '../components/ActivityResultView'
import Calendar from '../components/Calendar'
import CalendarRoute from '../components/CalendarRoute'
import DecemberJourney from '../components/DecemberJourney'
import Header from '../components/Header'
import SpinWheel from '../components/activities/SpinWheel'
import CalendarLayout from '../templates/CalendarLayout'
import type {
  ActivityResult,
  CalendarData,
  SavedActivityResult,
} from '../types/calendar'
import {
  loadActivityResults,
  saveActivityResult,
} from '../utils/activityResults'
import { animateGoose } from '../utils/animateGoose'
import {
  formatCalendarDate,
  getCalendarDate,
  totalDoors,
} from '../utils/calendar'

// Testdatoen bruges kun lokalt.
// Resultater gemmes også i testtilstand, så genbesøg kan kontrolleres.
const testConfig = {
  enabled: true,
  date: '2026-12-08',
}

function getCurrentDate(): string {
  return import.meta.env.DEV && testConfig.enabled
    ? testConfig.date
    : getCalendarDate()
}

// Samler kalenderens indhold, resultater og aktiviteter.
function CalendarPage() {
  const isOpeningDoor = useRef(false)

  const [currentDate, setCurrentDate] = useState(getCurrentDate)
  const [activityResults, setActivityResults] =
    useState<SavedActivityResult[]>(loadActivityResults)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [unsavedResult, setUnsavedResult] =
    useState<SavedActivityResult | null>(null)

  const completedDates = activityResults.map((result) => result.date)

  const tickets = activityResults.reduce(
    (total, result) => total + result.tickets,
    0,
  )

  const selectedDoor = calendarData?.doors.find(
    (door) => door.date === selectedDate,
  )

  const selectedResult = activityResults.find(
    (result) => result.date === selectedDate,
  )

  const activityContent = selectedDoor
    ? calendarData?.activities[selectedDoor.activity]
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

  function persistResult(result: SavedActivityResult) {
    try {
      const savedResults = saveActivityResult(result.date, result)

      // Bevarer eventuelle resultater, som kun er i hukommelsen,
      // hvis browseren tidligere har afvist at gemme dem.
      setActivityResults((current) => [
        ...savedResults,
        ...current.filter(
          (item) =>
            !savedResults.some((saved) => saved.date === item.date),
        ),
      ])

      setUnsavedResult((current) =>
        current?.date === result.date ? null : current,
      )
    } catch {
      setUnsavedResult(result)
    }
  }

  function handleComplete(result: ActivityResult) {
    if (!selectedDoor || selectedResult) return

    const completedResult: SavedActivityResult = {
      date: selectedDoor.date,
      tickets: result.tickets,
      discountPercent: result.discountPercent,
    }

    // Bevarer resultatet på siden, også hvis lokal lagring fejler.
    setActivityResults((current) => [
      ...current,
      completedResult,
    ])

    persistResult(completedResult)
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

      {selectedDoor && calendarData && (
        <ActivityModal
          title={selectedResult ? 'Din belønning' : activityTitle}
          onClose={() => setSelectedDate(null)}
          info={
            <ActivityInfo
              title={activityTitle}
              progress={completedDates.length}
              description={activityContent?.description ?? []}
              rules={activityContent?.rules ?? []}
            />
          }
        >
          {selectedResult ? (
            <ActivityResultView result={selectedResult} />
          ) : selectedDoor.activity === 'wheel' ? (
            <SpinWheel
              key={selectedDoor.date}
              segments={calendarData.activities.wheel.segments}
              onComplete={handleComplete}
            />
          ) : (
            <p>Denne aktivitet er endnu ikke tilkoblet.</p>
          )}

          {unsavedResult && (
            <div className="activity-save-error" role="alert">
              <p>
                Resultatet fra {formatCalendarDate(unsavedResult.date)}
                {' '}kunne ikke gemmes. Det kan gå tabt, hvis du
                genindlæser eller forlader siden.
              </p>

              <button
                type="button"
                onClick={() => persistResult(unsavedResult)}
              >
                Prøv at gemme igen
              </button>
            </div>
          )}
        </ActivityModal>
      )}
    </CalendarLayout>
  )
}

export default CalendarPage