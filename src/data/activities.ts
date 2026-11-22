import type {
  ActivityContent,
  ActivityType,
} from '../types/calendar'

// Fælles tekster til aktiviteterne.
// De resterende aktiviteter udfyldes af de ansvarlige i gruppen.
export const activityContents: Record<
  ActivityType,
  ActivityContent | null
> = {
  wheel: {
    title: 'Drej julen i gang',
    description: [
      'December er begyndt, og dagens gave venter på dig.',
      'Drej hjulet og se, hvor det lander.',
    ],
    rules: [
      {
        icon: '/images/icons/games/icon-ticket-red.png',
        text: 'Tryk på “Drej hjulet” for at starte.',
      },
      {
        icon: '/images/icons/calendar/icon-door-gift-red-small.png',
        text: 'Vent, til hjulet er stoppet, og dit resultat bliver vist.',
      },
    ],
  },
  memory: null,
  quiz: null,
  advent: null,
  scratch: null,
}