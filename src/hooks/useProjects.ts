
import { useEffect, useState } from 'react'
import type { Project } from '../interfaces/Project'
import { mockProjects } from '../data/mockProjects'

const STORAGE_KEY = 'neuraflow-projects'

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

  function deleteProject(id: string) {
    setProjects((current) =>
      current.filter((project) => project.id !== id)
    )
  }

  return {
    projects,
    deleteProject,
  }
}
