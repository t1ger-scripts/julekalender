/* Definerer fælles interfaces og typer for låger, aktiviteter, præmier og brugerfremgang. */

export interface WheelSegment {
  color: "white" | "red"
  label: string
  type: "discount" | "ticket" | "none"
  value: number
}

export interface ActivityRule {
  icon: string
  text: string
}

export interface ActivityContent {
  title: string
  description: string[]
  rules: ActivityRule[]
}

export interface WheelDoor {
  day: number
  activity: "wheel"
  content: ActivityContent
  segments: WheelSegment[]
}

export type ActivityType =
  | 'wheel'
  | 'memory'
  | 'quiz'
  | 'advent'
  | 'scratch'

export interface CalendarDoor {
  day: number
  activity: ActivityType | null
  adventNumber?: number
}