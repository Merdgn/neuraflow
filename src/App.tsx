
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectForm from './components/ProjectForm'

import { useProjects } from './hooks/useProjects'
import type { ProjectInput } from './hooks/useProjects'
import type { Project } from './interfaces/Project'

type Page = 'dashboard' | 'projects'

export default function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
  } = useProjects()

  const handleAddProject = () => {
    setEditingProject(null)
    setIsFormOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleSaveProject = (data: ProjectInput) => {
    if (editingProject) {
      updateProject(editingProject.id, data)
    } else {
      addProject(data)
    }

    setIsFormOpen(false)
    setEditingProject(null)
  }

  const handleCancel = () => {
    setIsFormOpen(false)
    setEditingProject(null)
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white md:flex">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="min-w-0 flex-1">
        <Header
          title={activePage === 'dashboard' ? 'Dashboard' : 'Projects'}
        />

        {activePage === 'dashboard' ? (
          <Dashboard
            projects={projects}
            onAddProject={handleAddProject}
          />
        ) : (
          <Projects
            projects={projects}
            onAdd={handleAddProject}
            onEdit={handleEditProject}
            onDelete={deleteProject}
          />
        )}
      </div>

      {isFormOpen && (
        <ProjectForm
          key={editingProject?.id ?? 'new-project'}
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
