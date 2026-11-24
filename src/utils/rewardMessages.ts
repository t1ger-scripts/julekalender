import type { ActivityResult } from '../types/calendar'

export const completedActivityMessage =
  'Aktiviteten er gennemført. Du deltager i lodtrækningen om dagens produkt.'

// Bruges både efter aktiviteten og ved genbesøg.
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
    messages.push('Ingen ekstra gevinst denne gang.')
  }

  return messages
}
