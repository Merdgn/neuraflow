
export type ProjectStatus =
  | 'Planning'
  | 'In Progress'
  | 'Completed'
  | 'On Hold'

export type ProjectCategory =
  | 'Machine Learning'
  | 'Computer Vision'
  | 'Natural Language Processing'
  | 'Data Science'
  | 'Generative AI'
  | 'Other'

export interface Project {
  id: string
  name: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  technologies: string[]
  progress: number
  createdAt: string
  updatedAt: string
}
