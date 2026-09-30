import { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { PeopleStepper } from '../components/PeopleStepper'
import { FeatureCard, SmallCard } from '../components/RecipeCards'
import { BASIC_PANTRY, ingredientLabel } from '../data/ingredients'
import { getRecipe, SHOWCASE_IDS } from '../data/recipes'
import { longDate, today } from '../lib/dates'
import { formatPeople, missingLabel } from '../lib/format'
import { DIET_LABELS, MOOD_LABELS, suggest, type DietFilter, type MoodFilter, type Suggestion } from '../lib/matching'
import { useStore, type View } from '../lib/store'

const TIME_OPTIONS = [20, 30, 45, 60]
const DIET_OPTIONS: DietFilter[] = ['alles', 'vegetarisch', 'vegan']
const MOOD_OPTIONS: MoodFilter[] = ['alles', 'snel', 'comfort', 'licht', 'budget']

export function Tonight({ onNavigate }: { onNavigate: (view: View) => void }) {
  const pantry = useStore((s) => s.pantry)
  const minutes = useStore((s) => s.minutes)
  const diet = useStore((s) => s.diet)
  const mood = useStore((s) => s.mood)
  const tonightId = useStore((s) => s.tonightId)
  const favorites = useStore((s) => s.favorites)
  const addToPantry = useStore((s) => s.addToPantry)
  const openRecipe = useStore((s) => s.openRecipe)
  const lockTonight = useStore((s) => s.lockTonight)
  const unlockTonight = useStore((s) => s.unlockTonight)

  const suggestions = useMemo(() => suggest({ pantry, minutes, diet, mood }), [pantry, minutes, diet, mood])

  // Wisselt de kast of een filter, dan beginnen we opnieuw bij het beste voorstel.
  const filterKey = `${minutes}|${diet}|${mood}|${pantry.join(',')}`
  const [seenKey, setSeenKey] = useState(filterKey)
  const [index, setIndex] = useState(0)
  const [editing, setEditing] = useState(false)
  const [deciding, setDeciding] = useState(false)
  if (seenKey !== filterKey) {
    setSeenKey(filterKey)
    setIndex(0)
    setDeciding(false)
  }

  const locked = getRecipe(tonightId)
  const current = suggestions[index % Math.max(suggestions.length, 1)]
  const pantryEmpty = pantry.length === 0

  let main
  if (pantryEmpty && !locked) {
    main = <PantryFirst onBasic={() => addToPantry(BASIC_PANTRY)} onPantry={() => onNavigate('kast')} onOpen={openRecipe} />
  } else if (deciding && !locked) {
    main = (
      <Decider
        options={suggestions.slice(0, 5)}
        onTake={(id) => {
          lockTonight(id)
          setDeciding(false)
        }}
        onOpen={openRecipe}
        onStop={() => setDeciding(false)}
      />
    )
  } else if (locked) {
    main = (
      <FeatureCard
        recipe={locked}
        eyebrow="Vastgezet voor vanavond"
        missingCount={null}
        primary="Recept openen"
        onPrimary={() => openRecipe(locked.id)}
        secondary="Maak los"
        onSecondary={unlockTonight}
      />
    )
  } else if (current) {
    main = (
      <FeatureCard
        recipe={current.recipe}
        eyebrow={missingLabel(current.missing.length)}
        missingCount={current.missing.length}
        missing={current.missing.map((m) => ingredientLabel(m.id))}
        primary="Deze wordt het"
        onPrimary={() => lockTonight(current.recipe.id)}
        secondary="Recept"
        onSecondary={() => openRecipe(current.recipe.id)}
      />
    )
  } else {
    main = (
      <p className="rounded-xl border border-line bg-elevated p-4 text-base leading-normal text-muted">
        Niets past binnen deze tijd en dit dieet. Verruim de filters hierboven.
      </p>
    )
  }

  const showMore = !pantryEmpty && suggestions.length > 1 && !deciding

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium text-faint">De avondvraag · {longDate(today())}</p>
        <h1 className="display mt-3 text-ink">Wat eten we vanavond?</h1>
        <p className="mt-4 max-w-xl text-base leading-normal text-muted">
          De zin die in bijna elk huis rond zessen valt. Vanavond maakt er een besluit van, op basis van je kast.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-muted">
          <SettingsSummary />
        </p>
        <Button variant="ghost" aria-expanded={editing} onClick={() => setEditing((v) => !v)}>
          {editing ? 'Klaar' : 'Wijzig'}
        </Button>
      </div>

      {editing ? <Settings /> : null}

      {main}

      {showMore && !locked ? (
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setIndex((i) => (i + 1) % suggestions.length)}>
            Ander voorstel
          </Button>
          <Button variant="ghost" onClick={() => setDeciding(true)}>
            Ik kan niet kiezen
          </Button>
        </div>
      ) : null}

      {showMore ? (
        <section>
          <h2 className="text-sm font-medium text-muted">Ook passend</h2>
          <ul className="no-scrollbar mt-3 flex snap-x gap-3 overflow-x-auto pb-1">
            {suggestions.slice(1, 7).map((s) => (
              <li key={s.recipe.id} className="w-60 shrink-0 snap-start">
                <SmallCard recipe={s.recipe} missingCount={s.missing.length} onOpen={() => openRecipe(s.recipe.id)} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {favorites.length > 0 ? (
        <section>
          <h2 className="text-sm font-medium text-muted">Bewaard</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {favorites.map((id) => {
              const recipe = getRecipe(id)
              if (!recipe) return null
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => openRecipe(id)}
                    className="press flex h-11 w-full cursor-pointer items-center justify-between rounded-md px-1 text-left text-base"
                  >
                    <span>{recipe.title}</span>
                    <span className="text-sm text-faint">{recipe.minutes} min</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

function SettingsSummary() {
  const minutes = useStore((s) => s.minutes)
  const people = useStore((s) => s.people)
  const diet = useStore((s) => s.diet)
  const mood = useStore((s) => s.mood)
  const dietText = diet === 'alles' ? 'geen dieetfilter' : DIET_LABELS[diet].toLowerCase()
  const moodText = mood === 'alles' ? '' : ` · ${MOOD_LABELS[mood].toLowerCase()}`
  return (
    <span>
      {minutes} min · {formatPeople(people)} · {dietText}
      {moodText}
    </span>
  )
}

function Settings() {
  const { minutes, diet, mood, people, setMinutes, setDiet, setMood, setPeople } = useStore()
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-elevated p-4">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-muted">Tijd vanavond</legend>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((t) => (
            <Chip key={t} pressed={minutes === t} onClick={() => setMinutes(t)}>
              {t} min
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-muted">Dieet</legend>
        <div className="flex flex-wrap gap-2">
          {DIET_OPTIONS.map((d) => (
            <Chip key={d} pressed={diet === d} onClick={() => setDiet(d)}>
              {DIET_LABELS[d]}
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-muted">Stemming</legend>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((m) => (
            <Chip key={m} pressed={mood === m} onClick={() => setMood(m)}>
              {MOOD_LABELS[m]}
            </Chip>
          ))}
        </div>
      </fieldset>
      <div>
        <p className="mb-2 text-sm font-medium text-muted">Aan tafel</p>
        <PeopleStepper people={people} setPeople={setPeople} />
      </div>
    </div>
  )
}

interface PantryFirstProps {
  onBasic: () => void
  onPantry: () => void
  onOpen: (id: string) => void
}

function PantryFirst({ onBasic, onPantry, onOpen }: PantryFirstProps) {
  const showcase = SHOWCASE_IDS.map((id) => getRecipe(id)).filter((r) => r !== undefined)
  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-xl border border-line bg-elevated p-4">
        <h2 className="title text-ink">Eerst je kast</h2>
        <p className="mt-2 text-base leading-normal text-muted">
          Zonder te weten wat er ligt, blijft het gokken. Zet een basisvoorraad aan, of vink zelf aan wat je hebt.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button onClick={onBasic}>Basisvoorraad aanzetten</Button>
          <Button variant="secondary" onClick={onPantry}>
            Zelf aanvinken
          </Button>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-medium text-muted">Dit staat klaar zodra je kast klopt</h2>
        <ul className="no-scrollbar mt-3 flex snap-x gap-3 overflow-x-auto pb-1">
          {showcase.map((recipe) => (
            <li key={recipe.id} className="w-60 shrink-0 snap-start">
              <SmallCard recipe={recipe} onOpen={() => onOpen(recipe.id)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

interface DeciderProps {
  options: Suggestion[]
  onTake: (id: string) => void
  onOpen: (id: string) => void
  onStop: () => void
}

/** 'Ik kan niet kiezen': één voorstel tegelijk, tot iemand ja zegt. */
function Decider({ options, onTake, onOpen, onStop }: DeciderProps) {
  const [pick, setPick] = useState(0)
  const [passedAll, setPassedAll] = useState(false)

  if (options.length === 0) {
    return (
      <p className="rounded-xl border border-line bg-elevated p-4 text-base text-muted">
        Er is nu niets om tussen te kiezen. Verruim je filters.
      </p>
    )
  }

  if (passedAll) {
    const best = options[0]
    return (
      <section className="rounded-xl border border-line bg-elevated p-4">
        <h2 className="title text-ink">De eerste paste het best</h2>
        <p className="mt-2 text-base leading-normal text-muted">
          Je hebt {options.length} voorstellen afgewezen. {best.recipe.title} sluit het dichtst aan op je kast.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => onTake(best.recipe.id)}>Toch deze</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setPick(0)
              setPassedAll(false)
            }}
          >
            Opnieuw
          </Button>
        </div>
      </section>
    )
  }

  const current = options[Math.min(pick, options.length - 1)]
  return (
    <section className="flex flex-col gap-3">
      <p className="text-sm text-muted">
        Voorstel {pick + 1} van {options.length}. Eén voor één, tot iemand ja zegt.
      </p>
      <FeatureCard
        recipe={current.recipe}
        eyebrow={missingLabel(current.missing.length)}
        missingCount={current.missing.length}
        missing={current.missing.map((m) => ingredientLabel(m.id))}
        primary="Deze dan"
        onPrimary={() => onTake(current.recipe.id)}
        secondary="Niet deze"
        onSecondary={() => (pick >= options.length - 1 ? setPassedAll(true) : setPick((p) => p + 1))}
      />
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => onOpen(current.recipe.id)}>
          Recept bekijken
        </Button>
        <Button variant="ghost" onClick={onStop}>
          Stoppen
        </Button>
      </div>
    </section>
  )
}
