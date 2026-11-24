import { useEffect, useRef, useState } from 'react'
import { loadCalendarData } from '../api/loadCalendarData'
import ActivityCompletion from '../components/ActivityCompletion'
import ActivityInfo from '../components/ActivityInfo'
import ActivityModal from '../components/ActivityModal'
import ActivityResultView from '../components/ActivityResultView'
import Calendar from '../components/Calendar'
import CalendarRoute from '../components/CalendarRoute'
import DecemberJourney from '../components/DecemberJourney'
import DevToolbar from '../components/DevToolbar'
import GiftOverview from '../components/GiftOverview'
import Header from '../components/Header'
import MemoryGame from '../components/activities/MemoryGame'
import Quiz from '../components/activities/Quiz'
import ScratchCard from '../components/activities/ScratchCard'
import SpinWheel from '../components/activities/SpinWheel'
import { devConfig } from '../config/dev'
import CalendarLayout from '../templates/CalendarLayout'
import type {
  ActivityResult,
  CalendarData,
  SavedActivityResult,
} from '../types/calendar'
import {
  loadActivityResults,
  resetActivityResults,
  saveActivityResult,
} from '../utils/activityResults'
import { animateGoose } from '../utils/animateGoose'
import {
  formatCalendarDate,
  getCalendarDate,
  totalDoors,
} from '../utils/calendar'

type ModalView =
  | { type: 'gifts' }
  | { type: 'activity'; date: string }
  | { type: 'reward'; date: string }

function getCurrentDate(): string {
  return devConfig.enabled
    ? devConfig.initialDate
    : getCalendarDate()
}

// Samler kalender, aktiviteter, resultater og den fælles modal.
function CalendarPage() {
  const isOpeningDoor = useRef(false)

  const [currentDate, setCurrentDate] = useState(getCurrentDate)
  const [activityResults, setActivityResults] =
    useState<SavedActivityResult[]>(loadActivityResults)
  const [modalView, setModalView] = useState<ModalView | null>(null)
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [unsavedResult, setUnsavedResult] =
    useState<SavedActivityResult | null>(null)

  const completedDates = activityResults.map((result) => result.date)

  const tickets = activityResults.reduce(
    (total, result) => total + result.tickets,
    0,
  )

  const selectedDate =
    modalView && modalView.type !== 'gifts'
      ? modalView.date
      : null

  const selectedDoor = calendarData?.doors.find(
    (door) => door.date === selectedDate,
  )

  const selectedResult = activityResults.find(
    (result) => result.date === selectedDate,
  )

  const activityContent = selectedDoor
    ? calendarData?.activities[selectedDoor.activity]
    : null

  const selectedQuiz = calendarData?.quizzes.find(
    (entry) => entry.id === selectedDoor?.quizId,
  )?.quiz

  const activityTitle =
    activityContent?.title ??
    (selectedDoor ? formatCalendarDate(selectedDoor.date) : '')

  let modalTitle = activityTitle

  if (modalView?.type === 'gifts') {
    modalTitle = 'Mine resultater'
  } else if (modalView?.type === 'reward') {
    modalTitle = 'Dit resultat'
  }

  // I udvikling styres datoen fra udviklerpanelet.
  useEffect(() => {
    if (devConfig.enabled) return

    function updateDate() {
      setCurrentDate(getCalendarDate())
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
    const isCompleted = completedDates.includes(date)
    const canOpen = date === currentDate || isCompleted

    if (!canOpen || isOpeningDoor.current) return

    isOpeningDoor.current = true

    try {
      await animateGoose(date)
    } catch {
      // En afbrudt animation må ikke forhindre åbning.
    } finally {
      isOpeningDoor.current = false
    }

    // Genbesøg går direkte til den gemte belønning.
    setModalView({
      type: isCompleted ? 'reward' : 'activity',
      date,
    })
  }

  function handleOpenGifts() {
    if (!calendarData || isOpeningDoor.current) return

    setModalView({ type: 'gifts' })
  }

  function handleSelectGift(date: string) {
    if (date > currentDate || !completedDates.includes(date)) return

    setModalView({ type: 'reward', date })
  }

  function handleViewGift() {
    if (!selectedDoor || !selectedResult) return

    setModalView({
      type: 'reward',
      date: selectedDoor.date,
    })
  }

  function persistResult(result: SavedActivityResult) {
    try {
      const savedResults = saveActivityResult(result.date, result)

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
    if (
      modalView?.type !== 'activity' ||
      !selectedDoor ||
      selectedResult
    ) {
      return
    }

    const completedResult: SavedActivityResult = {
      date: selectedDoor.date,
      tickets: result.tickets,
      discountPercent: result.discountPercent,
    }

    setActivityResults((current) => [
      ...current,
      completedResult,
    ])

    // Gemmer straks uden at skifte væk fra spillefeltet.
    persistResult(completedResult)
  }

  function handleDevDateChange(date: string) {
    if (!devConfig.enabled || !date || isOpeningDoor.current) return

    setModalView(null)
    setCurrentDate(date)
  }

  function handleDevReset() {
    if (!devConfig.enabled || isOpeningDoor.current) return

    try {
      resetActivityResults()
      setActivityResults([])
      setUnsavedResult(null)
      setModalView(null)
    } catch (error) {
      console.warn('Testresultaterne kunne ikke nulstilles.', error)
    }
  }

  function renderActivity() {
    if (!selectedDoor || !calendarData) return null

    switch (selectedDoor.activity) {
      case 'wheel':
        return (
          <SpinWheel
            key={selectedDoor.date}
            segments={calendarData.activities.wheel.segments}
            onComplete={handleComplete}
          />
        )

      case 'quiz':
        return selectedQuiz ? (
          <Quiz
            key={selectedDoor.date}
            quiz={selectedQuiz}
            onComplete={handleComplete}
          />
        ) : (
          <p role="alert">Dagens quiz kunne ikke findes.</p>
        )

      case 'memory':
        return (
          <MemoryGame
            key={selectedDoor.date}
            game={calendarData.activities.memory.memoryGame}
            onComplete={handleComplete}
          />
        )

      case 'scratch':
        return (
          <ScratchCard
            key={selectedDoor.date}
            game={calendarData.activities.scratch.scratchGame}
            onComplete={handleComplete}
          />
        )

      default:
        return <p role="alert">Aktiviteten kunne ikke findes.</p>
    }
  }

  return (
    <CalendarLayout
      header={
        <Header
          tickets={tickets}
          completedDoors={completedDates.length}
          onOpenGifts={handleOpenGifts}
        />
      }
      journey={
        <DecemberJourney
          completedDoors={completedDates.length}
          currentDate={currentDate}
          onOpenGifts={handleOpenGifts}
        />
      }
    >
      {devConfig.enabled && (
        <DevToolbar
          currentDate={currentDate}
          onDateChange={handleDevDateChange}
          onReset={handleDevReset}
        />
      )}

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

      {modalView && calendarData && (
        <ActivityModal
          title={modalTitle}
          progress={completedDates.length}
          onClose={() => setModalView(null)}
          onBack={
            modalView.type === 'reward'
              ? handleOpenGifts
              : undefined
          }
          info={
            modalView.type === 'activity' && selectedDoor ? (
              <ActivityInfo
                description={activityContent?.description ?? []}
                rules={activityContent?.rules ?? []}
              />
            ) : undefined
          }
        >
          {modalView.type === 'gifts' ? (
            <GiftOverview
              doors={calendarData.doors}
              currentDate={currentDate}
              completedDates={completedDates}
              onSelectGift={handleSelectGift}
            />
          ) : modalView.type === 'reward' ? (
            selectedDoor && selectedResult ? (
              <div className="gift-overview__reward">
                <ActivityResultView
                  key={selectedDoor.date}
                  result={selectedResult}
                  door={selectedDoor}
                />
              </div>
            ) : (
              <p role="alert">Belønningen kunne ikke findes.</p>
            )
          ) : (
            <div
              className={
                'activity-game' +
                (selectedResult ? ' activity-game--completed' : '')
              }
            >
              <div className="activity-game__stage">
                {renderActivity()}
              </div>

              <div className="activity-game__result">
                {selectedResult && (
                  <ActivityCompletion
                    result={selectedResult}
                    onViewGift={handleViewGift}
                  />
                )}
              </div>
            </div>
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