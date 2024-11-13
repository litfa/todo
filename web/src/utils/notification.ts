import {
  sendNotification,
  isPermissionGranted,
  requestPermission
} from '@tauri-apps/plugin-notification'
import { useTasksStore } from '@/stores'
import { getOsType } from '@/utils/os'
import type { OsType } from '@tauri-apps/plugin-os'
import { keys } from '@ltfei/todo-common'

interface NotificationOption {
  id: string
  title: string
  time: number
}

export class NotificationService {
  private readonly osType: OsType | 'browser' = getOsType()
  private readonly tasks = useTasksStore()
  private interval?: number
  private lastReminderTime = Date.now()

  getNotificationQueue(): NotificationOption[] {
    const now = Date.now()

    const reminderTasks = this.tasks.tasks.filter((e) => {
      return (
        e.isReminderOn &&
        e.status == keys.task.status.notStarted &&
        e.reminderDateTime > this.lastReminderTime &&
        e.reminderDateTime < now
      )
    })

    this.lastReminderTime = now

    return reminderTasks.map((e) => {
      return {
        id: e.id,
        title: e.subject,
        time: e.reminderDateTime
      }
    })
  }

  static async hasPermission() {
    const osType = getOsType()
    if (osType == 'browser') {
      return Notification.permission == 'granted'
    }

    return await isPermissionGranted()
  }

  static async requestPermission() {
    const osType = getOsType()
    if (osType == 'browser') {
      return Notification.requestPermission()
    }

    return await requestPermission()
  }

  // addNotificationQueue(option: NotificationOption) {
  //   return this.notificationQueue.push(option)
  // }

  public startNotificationProcessing() {
    this.interval = setInterval(() => {
      const reminderTasks = this.getNotificationQueue()
      reminderTasks.sort((a, b) => a.time - b.time)
      const now = Date.now()
      while (reminderTasks.length > 0 && reminderTasks[0].time <= now) {
        const option = reminderTasks.shift()
        if (option) {
          this.createNotification(option)
        }
      }
    }, 1000)
  }

  public destroy() {
    clearInterval(this.interval)
  }

  public createNotification(option: NotificationOption) {
    if (this.osType == 'browser') {
      return this.createWebNotification(option)
    } else {
      return this.createTauriNotification(option)
    }
  }

  private createTauriNotification(option: NotificationOption) {
    new Notification(option.title)
  }

  private createWebNotification(option: NotificationOption) {
    sendNotification({
      title: option.title,
      extra: {
        id: option.id
      }
    })
  }
}
