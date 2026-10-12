
import { useState } from 'react'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectForm from './components/ProjectForm'
import Settings from './pages/Settings'

import { useProjects } from './hooks/useProjects'
import { useNotifications } from './hooks/useNotifications'

import type { ProjectInput } from './hooks/useProjects'
import type { Project } from './interfaces/Project'

import type {
  CategoryFilter,
  StatusFilter,
} from './components/ProjectFilters'

type Page = 'dashboard' | 'projects' | 'settings'

export default function App() {
  // Navigation
  const [activePage, setActivePage] = useState<Page>('dashboard')

  // Project form
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Search
  const [searchQuery, setSearchQuery] = useState('')

  // Filters
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>('All')

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('All')

  // Project management
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    importProjects,
    clearProjects,
  } = useProjects()

  // Notification management
  const {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotifications()

  // Search and filtering
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

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('')
    setCategoryFilter('All')
    setStatusFilter('All')
  }

  // Open new project form
  const handleAddProject = () => {
    setEditingProject(null)
    setIsFormOpen(true)
  }

  // Open edit form
  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  // Create or update a project
  const handleSaveProject = (data: ProjectInput) => {
    if (editingProject) {
      updateProject(editingProject.id, data)

      addNotification(
        'Project updated',
        `"${data.name}" was updated successfully.`,
        'info'
      )
    } else {
      addProject(data)

      addNotification(
        'Project created',
        `"${data.name}" was added to your workspace.`,
        'success'
      )
    }

    setIsFormOpen(false)
    setEditingProject(null)
  }

  // Delete a project after confirmation
  const handleDeleteProject = (id: string) => {
    const projectToDelete = projects.find(
      (project) => project.id === id
    )

    if (!projectToDelete) return

    deleteProject(id)

    addNotification(
      'Project deleted',
      `"${projectToDelete.name}" was removed from your workspace.`,
      'warning'
    )
  }

  // Import projects from JSON
  const handleImportProjects = (imported: Project[]) => {
    const existingIds = new Set(
      projects.map((project) => project.id)
    )

    const uniqueImportedIds = new Set<string>()
    let newCount = 0

    for (const project of imported) {
      if (
        !existingIds.has(project.id) &&
        !uniqueImportedIds.has(project.id)
      ) {
        uniqueImportedIds.add(project.id)
        newCount++
      }
    }

    importProjects(imported)

    addNotification(
      'Projects imported',
      `${newCount} new project(s) imported into your workspace.`,
      'success'
    )
  }

  // Clear workspace after confirmation in Settings
  const handleClearWorkspace = () => {
    const deletedCount = projects.length

    if (deletedCount === 0) return

    clearProjects()

    addNotification(
      'Workspace cleared',
      `${deletedCount} project(s) were removed from your workspace.`,
      'warning'
    )
  }

  // Close project form
  const handleCancel = () => {
    setIsFormOpen(false)
    setEditingProject(null)
  }

  // Header title
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
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClearNotifications={clearNotifications}
          onSettingsClick={() => setActivePage('settings')}
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
            onDelete={handleDeleteProject}
            categoryFilter={categoryFilter}
            statusFilter={statusFilter}
            onCategoryChange={setCategoryFilter}
            onStatusChange={setStatusFilter}
            onResetFilters={resetFilters}
          />
        ) : (
          <Settings
            projects={projects}
            onImport={handleImportProjects}
            onClear={handleClearWorkspace}
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
