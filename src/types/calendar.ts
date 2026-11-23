// Fælles typer for kalenderens aktiviteter og indhold.
export type ActivityType =
  | 'wheel'
  | 'memory'
  | 'quiz'
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

// Belønninger fra en afsluttet aktivitet.
// Nul betyder, at den pågældende belønning ikke blev vundet.
export interface ActivityResult {
  tickets: number
  discountPercent: number
}

// Et gemt resultat knyttet til en bestemt kalenderdato.
// Et resultat med to nuller tæller også som gennemført.
export interface SavedActivityResult extends ActivityResult {
  date: string
}