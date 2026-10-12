
import { Trash2, FolderKanban } from 'lucide-react'
import type { Project } from '../interfaces/Project'

interface ProjectsProps {
  projects: Project[]
  onDelete: (id: string) => void
}

export default function Projects({
  projects,
  onDelete,
}: ProjectsProps) {

  const handleDelete = (project: Project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
    )

    if (confirmed) {
      onDelete(project.id)
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-6 md:p-10">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Project Management
        </h2>

        <p className="mt-2 text-slate-400">
          Manage, organize and track your AI projects.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#151f32]">

        {projects.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-12 text-center">
            <FolderKanban size={36} className="text-indigo-400" />
            <p className="text-white">No projects found</p>
            <p className="text-sm text-slate-400">
              Your workspace is currently empty.
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
                      <button
                        onClick={() => handleDelete(project)}
                        aria-label={`Delete ${project.name}`}
                        title={`Delete ${project.name}`}
                        className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
