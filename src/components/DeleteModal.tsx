
import { useEffect, useRef } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import type { Project } from '../interfaces/Project'

interface DeleteModalProps {
  project: Project
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteModal({
  project,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      role="presentation"
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#151f32] p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
            <AlertTriangle size={26} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <h2
          id="delete-title"
          className="text-xl font-bold text-white"
        >
          Delete Project?
        </h2>

        <p
          id="delete-description"
          className="mt-3 text-sm leading-6 text-slate-400"
        >
          Are you sure you want to delete{' '}
          <strong className="text-white">
            {project.name}
          </strong>
          ? This action cannot be undone.
        </p>

        <div className="mt-7 flex justify-end gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500"
          >
            Delete Project
          </button>
        </div>
      </section>
    </div>
  )
}
