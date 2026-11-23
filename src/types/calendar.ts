// Fælles typer for kalenderens aktiviteter og indhold.
export type ActivityType =
  | 'wheel'
  | 'memory'
  | 'quiz'
  | 'advent'
  | 'scratch'

// Et felt på lykkehjulet.
export interface WheelSegment {
  color: 'white' | 'red'
  label: string
  type: 'discount' | 'ticket' | 'none'
  value: number
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

// Produktet tilknyttet en kalenderlåge.
export interface CalendarPrize {
  name: string
  image: string
  productUrl: string
}

// Indholdet bag en låge. Datoformat: YYYY-MM-DD.
export interface CalendarDoor {
  date: string
  activity: ActivityType | null
  adventNumber?: number
  prize: CalendarPrize | null
  discountCode: string | null
}

// Det samlede indhold fra kalenderens JSON-filer.
export interface CalendarData {
  doors: CalendarDoor[]
  activities: Record<ActivityType, ActivityContent | null>
}