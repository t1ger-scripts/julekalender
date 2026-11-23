// Kalenderens fire aktivitetstyper.
export type ActivityType = 'wheel' | 'memory' | 'quiz' | 'scratch'

// En enkelt gevinst i spillenes konfiguration.
export interface ActivityReward {
  type: 'discount' | 'ticket' | 'none'
  value: number
}

// Et felt på lykkehjulet.
export interface WheelSegment extends ActivityReward {
  color: 'white' | 'red'
  label: string
}

// En spilleregel med tilhørende ikon.
export interface ActivityRule {
  icon: string
  text: string
}

// Fælles information om en aktivitet.
export interface ActivityContent {
  title: string
  description: string[]
  rules: ActivityRule[]
}

// Et quizspørgsmål. correctAnswer er svarmulighedens indeks fra 0.
export interface QuizQuestion {
  image: string
  imageAlt: string
  question: string
  answers: string[]
  correctAnswer: number
  reward: ActivityReward
}

export type QuizReward = ActivityReward

// Et spørgsmål identificeret fra quiz.json.
export interface QuizEntry {
  id: string
  quiz: QuizQuestion
}

// Pudeflipperens indstillinger.
export type ScratchOutcomeType = 'gift' | 'feather' | 'ticket'

export interface ScratchGame {
  frontImage: string
  fieldCount: number
  attemptLimit: number
  giftsToWin: number
  reward: ActivityReward
  outcomeWeights: Record<ScratchOutcomeType, number>
  outcomes: {
    gift: {
      image: string
    }
    feather: {
      image: string
      discount: number
    }
    ticket: {
      image: string
      points: number
    }
  }
}

// Pudematcherens indstillinger.
export interface MemoryGame {
  frontImage: string
  fieldCount: number
  attemptLimit: number
  reward: ActivityReward
  outcomes: {
    royal: { image: string }
    kiddy: { image: string }
    classic: { image: string }
    hcandersen: { image: string }
    organiccare: { image: string }
    tickets: { image: string }
  }
}

// Aktivitetstekster med tilhørende spilindstillinger.
export interface WheelActivity extends ActivityContent {
  segments: WheelSegment[]
}

export interface ScratchActivity extends ActivityContent {
  scratchGame: ScratchGame
}

export interface MemoryActivity extends ActivityContent {
  memoryGame: MemoryGame
}

export interface ActivitiesData {
  wheel: WheelActivity
  scratch: ScratchActivity
  memory: MemoryActivity
  quiz: ActivityContent
}

// Produktet tilknyttet en kalenderlåge.
export interface CalendarPrize {
  name: string
  image: string
  productUrl: string
}

// En kalenderlåge. Datoformat: YYYY-MM-DD.
export interface CalendarDoor {
  date: string
  activity: ActivityType
  quizId?: string
  adventNumber?: number
  prize: CalendarPrize | null
  discountCode: string | null
}

// Det samlede indhold fra de tre JSON-filer.
export interface CalendarData {
  doors: CalendarDoor[]
  activities: ActivitiesData
  quizzes: QuizEntry[]
}

// Fælles resultat, som aktiviteterne sender til kalenderen.
export interface ActivityResult {
  tickets: number
  discountPercent: number
}

// Et gemt resultat markerer, at datoens aktivitet er gennemført.
export interface SavedActivityResult extends ActivityResult {
  date: string
}