
import { useState } from 'react'
import {
  BrainCircuit,
  LayoutDashboard,
  FolderKanban,
  Settings,
  Sparkles,
  Menu,
  X,
} from 'lucide-react'

interface SidebarProps {
  activePage: 'dashboard' | 'projects'
  onNavigate: (page: 'dashboard' | 'projects') => void
}

export default function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = (page: 'dashboard' | 'projects') => {
    onNavigate(page)
    setIsMenuOpen(false)
  }

  return (
    <aside className="w-full shrink-0 border-b border-slate-800 bg-[#0d1424] md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-500/15 p-3 text-indigo-400">
            <BrainCircuit size={26} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Neuraflow
            </h1>
            <p className="text-xs text-slate-400">
              AI Workspace
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMenuOpen}
          aria-controls="sidebar-navigation"
          className="rounded-lg border border-slate-700 p-2 text-slate-300 md:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        id="sidebar-navigation"
        className={`${isMenuOpen ? 'block' : 'hidden'} px-5 pb-6 md:block`}
      >
        <p className="mb-3 text-xs font-semibold tracking-widest text-slate-500">
          WORKSPACE
        </p>

        <nav className="flex flex-col gap-2" aria-label="Main navigation">
          <button
            type="button"
            onClick={() => navigate('dashboard')}
            aria-current={activePage === 'dashboard' ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
              activePage === 'dashboard'
                ? 'bg-indigo-500/15 text-indigo-300'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate('projects')}
            aria-current={activePage === 'projects' ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
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
      </div>
    </aside>
  )
}
