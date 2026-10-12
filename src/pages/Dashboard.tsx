
import { Activity, CheckCircle2, Layers3 } from 'lucide-react'
import type { Project } from '../interfaces/Project'
import ProjectCard from '../components/ProjectCard'
import StatCard from '../components/StatCard'

interface DashboardProps {
  projects: Project[]
  onAddProject: () => void
}

export default function Dashboard({
  projects,
  onAddProject,
}: DashboardProps) {
  const activeCount = projects.filter(
    (project) => project.status === 'In Progress'
  ).length

  const completedCount = projects.filter(
    (project) => project.status === 'Completed'
  ).length

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Dashboard Overview
          </h2>
          <p className="mt-2 text-slate-400">
            Manage your AI projects from one intelligent workspace.
          </p>
        </div>

        <button
          onClick={onAddProject}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500"
        >
          + New Project
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard
          title="Total Projects"
          value={projects.length}
          icon={Layers3}
        />
        <StatCard
          title="In Progress"
          value={activeCount}
          icon={Activity}
        />
        <StatCard
          title="Completed"
          value={completedCount}
          icon={CheckCircle2}
        />
      </div>

      <section className="mt-10">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-white">
            Recent Projects
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Your latest artificial intelligence projects.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="rounded-xl border border-slate-800 p-8 text-slate-400">
            No projects yet. Create your first AI project.
          </p>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
