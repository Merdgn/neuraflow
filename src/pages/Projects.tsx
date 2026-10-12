
import { useState } from 'react'
import DeleteModal from '../components/DeleteModal'

import { Pencil, Plus, Trash2, FolderKanban } from 'lucide-react'
import type { Project } from '../interfaces/Project'

import ProjectFilters from '../components/ProjectFilters'
import type {
  CategoryFilter,
  StatusFilter,
} from '../components/ProjectFilters'



interface ProjectsProps {
  projects: Project[]
  onAdd: () => void
  onEdit: (project: Project) => void
  onDelete: (id: string) => void

  categoryFilter: CategoryFilter
  statusFilter: StatusFilter
  onCategoryChange: (value: CategoryFilter) => void
  onStatusChange: (value: StatusFilter) => void
  onResetFilters: () => void
  totalProjects: number

}


export default function Projects({
  projects,
  onAdd,
  onEdit,
  onDelete,
  categoryFilter,
  statusFilter,
  onCategoryChange,
  onStatusChange,
  onResetFilters, 
  totalProjects,


}: ProjectsProps){
  
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  
const handleDelete = (project: Project) => {
  setProjectToDelete(project)
}

const confirmDelete = () => {
  if (!projectToDelete) return

  onDelete(projectToDelete.id)
  setProjectToDelete(null)
}

const cancelDelete = () => {
  setProjectToDelete(null)
}


  return (
    <main className="mx-auto max-w-7xl p-6 md:p-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Project Management
          </h2>
          <p className="mt-2 text-slate-400">
            Manage, organize and track your AI projects.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-500"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>
      
<ProjectFilters
  category={categoryFilter}
  status={statusFilter}
  resultCount={projects.length}
  onCategoryChange={onCategoryChange}
  onStatusChange={onStatusChange}
  onReset={onResetFilters}
/>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#151f32]">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-12 text-center">
            <FolderKanban
              size={36}
              className="text-indigo-400"
            />
            <p className="text-white">No projects found</p>
            
<p className="text-sm text-slate-400">
  {totalProjects === 0
    ? 'Create your first AI project to get started.'
    : 'No projects match your current search or filters.'}
</p>

          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 text-left">
              <thead className="bg-slate-800/50 text-sm text-slate-400">
                <tr>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="transition hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-5 font-medium text-white">
                      {project.name}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-400">
                      {project.category}
                    </td>

                    <td className="px-6 py-5 text-sm text-indigo-300">
                      {project.status}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-300">
                      {project.progress}%
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEdit(project)}
                          aria-label={`Edit ${project.name}`}
                          title={`Edit ${project.name}`}
                          className="rounded-lg p-2 text-indigo-400 hover:bg-indigo-500/10"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(project)}
                          aria-label={`Delete ${project.name}`}
                          title={`Delete ${project.name}`}
                          className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
{projectToDelete && (
  <DeleteModal
    project={projectToDelete}
    onConfirm={confirmDelete}
    onCancel={cancelDelete}
  />
)}

    </main>
  )
}
