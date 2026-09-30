import { Bookmark, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { ingredientLabel } from '../data/ingredients'
import { getRecipe, type Recipe } from '../data/recipes'
import { formatAmount, formatPeople, missingLabel } from '../lib/format'
import { checkPantry } from '../lib/matching'
import { useStore } from '../lib/store'
import { Button } from './Button'

/** Receptvenster: onderaan als sheet op mobiel, gecentreerd op desktop. */
export function RecipeSheet() {
  const openId = useStore((s) => s.openId)
  const openRecipe = useStore((s) => s.openRecipe)
  const recipe = getRecipe(openId)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (recipe && !dialog.open) {
      dialog.showModal()
      dialog.scrollTop = 0
      document.documentElement.style.overflow = 'hidden'
    } else if (!recipe && dialog.open) {
      dialog.close()
    }
    if (!recipe) document.documentElement.style.overflow = ''
  }, [recipe])

  const close = () => openRecipe(null)

  return (
    <dialog
      ref={ref}
      aria-labelledby="recept-titel"
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      className="sheet fixed inset-x-0 top-auto bottom-0 w-full overflow-y-auto overscroll-contain rounded-t-xl border border-line bg-elevated text-ink outline-none md:inset-0 md:m-auto md:h-fit md:max-w-lg md:rounded-xl"
    >
      {recipe ? <RecipeDetail key={recipe.id} recipe={recipe} onClose={close} /> : null}
    </dialog>
  )
}

function RecipeDetail({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const pantry = useStore((s) => s.pantry)
  const people = useStore((s) => s.people)
  const favorites = useStore((s) => s.favorites)
  const toggleFavorite = useStore((s) => s.toggleFavorite)
  const togglePantry = useStore((s) => s.togglePantry)
  const lockTonight = useStore((s) => s.lockTonight)
  const unlockTonight = useStore((s) => s.unlockTonight)
  const tonightId = useStore((s) => s.tonightId)

  const check = checkPantry(recipe, pantry)
  const saved = favorites.includes(recipe.id)
  const factor = people / 2

  return (
    <div className="relative">
      <img src={recipe.image} alt="" className="frame-photo" />
      <button
        type="button"
        onClick={onClose}
        aria-label="Sluiten"
        className="press absolute top-3 right-3 flex size-11 cursor-pointer items-center justify-center rounded-full bg-elevated text-ink"
      >
        <X aria-hidden />
      </button>

      <div className="flex flex-col gap-5 p-4 pb-8">
        <div>
          <p className="text-sm font-medium text-muted">
            {missingLabel(check.missing.length)} · {recipe.minutes} min
          </p>
          <h2 id="recept-titel" className="title mt-1 text-ink">
            {recipe.title}
          </h2>
          <p className="mt-2 text-base leading-normal text-muted">{recipe.summary}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {tonightId === recipe.id ? (
            <Button variant="secondary" onClick={unlockTonight}>
              Maak los
            </Button>
          ) : (
            <Button onClick={() => lockTonight(recipe.id)}>Deze wordt het</Button>
          )}
          <Button variant="secondary" aria-pressed={saved} onClick={() => toggleFavorite(recipe.id)}>
            <Bookmark aria-hidden fill={saved ? 'currentColor' : 'none'} />
            {saved ? 'Bewaard' : 'Bewaren'}
          </Button>
        </div>

        <section>
          <h3 className="text-sm font-medium text-muted">Ingrediënten · {formatPeople(people)}</h3>
          <ul className="mt-2 flex flex-col">
            {recipe.ingredients.map((item) => {
              const inHouse = pantry.includes(item.id)
              return (
                <li key={item.id} className="flex min-h-14 items-center justify-between gap-3 border-b border-line py-1.5">
                  <span className="text-base">
                    {ingredientLabel(item.id)}
                    <span className="text-faint"> · {formatAmount(item.qty * factor, item.unit)}</span>
                    {item.optional ? <span className="text-faint"> · optioneel</span> : null}
                  </span>
                  {inHouse ? (
                    <span className="px-4 text-sm text-faint">in huis</span>
                  ) : (
                    <Button variant="ghost" className="rounded-sm" onClick={() => togglePantry(item.id)}>
                      Heb ik
                    </Button>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-medium text-muted">Zo maak je het</h3>
          <ol className="mt-3 flex flex-col gap-4">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-subtle text-sm font-medium">
                  {i + 1}
                </span>
                <p className="text-base leading-normal">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
