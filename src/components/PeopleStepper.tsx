import { Minus, Plus } from 'lucide-react'
import { formatPeople } from '../lib/format'
import { Button } from './Button'

interface Props {
  people: number
  setPeople: (n: number) => void
}

export function PeopleStepper({ people, setPeople }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Button variant="secondary" size="icon" aria-label="Minder personen" disabled={people <= 1} onClick={() => setPeople(people - 1)}>
        <Minus />
      </Button>
      <span className="min-w-24 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {formatPeople(people)}
      </span>
      <Button variant="secondary" size="icon" aria-label="Meer personen" disabled={people >= 8} onClick={() => setPeople(people + 1)}>
        <Plus />
      </Button>
    </div>
  )
}
