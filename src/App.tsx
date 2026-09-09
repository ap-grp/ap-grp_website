import { useCallback, useEffect, useState } from 'react'
import { LangProvider } from './context/lang'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import People from './pages/People'
import PersonDetail from './pages/PersonDetail'
import Services from './pages/Services'
import Media from './pages/Media'
import MediaDetail from './pages/MediaDetail'
import Jobs from './pages/Jobs'
import Contact from './pages/Contact'

export type PageState =
  | { id: 'home' }
  | { id: 'story' }
  | { id: 'projects'; filter?: string }
  | { id: 'project-detail'; slug: string }
  | { id: 'people' }
  | { id: 'person-detail'; slug: string }
  | { id: 'services' }
  | { id: 'media'; category?: string }
  | { id: 'media-detail'; slug: string }
  | { id: 'jobs' }
  | { id: 'contact' }

const HISTORY_STATE_KEY = 'apgrpPage'

const isPageState = (value: unknown): value is PageState => {
  if (!value || typeof value !== 'object' || !('id' in value)) return false

  const candidate = value as Record<string, unknown>
  const simplePages: PageState['id'][] = [
    'home',
    'story',
    'projects',
    'people',
    'services',
    'media',
    'jobs',
    'contact',
  ]

  if (typeof candidate.id !== 'string') return false
  if (simplePages.includes(candidate.id as PageState['id'])) return true

  return (
    ['project-detail', 'person-detail', 'media-detail'].includes(candidate.id) &&
    typeof candidate.slug === 'string'
  )
}

const getHistoryPage = (state: unknown): PageState | null => {
  if (!state || typeof state !== 'object') return null
  const page = (state as Record<string, unknown>)[HISTORY_STATE_KEY]
  return isPageState(page) ? page : null
}

const withHistoryPage = (page: PageState) => {
  const currentState = window.history.state
  const preservedState = currentState && typeof currentState === 'object' ? currentState : {}
  return { ...preservedState, [HISTORY_STATE_KEY]: page }
}

export default function App() {
  const [page, setPage] = useState<PageState>(() => getHistoryPage(window.history.state) ?? { id: 'home' })

  useEffect(() => {
    if (!getHistoryPage(window.history.state)) {
      window.history.replaceState(withHistoryPage({ id: 'home' }), '')
    }

    const handlePopState = (event: PopStateEvent) => {
      setPage(getHistoryPage(event.state) ?? { id: 'home' })
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((newPage: PageState) => {
    window.history.pushState(withHistoryPage(newPage), '')
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const renderPage = () => {
    switch (page.id) {
      case 'home':
        return <Home navigate={navigate} />
      case 'story':
        return <OurStory navigate={navigate} />
      case 'projects':
        return <Projects navigate={navigate} initialFilter={page.filter} />
      case 'project-detail':
        return <ProjectDetail slug={page.slug} navigate={navigate} />
      case 'people':
        return <People navigate={navigate} />
      case 'person-detail':
        return <PersonDetail slug={page.slug} navigate={navigate} />
      case 'services':
        return <Services navigate={navigate} />
      case 'media':
        return <Media navigate={navigate} initialCategory={page.category} />
      case 'media-detail':
        return <MediaDetail slug={page.slug} navigate={navigate} />
      case 'jobs':
        return <Jobs navigate={navigate} />
      case 'contact':
        return <Contact navigate={navigate} />
      default:
        return <Home navigate={navigate} />
    }
  }

  return (
    <LangProvider>
      <div className="min-h-screen bg-white text-[#212529]">
        <Nav currentPage={page.id} navigate={navigate} />
        <main>{renderPage()}</main>
        <Footer navigate={navigate} />
      </div>
    </LangProvider>
  )
}
