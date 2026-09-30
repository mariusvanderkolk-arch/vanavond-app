/** '1,5 stuk', '200 g', '3 el' */
export function formatAmount(qty: number, unit?: string): string {
  const rounded = Math.round(qty * 10) / 10
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace('.', ',')
  return unit ? `${text} ${unit}` : text
}

export function formatPeople(n: number): string {
  return n === 1 ? '1 persoon' : `${n} personen`
}

export function missingLabel(count: number): string {
  if (count === 0) return 'Alles in huis'
  if (count === 1) return 'Nog 1 ding halen'
  return `Nog ${count} dingen halen`
}
