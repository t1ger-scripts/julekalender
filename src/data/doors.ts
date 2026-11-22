import type { CalendarDoor } from '../types/calendar'

// Kalenderens 24 låger.
// null betyder, at indholdet endnu ikke er besluttet.
// Brugerens fremgang gemmes separat i localStorage.
export const calendarDoors: CalendarDoor[] = [
  { day: 1, activity: null, prize: null, discountCode: null, content: null },
  { day: 2, activity: null, prize: null, discountCode: null, content: null },
  { day: 3, activity: null, prize: null, discountCode: null, content: null },
  { day: 4, activity: null, prize: null, discountCode: null, content: null },
  { day: 5, activity: null, prize: null, discountCode: null, content: null },
  {
    day: 6,
    activity: 'advent',
    adventNumber: 2,
    prize: null,
    discountCode: null,
    content: null,
  },
  { day: 7, activity: null, prize: null, discountCode: null, content: null },
  { day: 8, activity: null, prize: null, discountCode: null, content: null },
  { day: 9, activity: null, prize: null, discountCode: null, content: null },
  { day: 10, activity: null, prize: null, discountCode: null, content: null },
  { day: 11, activity: null, prize: null, discountCode: null, content: null },
  { day: 12, activity: null, prize: null, discountCode: null, content: null },
  {
    day: 13,
    activity: 'advent',
    adventNumber: 3,
    prize: null,
    discountCode: null,
    content: null,
  },
  { day: 14, activity: null, prize: null, discountCode: null, content: null },
  { day: 15, activity: null, prize: null, discountCode: null, content: null },
  { day: 16, activity: null, prize: null, discountCode: null, content: null },
  { day: 17, activity: null, prize: null, discountCode: null, content: null },
  { day: 18, activity: null, prize: null, discountCode: null, content: null },
  { day: 19, activity: null, prize: null, discountCode: null, content: null },
  {
    day: 20,
    activity: 'advent',
    adventNumber: 4,
    prize: null,
    discountCode: null,
    content: null,
  },
  { day: 21, activity: null, prize: null, discountCode: null, content: null },
  { day: 22, activity: null, prize: null, discountCode: null, content: null },
  { day: 23, activity: null, prize: null, discountCode: null, content: null },
  { day: 24, activity: null, prize: null, discountCode: null, content: null },
]