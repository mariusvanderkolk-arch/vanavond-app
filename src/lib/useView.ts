import { useCallback, useEffect, useState } from 'react'
import type { View } from './store'

const VIEWS: View[] = ['vanavond', 'kast', 'week', 'lijst']

function readHash(): View {
  const hash = window.location.hash.replace('#', '') as View
  return VIEWS.includes(hash) ? hash : 'vanavond'
}

/** De actieve sectie staat in de URL (#kast, #week, #lijst), zodat de terugknop en links werken. */
export function useView(): [View, (view: View) => void] {
  const [view, setViewState] = useState<View>(readHash)

  useEffect(() => {
    const sync = () => setViewState(readHash())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  const setView = useCallback((next: View) => {
    if (next !== readHash()) {
      const { pathname, search } = window.location
      history.pushState(null, '', next === 'vanavond' ? pathname + search : `#${next}`)
    }
    setViewState(next)
    window.scrollTo({ top: 0 })
  }, [])

  return [view, setView]
}
