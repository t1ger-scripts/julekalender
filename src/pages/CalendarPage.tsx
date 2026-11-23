import { useEffect, useRef, useState } from 'react'
import {
  loadCompletedDays,
  saveCompletedDays,
} from '../utils/storage'
import CalendarLayout from '../templates/CalendarLayout'
import Header from '../components/Header'
import Calendar from '../components/Calendar'
import DecemberJourney from '../components/DecemberJourney'
import CalendarRoute from '../components/CalendarRoute'
import ActivityModal from '../components/ActivityModal'
import ActivityInfo from '../components/ActivityInfo'
import {
  formatCalendarDate,
  getCalendarDate,
  getCalendarDay,
  totalDoors,
} from '../utils/calendar'
import { loadCalendarData } from '../api/loadCalendarData'
import type { CalendarData } from '../types/calendar'
import { animateGoose } from '../utils/animateGoose'

// Lokal testdato. Sæt til null for at bruge den rigtige dato.
const testDate: string | null = '2026-12-06'

function getCurrentDate(): string {
  if (import.meta.env.DEV && testDate !== null) {
    return testDate
  }

  return getCalendarDate()
}

// Samler kalenderens indhold, brugerens fremgang og handlinger.
function CalendarPage() {
  const isOpeningDoor = useRef(false)
  const [currentDate, setCurrentDate] = useState(getCurrentDate)
  const [completedDates] = useState<string[]>(loadCompletedDays)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null)
  const [loadError, setLoadError] = useState(false)

  const selectedDoor = calendarData?.doors.find(
    (door) => door.date === selectedDate,
  )

  const activityContent = selectedDoor?.activity
    ? calendarData?.activities[selectedDoor.activity] ?? null
    : null

  // Til den eksisterende milepælslinjes beregning.
  const journeyDay = getCalendarDay(
    new Date(`${currentDate}T12:00:00Z`),
  )

  // Foreløbig værdi. Lodder kobles på aktiviteterne senere.
  const tickets = completedDates.length

  useEffect(() => {
    saveCompletedDays(completedDates)
  }, [completedDates])

  // Opdaterer datoen, hvis siden står åben hen over midnat.
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

  // Indlæser kalenderens indhold ved opstart.
  useEffect(() => {
    let isActive = true

    loadCalendarData()
      .then((data) => {
        if (isActive) {
          setCalendarData(data)
        }
      })
      .catch(() => {
        if (isActive) {
          setLoadError(true)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

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
          currentDay={journeyDay}
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
          onOpenDoor={async (date) => {
            if (
              isOpeningDoor.current ||
              (
                date !== currentDate &&
                !completedDates.includes(date)
              )
            ) {
              return
            }

            isOpeningDoor.current = true

            try {
              await animateGoose(date)
            } catch {
              // Aktiviteten kan stadig åbnes, hvis animationen afbrydes.
            } finally {
              isOpeningDoor.current = false
            }

            setSelectedDate(date)
          }}
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
          title={
            activityContent?.title ??
            formatCalendarDate(selectedDoor.date)
          }
          onClose={() => setSelectedDate(null)}
          info={
            <ActivityInfo
              title={
                activityContent?.title ??
                formatCalendarDate(selectedDoor.date)
              }
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