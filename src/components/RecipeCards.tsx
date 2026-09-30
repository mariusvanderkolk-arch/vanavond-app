import type { Recipe } from '../data/recipes'
import { missingLabel } from '../lib/format'
import { Button } from './Button'

interface FeatureProps {
  recipe: Recipe
  eyebrow: string
  missing?: string[]
  missingCount: number | null
  primary: string
  onPrimary: () => void
  secondary: string
  onSecondary: () => void
}

/** Grote kaart met foto: het voorstel voor vanavond. */
export function FeatureCard({ recipe, eyebrow, missing, missingCount, primary, onPrimary, secondary, onSecondary }: FeatureProps) {
  const dietLabel = recipe.diet === 'vegan' ? 'Vegan' : recipe.diet === 'vegetarisch' ? 'Vegetarisch' : null
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-elevated">
      <img src={recipe.image} alt={recipe.title} className="frame-photo" />
      <div className="flex flex-col gap-4 p-4">
        <div>
          <p className="text-sm font-medium text-muted">
            {eyebrow} · {recipe.minutes} min{dietLabel ? ` · ${dietLabel}` : ''}
          </p>
          <h2 className="title mt-1 text-ink">{recipe.title}</h2>
          <p className="mt-2 text-base leading-normal text-muted">{recipe.summary}</p>
          {missing && missing.length > 0 ? <p className="mt-2 text-sm text-ink">Nog halen: {missing.join(', ')}</p> : null}
          {missingCount === 0 ? <p className="mt-2 text-sm text-ink">Je hoeft de deur niet uit.</p> : null}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={onPrimary}>{primary}</Button>
          <Button variant="secondary" onClick={onSecondary}>
            {secondary}
          </Button>
        </div>
      </div>
    </article>
  )
}

interface SmallProps {
  recipe: Recipe
  missingCount?: number
  onOpen: () => void
}

/** Kleine kaart in een horizontale rij. */
export function SmallCard({ recipe, missingCount, onOpen }: SmallProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="press block w-full cursor-pointer overflow-hidden rounded-lg border border-line bg-elevated text-left"
    >
      <img src={recipe.image} alt="" loading="lazy" className="frame-photo" />
      <span className="block p-3">
        <span className="block text-sm font-medium text-ink">{recipe.title}</span>
        {missingCount !== undefined ? (
          <span className="mt-1 block text-sm text-faint">
            {missingLabel(missingCount)} · {recipe.minutes} min
          </span>
        ) : null}
      </span>
    </button>
  )
}
