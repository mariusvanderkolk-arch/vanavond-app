import { Button } from '../components/Button'
import { PeopleStepper } from '../components/PeopleStepper'
import { GROUP_LABELS } from '../data/ingredients'
import { nextSevenDays } from '../lib/dates'
import { formatPeople } from '../lib/format'
import { shoppingList, type ShoppingLine } from '../lib/matching'
import { useStore, type View } from '../lib/store'

export function ShoppingList({ onNavigate }: { onNavigate: (view: View) => void }) {
  const plan = useStore((s) => s.plan)
  const pantry = useStore((s) => s.pantry)
  const people = useStore((s) => s.people)
  const setPeople = useStore((s) => s.setPeople)
  const checked = useStore((s) => s.checked)
  const toggleChecked = useStore((s) => s.toggleChecked)

  const days = nextSevenDays()
  const plannedCount = days.filter((d) => plan[d]).length
  const lines = shoppingList(plan, pantry, people, days)
  const needed = lines.filter((l) => !l.optional)
  const extras = lines.filter((l) => l.optional)
  const done = needed.filter((l) => checked[l.key]).length

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="title text-ink">Boodschappen</h1>
        <p className="mt-2 max-w-xl text-base leading-normal text-muted">
          Alleen wat niet in je kast ligt, voor de avonden die je hebt vastgezet.
        </p>
      </header>

      {plannedCount === 0 ? (
        <div className="rounded-xl border border-line bg-elevated p-4">
          <p className="text-base leading-normal text-muted">
            Zet eerst een paar avonden vast. De lijst volgt vanzelf, zonder dingen die je al hebt.
          </p>
          <Button className="mt-4" onClick={() => onNavigate('week')}>
            Naar de week
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {needed.length === 0 ? 'Niets meer halen.' : `${done} van ${needed.length} afgevinkt`} · {plannedCount}{' '}
              {plannedCount === 1 ? 'avond' : 'avonden'}
            </p>
            <PeopleStepper people={people} setPeople={setPeople} />
          </div>
          <p className="text-sm text-faint">Hoeveelheden voor {formatPeople(people)}.</p>
          <LineGroup title="Nog halen" lines={needed} checked={checked} onToggle={toggleChecked} />
          {extras.length > 0 ? <LineGroup title="Lekkerder met" lines={extras} checked={checked} onToggle={toggleChecked} /> : null}
        </>
      )}
    </div>
  )
}

interface LineGroupProps {
  title: string
  lines: ShoppingLine[]
  checked: Record<string, boolean>
  onToggle: (key: string) => void
}

function LineGroup({ title, lines, checked, onToggle }: LineGroupProps) {
  return (
    <section>
      <h2 className="text-sm font-medium text-muted">{title}</h2>
      {lines.length === 0 ? (
        <p className="mt-2 text-base text-muted">Alles voor deze avonden ligt al in huis.</p>
      ) : (
        <ul className="mt-2">
          {lines.map((line) => {
            const isChecked = Boolean(checked[line.key])
            return (
              <li key={line.key} className="border-b border-line">
                <label className="flex min-h-11 cursor-pointer items-center gap-3 py-3">
                  <input type="checkbox" checked={isChecked} onChange={() => onToggle(line.key)} />
                  <span className="min-w-0 flex-1">
                    <span className={`block text-base ${isChecked ? 'text-faint line-through' : ''}`}>
                      {line.label}
                      <span className="text-faint"> · {GROUP_LABELS[line.group]}</span>
                    </span>
                    <span className="block text-sm text-muted">
                      {line.amount} · {line.meals.join(', ')}
                    </span>
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
