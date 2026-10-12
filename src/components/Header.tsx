
import { useEffect, useRef, useState } from 'react'
import { Bell, Search, UserRound, X } from 'lucide-react'

import NotificationPanel from './NotificationPanel'
import ProfileMenu from './ProfileMenu'

import type { AppNotification } from '../interfaces/Notification'

interface HeaderProps {
  title: string
  searchQuery: string
  onSearchChange: (value: string) => void

  notifications: AppNotification[]
  unreadCount: number
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onClearNotifications: () => void
  onSettingsClick: () => void
}

export default function Header({
  title,
  searchQuery,
  onSearchChange,
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearNotifications,
  onSettingsClick,
}: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<
    'notifications' | 'profile' | null
  >(null)

  const menuContainerRef = useRef<HTMLDivElement>(null)

  const toggleMenu = (menu: 'notifications' | 'profile') => {
    setOpenMenu((current) => current === menu ? null : menu)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-[#101827] px-4 py-5 sm:px-6">
      <div>
        <p className="text-xs text-slate-500">
          WORKSPACE / OVERVIEW
        </p>

        <h2 className="mt-1 text-xl font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {title !== 'Settings' && (
          <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 focus-within:border-indigo-500">
            <Search
              size={18}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              aria-label="Search projects"
              value={searchQuery}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search AI projects..."
              className="w-28 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 sm:w-48 lg:w-60"
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
        )}

        <div
          ref={menuContainerRef}
          className="relative flex items-center gap-2 sm:gap-3"
        >
          <div className="relative">
            <button
              type="button"
              aria-label={`Notifications, ${unreadCount} unread`}
              aria-expanded={openMenu === 'notifications'}
              aria-haspopup="true"
              onClick={() => toggleMenu('notifications')}
              className="relative rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <Bell size={21} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {openMenu === 'notifications' && (
              <NotificationPanel
                notifications={notifications}
                onMarkAsRead={onMarkAsRead}
                onMarkAllAsRead={onMarkAllAsRead}
                onClear={onClearNotifications}
                onClose={() => setOpenMenu(null)}
              />
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Open profile menu"
              aria-expanded={openMenu === 'profile'}
              aria-haspopup="true"
              onClick={() => toggleMenu('profile')}
              className="flex items-center justify-center rounded-full bg-indigo-500/15 p-2 text-indigo-300 transition hover:bg-indigo-500/25"
            >
              <UserRound size={21} />
            </button>

            {openMenu === 'profile' && (
              <ProfileMenu
                onSettingsClick={onSettingsClick}
                onClose={() => setOpenMenu(null)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
