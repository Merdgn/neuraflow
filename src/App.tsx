
import { useState } from 'react'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectForm from './components/ProjectForm'

import { useProjects } from './hooks/useProjects'
import type { ProjectInput } from './hooks/useProjects'
import type { Project } from './interfaces/Project'

import type {
  CategoryFilter,
  StatusFilter,
} from './components/ProjectFilters'

type Page = 'dashboard' | 'projects'

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

  // CRUD + LocalStorage
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
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

  // Reset filters and search
  const resetFilters = () => {
    setSearchQuery('')
    setCategoryFilter('All')
    setStatusFilter('All')
  }

  // Add project
  const handleAddProject = () => {
    setEditingProject(null)
    setIsFormOpen(true)
  }

  // Edit project
  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  // Save project
  const handleSaveProject = (data: ProjectInput) => {
    if (editingProject) {
      updateProject(editingProject.id, data)
    } else {
      addProject(data)
    }

    setIsFormOpen(false)
    setEditingProject(null)
  }

  // Close form
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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {activePage === 'dashboard' ? (
          <Dashboard
            projects={projects}
            filteredProjects={filteredProjects}
            onAddProject={handleAddProject}
          />
        ) : (
          <Projects
            projects={filteredProjects}
            onAdd={handleAddProject}
            onEdit={handleEditProject}
            onDelete={deleteProject}
            categoryFilter={categoryFilter}
            statusFilter={statusFilter}
            onCategoryChange={setCategoryFilter}
            onStatusChange={setStatusFilter}
            onResetFilters={resetFilters}
            totalProjects={projects.length}

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
