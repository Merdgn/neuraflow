
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import { mockProjects } from './data/mockProjects'

type Page = 'dashboard' | 'projects'

export default function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard')

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
            projects={mockProjects}
            onAddProject={handleAddProject}
          />
        ) : (
          <div className="p-10">
            <h2 className="text-2xl font-bold">
              Project Management
            </h2>
            <p className="mt-3 text-slate-400">
              CRUD project management is coming next.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
