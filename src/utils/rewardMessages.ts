import type { ActivityResult } from '../types/calendar'

export const completedActivityMessage =
  'Dagens aktivitet er gennemført. Du deltager i dagens lodtrækning.'

export function getRewardTitle(result: ActivityResult): string {
  return result.tickets > 0 || result.discountPercent > 0
    ? 'Din belønning'
    : 'Tak for spillet'
}

// Bruges både efter aktiviteten og i den gemte gavevisning.
export function getRewardMessages(result: ActivityResult): string[] {
  const messages: string[] = []

  if (result.tickets > 0) {
    const ticketLabel = result.tickets === 1 ? 'lod' : 'lodder'

    messages.push(
      `Du har vundet ${result.tickets} ${ticketLabel} til konkurrencen om hovedpræmien juleaften.`,
    )
  }

  if (result.discountPercent > 0) {
    messages.push(
      `Du har vundet ${result.discountPercent} % rabat på dagens produkt.`,
    )
  }

  if (messages.length === 0) {
    messages.push(
      'Det blev ikke til en ekstra gevinst denne gang. Der venter flere muligheder bag kalenderens kommende låger.',
    )
  }

  return messages
}