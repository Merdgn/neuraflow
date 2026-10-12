import { BrainCircuit } from 'lucide-react'
import type { Project } from '../interfaces/Project'

interface ProjectCardProps {
  project: Project
}

const statusStyles = {
  Planning: 'bg-blue-500/10 text-blue-300',
  'In Progress': 'bg-amber-500/10 text-amber-300',
  Completed: 'bg-emerald-500/10 text-emerald-300',
  'On Hold': 'bg-slate-500/20 text-slate-300',
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-[#151f32] p-6 transition hover:border-indigo-500/40">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
          <BrainCircuit size={23} />
        </div>
        
<span
  className={`rounded-full px-3 py-1 text-xs font-medium ${
    statusStyles[project.status]
  }`}
>
  {project.status}
</span>

      </div>

      <h3 className="text-lg font-semibold text-white">{project.name}</h3>
      <p className="mt-1 text-sm text-indigo-300">{project.category}</p>
      <p className="mt-3 line-clamp-2 text-sm text-slate-400">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300"
          >
            {technology}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-slate-400">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{ width: `${Math.min(100, Math.max(0, project.progress))}%` }}
          />
        </div>
      </div>
    </article>
  )
}
