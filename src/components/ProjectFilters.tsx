
import { SlidersHorizontal, RotateCcw } from 'lucide-react'

import type {
  ProjectCategory,
  ProjectStatus,
} from '../interfaces/Project'

export type CategoryFilter = ProjectCategory | 'All'
export type StatusFilter = ProjectStatus | 'All'

interface ProjectFiltersProps {
  category: CategoryFilter
  status: StatusFilter
  resultCount: number
  onCategoryChange: (value: CategoryFilter) => void
  onStatusChange: (value: StatusFilter) => void
  onReset: () => void
}

const categories: CategoryFilter[] = [
  'All',
  'Machine Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Data Science',
  'Generative AI',
  'Other',
]

const statuses: StatusFilter[] = [
  'All',
  'Planning',
  'In Progress',
  'Completed',
  'On Hold',
]

export default function ProjectFilters({
  category,
  status,
  resultCount,
  onCategoryChange,
  onStatusChange,
  onReset,
}: ProjectFiltersProps) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-800 bg-[#151f32] p-5">
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal size={19} className="text-indigo-400" />
        <h3 className="font-semibold text-white">
          Filter Projects
        </h3>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-48 flex-1">
          <label
            htmlFor="category-filter"
            className="mb-2 block text-sm text-slate-400"
          >
            Category
          </label>

          <select
            id="category-filter"
            value={category}
            onChange={(e) =>
              onCategoryChange(e.target.value as CategoryFilter)
            }
            className="w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === 'All' ? 'All Categories' : item}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-48 flex-1">
          <label
            htmlFor="status-filter"
            className="mb-2 block text-sm text-slate-400"
          >
            Status
          </label>

          <select
            id="status-filter"
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value as StatusFilter)
            }
            className="w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === 'All' ? 'All Statuses' : item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-700"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Showing{' '}
        <span className="font-semibold text-indigo-300">
          {resultCount}
        </span>{' '}
        project(s)
      </p>
    </div>
  )
}
