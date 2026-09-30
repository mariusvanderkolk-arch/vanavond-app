/** Datums als 'JJJJ-MM-DD' in lokale tijd, zodat een dag een dag blijft. */
export type DayKey = string

const DAYS = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
const MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
]
const MONTHS_SHORT = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']

const pad = (n: number) => String(n).padStart(2, '0')

export function toDayKey(date = new Date()): DayKey {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function fromDayKey(key: DayKey): Date {
  const [y, m, d] = key.split('-').map(Number)
  // Middag, zodat zomertijd nooit een dag verschuift.
  return new Date(y, m - 1, d, 12)
}

export function today(): DayKey {
  return toDayKey()
}

export function addDays(key: DayKey, amount: number): DayKey {
  const date = fromDayKey(key)
  date.setDate(date.getDate() + amount)
  return toDayKey(date)
}

/** Vandaag plus de zes dagen erna. */
export function nextSevenDays(start = today()): DayKey[] {
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

/** 'woensdag 30 september' */
export function longDate(key: DayKey): string {
  const date = fromDayKey(key)
  return `${DAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`
}

/** 'Vandaag', 'Morgen' of de weekdag met hoofdletter. */
export function dayName(key: DayKey, reference = today()): string {
  if (key === reference) return 'Vandaag'
  if (key === addDays(reference, 1)) return 'Morgen'
  const name = DAYS[fromDayKey(key).getDay()]
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/** '30 sep' */
export function shortDate(key: DayKey): string {
  const date = fromDayKey(key)
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`
}
