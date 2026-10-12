
import {
  Bell,
  CheckCheck,
  CircleCheck,
  Info,
  Trash2,
  AlertTriangle,
} from 'lucide-react'

import type { AppNotification } from '../interfaces/Notification'

interface NotificationPanelProps {
  notifications: AppNotification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onClear: () => void
  onClose: () => void
}

export default function NotificationPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
  onClose,
}: NotificationPanelProps) {
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length

  const notificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'success':
        return <CircleCheck size={19} className="text-emerald-400" />
      case 'warning':
        return <AlertTriangle size={19} className="text-amber-400" />
      default:
        return <Info size={19} className="text-indigo-400" />
    }
  }

  return (
    <section
      aria-label="Notifications"
      className="absolute right-0 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-700 bg-[#151f32] shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-slate-700 p-4">
        <div className="flex items-center gap-2">
          <Bell size={19} className="text-indigo-400" />
          <h3 className="font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300">
              {unreadCount} unread
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-white"
        >
          Close
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="px-4 py-10 text-center">
          <Bell size={28} className="mx-auto mb-3 text-slate-500" />
          <p className="font-medium text-white">All caught up!</p>
          <p className="mt-1 text-sm text-slate-400">
            You don't have any notifications yet.
          </p>
        </div>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <button
                type="button"
                key={notification.id}
                onClick={() => onMarkAsRead(notification.id)}
                className={`flex w-full gap-3 border-b border-slate-800 p-4 text-left transition hover:bg-slate-700/30 ${
                  notification.isRead ? '' : 'bg-indigo-500/5'
                }`}
              >
                <div className="mt-1 shrink-0">
                  {notificationIcon(notification.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">
                      {notification.title}
                    </p>

                    {!notification.isRead && (
                      <span
                        aria-label="Unread"
                        className="h-2 w-2 shrink-0 rounded-full bg-indigo-400"
                      />
                    )}
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 p-3">
            <button
              type="button"
              onClick={onMarkAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-2 text-xs text-indigo-300 hover:text-white disabled:opacity-40"
            >
              <CheckCheck size={15} />
              Mark all as read
            </button>

            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300"
            >
              <Trash2 size={15} />
              Clear all
            </button>
          </div>
        </>
      )}
    </section>
  )
}
