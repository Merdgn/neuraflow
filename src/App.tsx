
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import { useProjects } from './hooks/useProjects'

type Page = 'dashboard' | 'projects'

export default function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard')

  const { projects, deleteProject } = useProjects()

  const handleAddProject = () => {
    setActivePage('projects')
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white md:flex">

      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="min-w-0 flex-1">

        <Header
          title={
            activePage === 'dashboard'
              ? 'Dashboard'
              : 'Projects'
          }
        />

        {activePage === 'dashboard' ? (
          <Dashboard
            projects={projects}
            onAddProject={handleAddProject}
          />
        ) : (
          <Projects
            projects={projects}
            onDelete={deleteProject}
          />
        )}
      </div>
    </div>
  )
}
