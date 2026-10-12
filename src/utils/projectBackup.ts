
import type { Project } from '../interfaces/Project'

const categories = [
  'Machine Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Data Science',
  'Generative AI',
  'Other',
]

const statuses = [
  'Planning',
  'In Progress',
  'Completed',
  'On Hold',
]

export function isValidProject(value: unknown): value is Project {
  if (typeof value !== 'object' || value === null) return false

  const p = value as Record<string, unknown>

  return (
    typeof p.id === 'string' &&
    p.id.length > 0 &&
    typeof p.name === 'string' &&
    p.name.trim().length > 0 &&
    typeof p.description === 'string' &&
    typeof p.category === 'string' &&
    categories.includes(p.category) &&
    typeof p.status === 'string' &&
    statuses.includes(p.status) &&
    Array.isArray(p.technologies) &&
    p.technologies.every((t) => typeof t === 'string') &&
    typeof p.progress === 'number' &&
    Number.isInteger(p.progress) &&
    p.progress >= 0 &&
    p.progress <= 100 &&
    typeof p.createdAt === 'string' &&
    typeof p.updatedAt === 'string'
  )
}

export function downloadProjects(projects: Project[]) {
  const json = JSON.stringify(projects, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'neuraflow-projects.json'
  document.body.appendChild(link)
  link.click()
  link.remove()

  URL.revokeObjectURL(url)
}

export async function readProjectBackup(file: File): Promise<Project[]> {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Backup file must be smaller than 5 MB.')
  }

  const text = await file.text()
  const data: unknown = JSON.parse(text)

  if (!Array.isArray(data) || !data.every(isValidProject)) {
    throw new Error('Invalid Neuraflow project backup.')
  }

  return data
}
