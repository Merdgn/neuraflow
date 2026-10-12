
import { Bell, Search, UserRound, X } from 'lucide-react'

interface HeaderProps {
  title: string
  searchQuery: string
  onSearchChange: (value: string) => void
}

export default function Header({
  title,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-[#101827] px-6 py-5">
      <div>
        <p className="text-xs text-slate-500">
          WORKSPACE / OVERVIEW
        </p>
        <h2 className="mt-1 text-xl font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 focus-within:border-indigo-500">
          <Search size={18} className="shrink-0 text-slate-400" />
          <input
            type="text"
            aria-label="Search projects"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search AI projects..."
            className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 sm:w-48 lg:w-60"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <Bell size={20} className="hidden text-slate-400 sm:block" />

        <div className="hidden rounded-full bg-indigo-500/15 p-2 text-indigo-300 sm:block">
          <UserRound size={20} />
        </div>
      </div>
    </header>
  )
}
