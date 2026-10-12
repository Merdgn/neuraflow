import { BrainCircuit, LayoutDashboard, FolderKanban, Settings, Sparkles } from 'lucide-react'

interface SidebarProps {
  activePage: 'dashboard' | 'projects'
  onNavigate: (page: 'dashboard' | 'projects') => void
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-full border-b border-slate-800 bg-[#0d1424] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-500/15 p-3 text-indigo-400">
          <BrainCircuit size={26} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Neuraflow</h1>
          <p className="text-xs text-slate-400">AI Workspace</p>
        </div>
      </div>

      <p className="mb-3 text-xs font-semibold tracking-widest text-slate-500">
        WORKSPACE
      </p>

      <nav className="flex flex-wrap gap-2 md:flex-col">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
            activePage === 'dashboard'
              ? 'bg-indigo-500/15 text-indigo-300'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          onClick={() => onNavigate('projects')}
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
            activePage === 'projects'
              ? 'bg-indigo-500/15 text-indigo-300'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <FolderKanban size={18} />
          Projects
        </button>
      </nav>

      <div className="mt-8 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4">
        <Sparkles className="mb-2 text-indigo-400" size={22} />
        <p className="font-semibold text-white">AI Workspace</p>
        <p className="mt-1 text-xs text-slate-400">
          Build, organize and track your AI innovations.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
        <Settings size={18} />
        <span>Settings (Coming soon)</span>
      </div>
    </aside>
  )
}
