import { CalendarDays, CookingPot, Refrigerator, ShoppingBasket, type LucideIcon } from 'lucide-react'
import type { View } from '../lib/store'

const ITEMS: { id: View; label: string; icon: LucideIcon }[] = [
  { id: 'vanavond', label: 'Vanavond', icon: CookingPot },
  { id: 'kast', label: 'Kast', icon: Refrigerator },
  { id: 'week', label: 'Week', icon: CalendarDays },
  { id: 'lijst', label: 'Lijst', icon: ShoppingBasket },
]

interface Props {
  view: View
  onNavigate: (view: View) => void
}

/** Zijbalk op desktop. */
export function Sidebar({ view, onNavigate }: Props) {
  return (
    <aside className="sticky top-0 hidden h-screen flex-col border-r border-line bg-elevated px-4 py-8 md:flex">
      <p className="px-3 font-display text-2xl font-medium tracking-tight text-ink">Vanavond</p>
      <p className="px-3 pt-1 text-sm text-faint">De avondvraag</p>
      <nav className="mt-8 flex flex-col gap-1" aria-label="Onderdelen">
        {ITEMS.map(({ id, label, icon: Icon }) => {
          const active = view === id
          return (
            <button
              key={id}
              type="button"
              aria-current={active ? 'page' : undefined}
              onClick={() => onNavigate(id)}
              className={`press flex h-11 cursor-pointer items-center gap-3 rounded-md px-3 text-sm font-medium ${
                active ? 'bg-accent text-accent-fg' : 'text-ink hover:bg-subtle/60'
              }`}
            >
              <Icon aria-hidden />
              {label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

/** Tabbalk onderaan op mobiel. */
export function TabBar({ view, onNavigate }: Props) {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-line bg-elevated md:hidden" aria-label="Onderdelen">
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {ITEMS.map(({ id, label, icon: Icon }) => {
          const active = view === id
          return (
            <li key={id}>
              <button
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => onNavigate(id)}
                className={`flex h-14 w-full cursor-pointer flex-col items-center justify-center gap-1 text-xs font-medium ${
                  active ? 'text-ink' : 'text-faint'
                }`}
              >
                <Icon aria-hidden />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
