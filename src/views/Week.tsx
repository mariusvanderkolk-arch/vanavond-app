import { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { getRecipe } from '../data/recipes'
import { dayName, nextSevenDays, shortDate, today, type DayKey } from '../lib/dates'
import { missingLabel } from '../lib/format'
import { suggest } from '../lib/matching'
import { useStore } from '../lib/store'

export function Week() {
  const plan = useStore((s) => s.plan)
  const pantry = useStore((s) => s.pantry)
  const minutes = useStore((s) => s.minutes)
  const diet = useStore((s) => s.diet)
  const mood = useStore((s) => s.mood)
  const setPlan = useStore((s) => s.setPlan)
  const assignDay = useStore((s) => s.assignDay)
  const clearDay = useStore((s) => s.clearDay)
  const openRecipe = useStore((s) => s.openRecipe)
  const tonightId = useStore((s) => s.tonightId)
  const lockTonight = useStore((s) => s.lockTonight)
  const [choosing, setChoosing] = useState<DayKey | null>(null)

  const days = nextSevenDays()
  const now = today()
  const suggestions = useMemo(() => suggest({ pantry, minutes, diet, mood }), [pantry, minutes, diet, mood])

  // Vult lege dagen met het best passende recept dat deze week nog niet voorkomt.
  function fillOpenDays() {
    if (suggestions.length === 0) return
    const next = { ...plan }
    const used = new Set(Object.values(next))
    for (const day of days) {
      if (next[day]) continue
      const pick = suggestions.find((s) => !used.has(s.recipe.id)) ?? suggestions[0]
      next[day] = pick.recipe.id
      used.add(pick.recipe.id)
    }
    setPlan(next)
    if (!tonightId && next[now]) lockTonight(next[now])
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="title text-ink">Deze week</h1>
        <p className="mt-2 max-w-xl text-base leading-normal text-muted">
          Zeven avonden, één boodschappenlijst. Open dagen vullen zich met wat het best bij je kast past.
        </p>
      </header>

      <Button className="self-start max-sm:w-full" onClick={fillOpenDays} disabled={suggestions.length === 0}>
        Vul open avonden
      </Button>

      <ul className="flex flex-col gap-3">
        {days.map((day) => {
          const recipe = getRecipe(plan[day])
          const open = choosing === day
          return (
            <li key={day} className="rounded-lg border border-line bg-elevated p-3">
              <div className="flex items-center gap-3">
                <div className="w-20 shrink-0">
                  <p className="text-sm font-medium text-ink">{dayName(day, now)}</p>
                  <p className="text-sm text-faint">{shortDate(day)}</p>
                </div>
                {recipe ? (
                  <button type="button" onClick={() => openRecipe(recipe.id)} className="min-w-0 flex-1 cursor-pointer text-left">
                    <span className="block truncate text-base font-medium">{recipe.title}</span>
                    <span className="block text-sm text-faint">{recipe.minutes} min</span>
                  </button>
                ) : (
                  <p className="min-w-0 flex-1 text-base text-faint">Nog open</p>
                )}
                {recipe ? (
                  <Button variant="ghost" className="rounded-sm" onClick={() => clearDay(day)}>
                    Wis
                  </Button>
                ) : (
                  <Button variant="secondary" className="rounded-sm" aria-expanded={open} onClick={() => setChoosing(open ? null : day)}>
                    Kies
                  </Button>
                )}
              </div>
              {open ? (
                <ul className="mt-3 flex flex-col border-t border-line">
                  {suggestions.length === 0 ? (
                    <li className="py-3 text-sm text-muted">Verruim tijd of dieet op Vanavond.</li>
                  ) : (
                    suggestions.map((s) => (
                      <li key={s.recipe.id}>
                        <button
                          type="button"
                          className="press flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 py-2 text-left"
                          onClick={() => {
                            assignDay(day, s.recipe.id)
                            setChoosing(null)
                          }}
                        >
                          <span className="text-sm font-medium">{s.recipe.title}</span>
                          <span className="shrink-0 text-sm text-faint">{missingLabel(s.missing.length)}</span>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
