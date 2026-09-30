import { RecipeSheet } from './components/RecipeSheet'
import { Sidebar, TabBar } from './components/Navigation'
import { useView } from './lib/useView'
import { Pantry } from './views/Pantry'
import { ShoppingList } from './views/ShoppingList'
import { Tonight } from './views/Tonight'
import { Week } from './views/Week'

export default function App() {
  const [view, setView] = useView()

  return (
    <div className="min-h-screen bg-bg text-ink md:grid md:grid-cols-[240px_minmax(0,1fr)]">
      <Sidebar view={view} onNavigate={setView} />
      <main className="min-w-0 px-5 pt-6 pb-28 md:px-10 md:py-10">
        <div className="mx-auto w-full min-w-0 max-w-3xl">
          {view === 'vanavond' ? <Tonight onNavigate={setView} /> : null}
          {view === 'kast' ? <Pantry /> : null}
          {view === 'week' ? <Week /> : null}
          {view === 'lijst' ? <ShoppingList onNavigate={setView} /> : null}
        </div>
      </main>
      <TabBar view={view} onNavigate={setView} />
      <RecipeSheet />
    </div>
  )
}
