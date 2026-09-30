import type { ReactNode } from 'react'

interface Props {
  pressed: boolean
  onClick: () => void
  children: ReactNode
  /** 'soft' voor filters, 'outline' voor ingrediënten in de kast. */
  tone?: 'soft' | 'outline'
}

export function Chip({ pressed, onClick, children, tone = 'soft' }: Props) {
  const off = tone === 'soft' ? 'bg-subtle text-ink hover:bg-line/70' : 'border border-line bg-elevated text-ink hover:bg-subtle/60'
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`press h-11 cursor-pointer rounded-full px-4 text-sm font-medium ${pressed ? 'bg-accent text-accent-fg' : off}`}
    >
      {children}
    </button>
  )
}
