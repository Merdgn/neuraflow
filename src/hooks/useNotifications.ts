
import { useEffect, useState } from 'react'

import type {
  AppNotification,
  NotificationType,
} from '../interfaces/Notification'

const STORAGE_KEY = 'neuraflow_notifications'

function loadNotifications(): AppNotification[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)

    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item): item is AppNotification =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        typeof item.message === 'string' &&
        typeof item.createdAt === 'string' &&
        typeof item.isRead === 'boolean' &&
        ['success', 'info', 'warning'].includes(item.type)
    )
  } catch {
    return []
  }
}

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<AppNotification[]>(loadNotifications)

  // Save notifications whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notifications)
      )
    } catch (error) {
      console.error('Failed to save notifications:', error)
    }
  }, [notifications])

  const addNotification = (
    title: string,
    message: string,
    type: NotificationType = 'info'
  ) => {
    const newNotification: AppNotification = {
      id: crypto.randomUUID(),
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString(),
    }

    setNotifications((current) =>
      [newNotification, ...current].slice(0, 50)
    )
  }

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    )
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  }
}
