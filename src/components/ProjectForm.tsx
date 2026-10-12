
import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type {
  Project,
  ProjectCategory,
  ProjectStatus,
} from '../interfaces/Project'
import type { ProjectInput } from '../hooks/useProjects'

interface ProjectFormProps {
  project?: Project | null
  onSave: (data: ProjectInput) => void
  onCancel: () => void
}

const categories: ProjectCategory[] = [
  'Machine Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Data Science',
  'Generative AI',
  'Other',
]

const statuses: ProjectStatus[] = [
  'Planning',
  'In Progress',
  'Completed',
  'On Hold',
]

export default function ProjectForm({
  project,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [name, setName] = useState(project?.name ?? '')
  const [description, setDescription] = useState(
    project?.description ?? ''
  )
  const [category, setCategory] = useState<ProjectCategory>(
    project?.category ?? 'Machine Learning'
  )
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status ?? 'Planning'
  )
  const [technologies, setTechnologies] = useState(
    project?.technologies.join(', ') ?? ''
  )
  const [progress, setProgress] = useState(
    project?.progress ?? 0
  )
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanName = name.trim()
    const cleanDescription = description.trim()

    if (!cleanName || !cleanDescription) {
      setError('Project name and description are required.')
      return
    }

    if (cleanName.length > 100) {
      setError('Project name cannot exceed 100 characters.')
      return
    }

    const techList = [
      ...new Set(
        technologies
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      ),
    ]

    onSave({
      name: cleanName,
      description: cleanDescription,
      category,
      status,
      technologies: techList,
      progress: status === 'Completed' ? 100 : progress,
    })
  }

  const inputStyle =
    'w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-white outline-none transition focus:border-indigo-500'

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-form-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-[#151f32] p-6 shadow-2xl md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="project-form-title"
              className="text-2xl font-bold text-white"
            >
              {project ? 'Edit Project' : 'Create New Project'}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {project
                ? 'Update your AI project information.'
                : 'Add a new project to your AI workspace.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close form"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="project-name"
              className="mb-2 block text-sm text-slate-300"
            >
              Project Name *
            </label>
            <input
              id="project-name"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              className={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="mb-2 block text-sm text-slate-300"
            >
              Description *
            </label>
            <textarea
              id="project-description"
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your AI project"
              className={inputStyle}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="project-category"
                className="mb-2 block text-sm text-slate-300"
              >
                Category
              </label>
              <select
                id="project-category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as ProjectCategory)
                }
                className={inputStyle}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="project-status"
                className="mb-2 block text-sm text-slate-300"
              >
                Status
              </label>
              <select
                id="project-status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as ProjectStatus)
                }
                className={inputStyle}
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="project-technologies"
              className="mb-2 block text-sm text-slate-300"
            >
              Technologies
            </label>
            <input
              id="project-technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="Python, React, TensorFlow"
              className={inputStyle}
            />
            <p className="mt-2 text-xs text-slate-500">
              Separate technologies with commas.
            </p>
          </div>

          <div>
            <div className="mb-3 flex justify-between text-sm">
              <label
                htmlFor="project-progress"
                className="text-slate-300"
              >
                Progress
              </label>
              <span className="text-indigo-300">
                {status === 'Completed' ? 100 : progress}%
              </span>
            </div>
            <input
              id="project-progress"
              type="range"
              min="0"
              max="100"
              value={status === 'Completed' ? 100 : progress}
              disabled={status === 'Completed'}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-700 pt-5">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-700 px-5 py-3 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-500"
            >
              {project ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
