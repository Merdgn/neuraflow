
import { useState } from 'react'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectForm from './components/ProjectForm'
import Settings from './pages/Settings'

import { useProjects } from './hooks/useProjects'
import type { ProjectInput } from './hooks/useProjects'
import type { Project } from './interfaces/Project'

import type {
  CategoryFilter,
  StatusFilter,
} from './components/ProjectFilters'

type Page = 'dashboard' | 'projects' | 'settings'

export default function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Search
  const [searchQuery, setSearchQuery] = useState('')

  // Filters
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>('All')

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('All')

  // CRUD and LocalStorage
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    importProjects,
    clearProjects,
  } = useProjects()

  // Search and filter results
  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.trim().toLocaleLowerCase('tr-TR')

    const searchableText = [
      project.name,
      project.description,
      project.category,
      project.status,
      ...project.technologies,
    ]
      .join(' ')
      .toLocaleLowerCase('tr-TR')

    const matchesSearch =
      query === '' || searchableText.includes(query)

    const matchesCategory =
      categoryFilter === 'All' ||
      project.category === categoryFilter

    const matchesStatus =
      statusFilter === 'All' ||
      project.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const resetFilters = () => {
    setSearchQuery('')
    setCategoryFilter('All')
    setStatusFilter('All')
  }

  // Create
  const handleAddProject = () => {
    setEditingProject(null)
    setIsFormOpen(true)
  }

  // Update
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

  const pageTitle =
    activePage === 'dashboard'
      ? 'Dashboard'
      : activePage === 'projects'
        ? 'Projects'
        : 'Settings'

  return (
    <div className="min-h-screen bg-[#0b1120] text-white md:flex">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="min-w-0 flex-1">
        <Header
          title={pageTitle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {activePage === 'dashboard' ? (
          <Dashboard
            projects={projects}
            filteredProjects={filteredProjects}
            onAddProject={handleAddProject}
          />
        ) : activePage === 'projects' ? (
          <Projects
            projects={filteredProjects}
            totalProjects={projects.length}
            onAdd={handleAddProject}
            onEdit={handleEditProject}
            onDelete={deleteProject}
            categoryFilter={categoryFilter}
            statusFilter={statusFilter}
            onCategoryChange={setCategoryFilter}
            onStatusChange={setStatusFilter}
            onResetFilters={resetFilters}
          />
        ) : (
          <Settings
            projects={projects}
            onImport={importProjects}
            onClear={clearProjects}
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
