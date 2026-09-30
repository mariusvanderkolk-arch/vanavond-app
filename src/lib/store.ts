import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { today, type DayKey } from './dates'
import type { DietFilter, MoodFilter } from './matching'

export type View = 'vanavond' | 'kast' | 'week' | 'lijst'

interface State {
  pantry: string[]
  people: number
  minutes: number
  diet: DietFilter
  mood: MoodFilter
  favorites: string[]
  /** Per dag het vastgezette recept. */
  plan: Record<DayKey, string>
  /** Afgevinkte regels op de boodschappenlijst. */
  checked: Record<string, boolean>
  tonightId: string | null
  /** Welk recept nu open staat (niet bewaard). */
  openId: string | null
}

interface Actions {
  togglePantry: (id: string) => void
  addToPantry: (ids: string[]) => void
  clearPantry: () => void
  setPeople: (n: number) => void
  setMinutes: (n: number) => void
  setDiet: (diet: DietFilter) => void
  setMood: (mood: MoodFilter) => void
  toggleFavorite: (id: string) => void
  setPlan: (plan: Record<DayKey, string>) => void
  assignDay: (day: DayKey, recipeId: string) => void
  clearDay: (day: DayKey) => void
  toggleChecked: (key: string) => void
  lockTonight: (recipeId: string) => void
  unlockTonight: () => void
  openRecipe: (id: string | null) => void
}

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id]

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      pantry: [],
      people: 2,
      minutes: 30,
      diet: 'alles',
      mood: 'alles',
      favorites: [],
      plan: {},
      checked: {},
      tonightId: null,
      openId: null,

      togglePantry: (id) => set((s) => ({ pantry: toggle(s.pantry, id) })),
      addToPantry: (ids) => set((s) => ({ pantry: [...new Set([...s.pantry, ...ids])] })),
      clearPantry: () => set({ pantry: [] }),
      setPeople: (n) => set({ people: Math.min(8, Math.max(1, n)) }),
      setMinutes: (minutes) => set({ minutes }),
      setDiet: (diet) => set({ diet }),
      setMood: (mood) => set({ mood }),
      toggleFavorite: (id) => set((s) => ({ favorites: toggle(s.favorites, id) })),
      setPlan: (plan) => set({ plan }),
      assignDay: (day, recipeId) =>
        set((s) => ({
          plan: { ...s.plan, [day]: recipeId },
          tonightId: day === today() ? recipeId : s.tonightId,
        })),
      clearDay: (day) =>
        set((s) => {
          const plan = { ...s.plan }
          const removed = plan[day]
          delete plan[day]
          return {
            plan,
            tonightId: day === today() && s.tonightId === removed ? null : s.tonightId,
          }
        }),
      toggleChecked: (key) => set((s) => ({ checked: { ...s.checked, [key]: !s.checked[key] } })),
      lockTonight: (recipeId) => set((s) => ({ tonightId: recipeId, plan: { ...s.plan, [today()]: recipeId } })),
      unlockTonight: () =>
        set((s) => {
          const plan = { ...s.plan }
          delete plan[today()]
          return { tonightId: null, plan }
        }),
      openRecipe: (openId) => set({ openId }),
    }),
    {
      name: 'vanavond',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        pantry: s.pantry,
        people: s.people,
        minutes: s.minutes,
        diet: s.diet,
        mood: s.mood,
        favorites: s.favorites,
        plan: s.plan,
        checked: s.checked,
        tonightId: s.tonightId,
      }),
    },
  ),
)

// Een recept dat gisteren is vastgezet, is vandaag niet meer 'vanavond'.
{
  const { tonightId, plan } = useStore.getState()
  const planned = plan[today()] ?? null
  if (tonightId !== planned) useStore.setState({ tonightId: planned })
}
