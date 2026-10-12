
import { useEffect, useState } from 'react'
import type { Project } from '../interfaces/Project'
import { mockProjects } from '../data/mockProjects'

const STORAGE_KEY = 'neuraflow-projects'

export type ProjectInput = Pick<
  Project,
  | 'name'
  | 'description'
  | 'category'
  | 'status'
  | 'technologies'
  | 'progress'
>

function loadProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored !== null) {
      const parsed: unknown = JSON.parse(stored)

      if (Array.isArray(parsed)) {
        return parsed as Project[]
      }
    }
  } catch (error) {
    console.error('Failed to load projects:', error)
  }

  return mockProjects
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(loadProjects)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    } catch (error) {
      console.error('Failed to save projects:', error)
    }
  }, [projects])

  function addProject(data: ProjectInput) {
    const now = new Date().toISOString()

    const project: Project = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }

    setProjects((current) => [project, ...current])
  }

  function updateProject(id: string, data: ProjectInput) {
    setProjects((current) =>
      current.map((project) =>
        project.id === id
          ? {
              ...project,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    )
  }

  function deleteProject(id: string) {
    setProjects((current) =>
      current.filter((project) => project.id !== id)
    )
  }

  
function importProjects(importedProjects: Project[]) {
  setProjects((current) => {
    const existingIds = new Set(
      current.map((project) => project.id)
    )

    const newProjects = importedProjects.filter(
      (project) => !existingIds.has(project.id)
    )

    return [...current, ...newProjects]
  })
}

function clearProjects() {
  setProjects([])
}


  
return {
  projects,
  addProject,
  updateProject,
  deleteProject,
  importProjects,
  clearProjects,
}

}
