export type IngredientGroup = 'Groente' | 'Zuivel' | 'Eiwit' | 'Voorraad'

export interface Ingredient {
  id: string
  label: string
  group: IngredientGroup
}

/** Volgorde waarin groepen in de kast en op de lijst verschijnen. */
export const GROUPS: IngredientGroup[] = ['Groente', 'Zuivel', 'Eiwit', 'Voorraad']

export const GROUP_LABELS: Record<IngredientGroup, string> = {
  Groente: 'Groente',
  Zuivel: 'Zuivel & eieren',
  Eiwit: 'Eiwit',
  Voorraad: 'Voorraad',
}

export const INGREDIENTS: Ingredient[] = [
  { id: 'ui', label: 'Ui', group: 'Groente' },
  { id: 'knoflook', label: 'Knoflook', group: 'Groente' },
  { id: 'tomaat', label: 'Tomaat', group: 'Groente' },
  { id: 'paprika', label: 'Paprika', group: 'Groente' },
  { id: 'spinazie', label: 'Spinazie', group: 'Groente' },
  { id: 'wortel', label: 'Wortel', group: 'Groente' },
  { id: 'aardappel', label: 'Aardappel', group: 'Groente' },
  { id: 'courgette', label: 'Courgette', group: 'Groente' },
  { id: 'broccoli', label: 'Broccoli', group: 'Groente' },
  { id: 'champignon', label: 'Champignon', group: 'Groente' },
  { id: 'komkommer', label: 'Komkommer', group: 'Groente' },
  { id: 'sperziebonen', label: 'Sperziebonen', group: 'Groente' },
  { id: 'boerenkool', label: 'Boerenkool', group: 'Groente' },
  { id: 'citroen', label: 'Citroen', group: 'Groente' },
  { id: 'ei', label: 'Eieren', group: 'Zuivel' },
  { id: 'melk', label: 'Melk', group: 'Zuivel' },
  { id: 'boter', label: 'Boter', group: 'Zuivel' },
  { id: 'kaas', label: 'Kaas', group: 'Zuivel' },
  { id: 'yoghurt', label: 'Yoghurt', group: 'Zuivel' },
  { id: 'kip', label: 'Kip', group: 'Eiwit' },
  { id: 'spek', label: 'Spek', group: 'Eiwit' },
  { id: 'zalm', label: 'Zalm', group: 'Eiwit' },
  { id: 'pasta', label: 'Pasta', group: 'Voorraad' },
  { id: 'rijst', label: 'Rijst', group: 'Voorraad' },
  { id: 'brood', label: 'Brood', group: 'Voorraad' },
  { id: 'tortilla', label: "Tortilla's", group: 'Voorraad' },
  { id: 'linzen', label: 'Linzen', group: 'Voorraad' },
  { id: 'kikkererwten', label: 'Kikkererwten', group: 'Voorraad' },
  { id: 'tomatenblokjes', label: 'Tomatenblokjes', group: 'Voorraad' },
  { id: 'kokosmelk', label: 'Kokosmelk', group: 'Voorraad' },
  { id: 'pesto', label: 'Pesto', group: 'Voorraad' },
  { id: 'olijfolie', label: 'Olijfolie', group: 'Voorraad' },
  { id: 'sojasaus', label: 'Sojasaus', group: 'Voorraad' },
  { id: 'bouillon', label: 'Bouillon', group: 'Voorraad' },
  { id: 'kerrie', label: 'Kerriepoeder', group: 'Voorraad' },
]

/** Wat de meeste huishoudens standaard in huis hebben. */
export const BASIC_PANTRY = [
  'ui',
  'knoflook',
  'ei',
  'boter',
  'olijfolie',
  'pasta',
  'rijst',
  'tomatenblokjes',
  'bouillon',
  'aardappel',
  'kaas',
  'brood',
]

/** Een gevulde groentelade. */
export const VEGETABLE_DRAWER = [
  'spinazie',
  'paprika',
  'tomaat',
  'wortel',
  'courgette',
  'broccoli',
  'champignon',
  'citroen',
  'sperziebonen',
  'komkommer',
  'boerenkool',
]

const byId = new Map(INGREDIENTS.map((item) => [item.id, item]))

export function getIngredient(id: string): Ingredient | undefined {
  return byId.get(id)
}

export function ingredientLabel(id: string): string {
  return byId.get(id)?.label ?? id
}
