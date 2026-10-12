
export type NotificationType =
  | 'success'
  | 'info'
  | 'warning'

export interface AppNotification {
  id: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  createdAt: string
}
