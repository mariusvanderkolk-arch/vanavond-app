import { getIngredient, GROUPS, type IngredientGroup } from '../data/ingredients'
import { getRecipe, RECIPES, type Diet, type Recipe, type RecipeIngredient } from '../data/recipes'
import type { DayKey } from './dates'
import { formatAmount } from './format'

export type DietFilter = 'alles' | 'vegetarisch' | 'vegan'
export type MoodFilter = 'alles' | 'snel' | 'comfort' | 'licht' | 'budget'

export const DIET_LABELS: Record<DietFilter, string> = {
  alles: 'Alles',
  vegetarisch: 'Vegetarisch',
  vegan: 'Vegan',
}

export const MOOD_LABELS: Record<MoodFilter, string> = {
  alles: 'Alles',
  snel: 'Snel',
  comfort: 'Comfort',
  licht: 'Licht',
  budget: 'Budget',
}

export function fitsDiet(diet: Diet, filter: DietFilter): boolean {
  if (filter === 'alles') return true
  if (filter === 'vegetarisch') return diet !== 'vlees'
  return diet === 'vegan'
}

export interface PantryCheck {
  required: number
  have: number
  missing: RecipeIngredient[]
  optionalMissing: RecipeIngredient[]
}

export function checkPantry(recipe: Recipe, pantry: string[]): PantryCheck {
  const inHouse = new Set(pantry)
  const required = recipe.ingredients.filter((i) => !i.optional)
  const missing = required.filter((i) => !inHouse.has(i.id))
  const optionalMissing = recipe.ingredients.filter((i) => i.optional && !inHouse.has(i.id))
  return { required: required.length, have: required.length - missing.length, missing, optionalMissing }
}

export interface Suggestion extends PantryCheck {
  recipe: Recipe
  score: number
}

interface SuggestOptions {
  pantry: string[]
  minutes: number
  diet: DietFilter
  mood: MoodFilter
}

/**
 * Rangschikt recepten op hoe goed ze bij de kast passen.
 * Recepten die te lang duren of niet in het dieet passen vallen af.
 */
export function suggest({ pantry, minutes, diet, mood }: SuggestOptions): Suggestion[] {
  const list: Suggestion[] = []
  for (const recipe of RECIPES) {
    if (recipe.minutes > minutes || !fitsDiet(recipe.diet, diet)) continue
    const check = checkPantry(recipe, pantry)
    let score = (check.required === 0 ? 1 : check.have / check.required) - check.missing.length * 0.01
    if (mood !== 'alles' && recipe.moods.includes(mood)) score += 0.15
    if (mood === 'snel') score += Math.max(0, (25 - recipe.minutes) / 100)
    list.push({ recipe, score, ...check })
  }
  return list.sort(
    (a, b) =>
      b.score - a.score ||
      a.recipe.minutes - b.recipe.minutes ||
      a.recipe.title.localeCompare(b.recipe.title, 'nl'),
  )
}

export interface ShoppingLine {
  key: string
  id: string
  label: string
  group: IngredientGroup
  amount: string
  meals: string[]
  optional: boolean
}

/** Alles wat nog gehaald moet worden voor de vastgezette avonden. */
export function shoppingList(
  plan: Record<DayKey, string>,
  pantry: string[],
  people: number,
  days: DayKey[],
): ShoppingLine[] {
  const inHouse = new Set(pantry)
  const totals = new Map<string, { id: string; qty: number; unit: string; meals: string[]; optional: boolean }>()

  for (const day of days) {
    const recipe = getRecipe(plan[day])
    if (!recipe) continue
    for (const item of recipe.ingredients) {
      if (inHouse.has(item.id)) continue
      const optional = Boolean(item.optional)
      const key = `${optional ? 'opt' : 'req'}:${item.id}`
      const qty = item.qty * (people / 2)
      const line = totals.get(key)
      if (line) {
        line.qty += qty
        if (!line.meals.includes(recipe.title)) line.meals.push(recipe.title)
      } else {
        totals.set(key, { id: item.id, qty, unit: item.unit, meals: [recipe.title], optional })
      }
    }
  }

  const lines: ShoppingLine[] = [...totals].map(([key, line]) => {
    const ingredient = getIngredient(line.id)
    return {
      key,
      id: line.id,
      label: ingredient?.label ?? line.id,
      group: ingredient?.group ?? 'Voorraad',
      amount: formatAmount(line.qty, line.unit),
      meals: line.meals,
      optional: line.optional,
    }
  })

  return lines.sort(
    (a, b) => GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) || a.label.localeCompare(b.label, 'nl'),
  )
}
