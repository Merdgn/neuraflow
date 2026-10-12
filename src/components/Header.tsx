import { Bell, Search, UserRound } from 'lucide-react'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-[#101827] px-6 py-5">
      <div>
        <p className="text-xs text-slate-500">WORKSPACE / OVERVIEW</p>
        <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-400 lg:flex">
          <Search size={16} />
          Project search coming soon
        </div>
        <Bell size={20} className="text-slate-400" />
        <div className="rounded-full bg-indigo-500/15 p-2 text-indigo-300">
          <UserRound size={20} />
        </div>
      </div>
    </header>
  )
}
