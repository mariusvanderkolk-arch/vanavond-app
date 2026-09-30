import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { BASIC_PANTRY, GROUP_LABELS, GROUPS, INGREDIENTS, VEGETABLE_DRAWER } from '../data/ingredients'
import { useStore } from '../lib/store'

export function Pantry() {
  const pantry = useStore((s) => s.pantry)
  const togglePantry = useStore((s) => s.togglePantry)
  const addToPantry = useStore((s) => s.addToPantry)
  const clearPantry = useStore((s) => s.clearPantry)
  const [query, setQuery] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)

  const inHouse = useMemo(() => new Set(pantry), [pantry])
  const q = query.trim().toLowerCase()

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="title text-ink">Wat ligt er in huis?</h1>
        <p className="mt-2 max-w-xl text-base leading-normal text-muted">
          Tik aan wat je hebt. Vanavond rekent uit wat je nog moet halen, en wat je vanavond al kunt koken.
        </p>
        <p className="mt-3 text-sm font-medium tabular-nums text-ink">{pantry.length} in huis</p>
      </header>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button onClick={() => addToPantry(BASIC_PANTRY)}>Basisvoorraad</Button>
        <Button variant="secondary" onClick={() => addToPantry(VEGETABLE_DRAWER)}>
          Groentelade
        </Button>
        {confirmClear ? (
          <Button
            variant="secondary"
            onClick={() => {
              clearPantry()
              setConfirmClear(false)
            }}
          >
            Ja, kast leegmaken
          </Button>
        ) : (
          <Button variant="ghost" disabled={pantry.length === 0} onClick={() => setConfirmClear(true)}>
            Wis kast
          </Button>
        )}
      </div>

      <label className="relative block">
        <span className="sr-only">Zoek een ingrediënt</span>
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-faint" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek een ingrediënt"
          className="h-11 w-full rounded-md border border-line bg-elevated pr-3 pl-10 text-base text-ink placeholder:text-faint"
        />
      </label>

      {GROUPS.map((group) => {
        const items = INGREDIENTS.filter((i) => i.group === group && (q === '' || i.label.toLowerCase().includes(q)))
        if (items.length === 0) return null
        return (
          <section key={group}>
            <h2 className="text-sm font-medium text-muted">{GROUP_LABELS[group]}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item.id}>
                  <Chip tone="outline" pressed={inHouse.has(item.id)} onClick={() => togglePantry(item.id)}>
                    {item.label}
                  </Chip>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      {q !== '' && !INGREDIENTS.some((i) => i.label.toLowerCase().includes(q)) ? (
        <p className="text-base text-muted">Geen ingrediënt gevonden voor ‘{query.trim()}’.</p>
      ) : null}
    </div>
  )
}
