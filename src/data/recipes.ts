export type Diet = 'vlees' | 'vegetarisch' | 'vegan'
export type Mood = 'snel' | 'comfort' | 'licht' | 'budget'

export interface RecipeIngredient {
  id: string
  /** Hoeveelheid voor 2 personen. */
  qty: number
  unit: string
  optional?: boolean
}

export interface Recipe {
  id: string
  title: string
  summary: string
  minutes: number
  diet: Diet
  moods: Mood[]
  image: string
  ingredients: RecipeIngredient[]
  steps: string[]
}

const img = (name: string) => `${import.meta.env.BASE_URL}recepten/${name}.jpg`

export const RECIPES: Recipe[] = [
  {
    id: 'pesto-pasta',
    title: 'Pasta pesto met sperziebonen',
    summary: 'Groene pasta voor een doordeweekse avond, met bonen erdoor zodat het een maaltijd is.',
    minutes: 20,
    diet: 'vegetarisch',
    moods: ['snel'],
    image: img('pesto-pasta'),
    ingredients: [
      { id: 'pasta', qty: 200, unit: 'g' },
      { id: 'pesto', qty: 80, unit: 'g' },
      { id: 'sperziebonen', qty: 250, unit: 'g' },
      { id: 'knoflook', qty: 1, unit: 'teen' },
      { id: 'olijfolie', qty: 1, unit: 'el' },
      { id: 'kaas', qty: 30, unit: 'g', optional: true },
    ],
    steps: [
      'Kook de pasta in ruim gezouten water beetgaar. Doe de sperziebonen de laatste 4 minuten erbij.',
      'Giet af en bewaar een scheut kookvocht.',
      'Verwarm de olijfolie met de fijngesneden knoflook een minuut op laag vuur. Haal de pan van het vuur en roer de pesto erdoor.',
      'Schep pasta en bonen erdoor en maak los met kookvocht. Rasp er kaas over als je die hebt.',
    ],
  },
  {
    id: 'shakshuka',
    title: 'Shakshuka',
    summary: 'Eieren in een dikke tomatensaus. Eén pan, en brood om te dopen.',
    minutes: 25,
    diet: 'vegetarisch',
    moods: ['comfort'],
    image: img('shakshuka'),
    ingredients: [
      { id: 'ui', qty: 1, unit: 'stuk' },
      { id: 'knoflook', qty: 2, unit: 'teen' },
      { id: 'paprika', qty: 1, unit: 'stuk' },
      { id: 'tomaat', qty: 3, unit: 'stuk' },
      { id: 'tomatenblokjes', qty: 200, unit: 'g' },
      { id: 'ei', qty: 4, unit: 'stuk' },
      { id: 'olijfolie', qty: 1, unit: 'el' },
      { id: 'brood', qty: 2, unit: 'snee', optional: true },
    ],
    steps: [
      'Snipper ui en paprika. Fruit ze 8 minuten in olijfolie tot ze zacht zijn. Voeg de knoflook toe en bak 1 minuut mee.',
      'Doe tomaat en tomatenblokjes erbij. Prak de verse tomaat grof en laat 8 minuten sudderen tot een dikke saus. Breng op smaak met zout en peper.',
      'Maak kuiltjes en breek de eieren erin. Deksel erop, 4 tot 6 minuten, tot het eiwit gestold is en de dooier nog zacht.',
      'Serveer uit de pan. Brood, als je dat hebt, is om te dopen.',
    ],
  },
  {
    id: 'kip-kerrie',
    title: 'Kipkerrie met rijst',
    summary: 'Milde kokoskerrie. De pan doet het werk terwijl de rijst gaart.',
    minutes: 35,
    diet: 'vlees',
    moods: ['comfort'],
    image: img('kip-kerrie'),
    ingredients: [
      { id: 'kip', qty: 300, unit: 'g' },
      { id: 'rijst', qty: 150, unit: 'g' },
      { id: 'ui', qty: 1, unit: 'stuk' },
      { id: 'knoflook', qty: 1, unit: 'teen' },
      { id: 'wortel', qty: 1, unit: 'stuk' },
      { id: 'kokosmelk', qty: 200, unit: 'ml' },
      { id: 'kerrie', qty: 1, unit: 'el' },
      { id: 'olijfolie', qty: 1, unit: 'el' },
    ],
    steps: [
      'Kook de rijst volgens de verpakking.',
      'Snijd de kip in stukken, de ui en de wortel in blokjes. Bak de kip in olie goudbruin en schep hem eruit.',
      'Fruit ui en wortel 5 minuten in dezelfde pan. Voeg knoflook en kerrie toe en bak 30 seconden tot het geurt.',
      'Doe de kip terug met de kokosmelk. Laat 12 minuten zachtjes pruttelen. Proef op zout en serveer met de rijst.',
    ],
  },
  {
    id: 'zalm-citroen',
    title: 'Zalm met citroen en aardappel',
    summary: 'Zalm uit de pan, aardappelen erbij, citroen erover.',
    minutes: 30,
    diet: 'vlees',
    moods: ['licht'],
    image: img('zalm-citroen'),
    ingredients: [
      { id: 'zalm', qty: 2, unit: 'stuk' },
      { id: 'aardappel', qty: 400, unit: 'g' },
      { id: 'citroen', qty: 1, unit: 'stuk' },
      { id: 'boter', qty: 15, unit: 'g' },
      { id: 'broccoli', qty: 200, unit: 'g', optional: true },
    ],
    steps: [
      'Snijd de aardappelen in gelijke stukken en kook ze in 15 minuten gaar.',
      'Bestrooi de zalm met zout en peper. Bak hem in boter, 3 tot 4 minuten per kant, tot hij net gaar is.',
      'Knijp er citroen over. Broccoli, als je die hebt, kook je in dezelfde tijd mee.',
      'Serveer zalm en aardappel samen, met de rest van de citroen ernaast.',
    ],
  },
  {
    id: 'linzensoep',
    title: 'Linzensoep',
    summary: 'Dikke soep die bijna niets kost en een avond vult.',
    minutes: 40,
    diet: 'vegan',
    moods: ['budget', 'comfort'],
    image: img('linzensoep'),
    ingredients: [
      { id: 'linzen', qty: 180, unit: 'g' },
      { id: 'ui', qty: 1, unit: 'stuk' },
      { id: 'wortel', qty: 2, unit: 'stuk' },
      { id: 'knoflook', qty: 1, unit: 'teen' },
      { id: 'tomatenblokjes', qty: 200, unit: 'g' },
      { id: 'bouillon', qty: 800, unit: 'ml' },
      { id: 'olijfolie', qty: 1, unit: 'el' },
      { id: 'brood', qty: 2, unit: 'snee', optional: true },
    ],
    steps: [
      'Spoel de linzen. Snipper ui, wortel en knoflook.',
      'Fruit ui en wortel 5 minuten in olie. Voeg knoflook toe en bak 1 minuut.',
      'Doe linzen, tomatenblokjes en bouillon erbij. Laat 25 minuten zachtjes koken tot de linzen zacht zijn.',
      'Prak een derde van de soep voor meer body. Proef op zout. Brood erbij als je dat hebt.',
    ],
  },
  {
    id: 'spinazie-omelet',
    title: 'Spinazie-omelet met kaas',
    summary: 'Klaar voor de pan heet is. Spinazie en kaas, meer niet.',
    minutes: 15,
    diet: 'vegetarisch',
    moods: ['snel', 'licht'],
    image: img('spinazie-omelet'),
    ingredients: [
      { id: 'ei', qty: 4, unit: 'stuk' },
      { id: 'spinazie', qty: 120, unit: 'g' },
      { id: 'kaas', qty: 40, unit: 'g' },
      { id: 'boter', qty: 10, unit: 'g' },
    ],
    steps: [
      'Kluts de eieren met een snuf zout.',
      'Laat de spinazie in een droge pan slinken. Knijp het vocht eruit.',
      'Smelt de boter, giet het ei erin en strooi spinazie en kaas erover. Deksel erop, 3 minuten op middelhoog vuur.',
      'Vouw de omelet dubbel. De binnenkant mag nog net zacht zijn.',
    ],
  },
  {
    id: 'nasi',
    title: 'Nasi met ei',
    summary: 'Rijst die over is, of rijst die je net kookt, omgebakken met ei.',
    minutes: 25,
    diet: 'vegetarisch',
    moods: ['snel'],
    image: img('nasi'),
    ingredients: [
      { id: 'rijst', qty: 150, unit: 'g' },
      { id: 'ei', qty: 2, unit: 'stuk' },
      { id: 'ui', qty: 1, unit: 'stuk' },
      { id: 'wortel', qty: 1, unit: 'stuk' },
      { id: 'sojasaus', qty: 2, unit: 'el' },
      { id: 'olijfolie', qty: 1, unit: 'el' },
      { id: 'kip', qty: 150, unit: 'g', optional: true },
    ],
    steps: [
      'Kook de rijst en laat hem uitstomen. Koude rijst bakt mooier, warme rijst kan ook.',
      'Bak het ei als een platte omelet en snijd het in repen. Fruit de ui en de geraspte wortel 4 minuten.',
      'Doe de rijst erbij met de sojasaus en bak 3 minuten op hoog vuur.',
      'Schep het ei erdoor. Kip, als je die hebt, bak je eerst in stukjes en meng je op het eind.',
    ],
  },
  {
    id: 'stamppot',
    title: 'Stamppot boerenkool',
    summary: 'Aardappel, boerenkool en spek. De Hollandse zekerheid.',
    minutes: 35,
    diet: 'vlees',
    moods: ['comfort', 'budget'],
    image: img('stamppot'),
    ingredients: [
      { id: 'aardappel', qty: 600, unit: 'g' },
      { id: 'boerenkool', qty: 300, unit: 'g' },
      { id: 'spek', qty: 100, unit: 'g' },
      { id: 'melk', qty: 60, unit: 'ml' },
      { id: 'boter', qty: 20, unit: 'g' },
    ],
    steps: [
      'Schil de aardappelen, snijd ze in stukken en kook ze in 18 minuten gaar. De boerenkool mag de laatste 8 minuten mee.',
      'Bak het spek knapperig in een droge pan.',
      'Giet aardappelen en kool af. Stamp ze met melk en boter tot een grove puree. Zout en peper.',
      'Schep het spek erover, met een lepel van het bakvet.',
    ],
  },
  {
    id: 'kikkererwtenwrap',
    title: 'Kikkererwtenwrap',
    summary: 'Kikkererwten, groente en een tortilla. Koud, of even aangebakken.',
    minutes: 20,
    diet: 'vegan',
    moods: ['snel', 'licht', 'budget'],
    image: img('kikkererwtenwrap'),
    ingredients: [
      { id: 'tortilla', qty: 2, unit: 'stuk' },
      { id: 'kikkererwten', qty: 240, unit: 'g' },
      { id: 'komkommer', qty: 0.5, unit: 'stuk' },
      { id: 'paprika', qty: 1, unit: 'stuk' },
      { id: 'knoflook', qty: 1, unit: 'teen' },
      { id: 'olijfolie', qty: 1, unit: 'el' },
      { id: 'yoghurt', qty: 3, unit: 'el', optional: true },
    ],
    steps: [
      'Giet de kikkererwten af en prak ze grof met knoflook, olijfolie en een snuf zout.',
      'Snijd komkommer en paprika in repen.',
      'Besmeer de tortilla met yoghurt als je die hebt, en beleg met kikkererwten en groente.',
      'Vouw dicht. Eet ze koud, of bak 2 minuten per kant.',
    ],
  },
  {
    id: 'risotto',
    title: 'Risotto met champignons',
    summary: 'Champignons, bouillon en een beetje geduld. Romig zonder pakjes.',
    minutes: 40,
    diet: 'vegetarisch',
    moods: ['comfort'],
    image: img('risotto'),
    ingredients: [
      { id: 'rijst', qty: 160, unit: 'g' },
      { id: 'champignon', qty: 250, unit: 'g' },
      { id: 'ui', qty: 1, unit: 'stuk' },
      { id: 'knoflook', qty: 1, unit: 'teen' },
      { id: 'bouillon', qty: 700, unit: 'ml' },
      { id: 'boter', qty: 20, unit: 'g' },
      { id: 'kaas', qty: 40, unit: 'g' },
    ],
    steps: [
      'Snijd de champignons en bak ze in de helft van de boter goudbruin. Schep ze eruit.',
      'Fruit de ui 4 minuten in de rest van de boter. Voeg knoflook en rijst toe en roer 1 minuut.',
      'Giet de warme bouillon er scheut voor scheut bij en blijf roeren. Reken 18 minuten tot de rijst gaar is en nog wat vocht heeft.',
      'Roer kaas en champignons erdoor. Proef op zout.',
    ],
  },
  {
    id: 'groentestoof',
    title: 'Groentestoof met rijst',
    summary: 'Courgette en paprika in tomaat, over rijst. Licht en goedkoop.',
    minutes: 25,
    diet: 'vegan',
    moods: ['licht', 'budget'],
    image: img('groentestoof'),
    ingredients: [
      { id: 'rijst', qty: 150, unit: 'g' },
      { id: 'courgette', qty: 1, unit: 'stuk' },
      { id: 'paprika', qty: 1, unit: 'stuk' },
      { id: 'ui', qty: 1, unit: 'stuk' },
      { id: 'knoflook', qty: 1, unit: 'teen' },
      { id: 'tomatenblokjes', qty: 200, unit: 'g' },
      { id: 'olijfolie', qty: 1, unit: 'el' },
    ],
    steps: [
      'Kook de rijst.',
      'Snijd courgette, paprika en ui in blokjes. Fruit de ui 4 minuten in olie.',
      'Voeg paprika, courgette en knoflook toe. Bak 5 minuten. Doe de tomatenblokjes erbij en laat 10 minuten sudderen.',
      'Breng op smaak met zout en peper. Serveer over de rijst.',
    ],
  },
]

/** Recepten die we laten zien zolang de kast nog leeg is. */
export const SHOWCASE_IDS = ['risotto', 'spinazie-omelet', 'shakshuka']

const byId = new Map(RECIPES.map((recipe) => [recipe.id, recipe]))

export function getRecipe(id: string | null | undefined): Recipe | undefined {
  return id ? byId.get(id) : undefined
}
