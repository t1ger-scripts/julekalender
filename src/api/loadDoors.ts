/* Indlæser og validerer kalenderindholdet fra public/data/doors.json. */
import type { WheelDoor } from "../types/calendar"

export async function loadDoors(): Promise<WheelDoor[]> {
  const response = await fetch("/data/doors.json")

  if (!response.ok) {
    throw new Error("Kunne ikke hente kalenderens låger")
  }

  return await response.json()
}