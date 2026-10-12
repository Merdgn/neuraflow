
import { useRef, useState } from 'react'
import { Download, Upload, Trash2, Database } from 'lucide-react'
import type { Project } from '../interfaces/Project'
import {
  downloadProjects,
  readProjectBackup,
} from '../utils/projectBackup'

interface SettingsProps {
  projects: Project[]
  onImport: (projects: Project[]) => void
  onClear: () => void
}

export default function Settings({
  projects,
  onImport,
  onClear,
}: SettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  const handleImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const imported = await readProjectBackup(file)
      const existingIds = new Set(projects.map((p) => p.id))
      const newCount = imported.filter(
        (p) => !existingIds.has(p.id)
      ).length

      onImport(imported)
      setMessage(`${newCount} new project(s) imported successfully.`)
    } catch {
      setMessage('Import failed. Please select a valid JSON backup.')
    } finally {
      event.target.value = ''
    }
  }

  const handleClear = () => {
    if (
      window.confirm(
        'Delete all saved projects? This action cannot be undone.'
      )
    ) {
      onClear()
      setMessage('Workspace projects cleared.')
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <h2 className="text-3xl font-bold text-white">
        Workspace Settings
      </h2>

      <p className="mt-2 text-slate-400">
        Manage your local project data and backups.
      </p>

      <div className="mt-8 space-y-5">
        <section className="rounded-2xl border border-slate-800 bg-[#151f32] p-6">
          <div className="mb-4 flex items-center gap-3">
            <Database className="text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">
              Data Management
            </h3>
          </div>

          <p className="mb-6 text-sm text-slate-400">
            {projects.length} project(s) saved in this browser.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadProjects(projects)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm text-white hover:bg-indigo-500"
            >
              <Download size={17} />
              Export Projects
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:bg-slate-700"
            >
              <Upload size={17} />
              Import Projects
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleImport}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-red-500/20 bg-[#151f32] p-6">
          <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-red-400">
            <Trash2 size={20} />
            Danger Zone
          </h3>

          <p className="mb-5 text-sm text-slate-400">
            Permanently remove all projects stored in this browser.
            Export a backup before clearing your workspace.
          </p>

          <button
            onClick={handleClear}
            disabled={projects.length === 0}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear Workspace
          </button>
        </section>

        {message && (
          <p role="status" className="text-sm text-indigo-300">
            {message}
          </p>
        )}
      </div>
    </main>
  )
}