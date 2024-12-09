import {
  sendNotification,
  isPermissionGranted,
  requestPermission
} from '@tauri-apps/plugin-notification'
import { useTasksStore } from '@/stores'
import { getOsType } from '@/utils/os'
import type { OsType } from '@tauri-apps/plugin-os'
import { keys } from '@ltfei/todo-common'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { primaryMonitor } from '@tauri-apps/api/window'

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

  public async createTauriNotificationWindow(option: NotificationOption) {
    const width = 270
    const height = 150
    const margin = 20
    // todo: 动态获取任务栏高度
    const taskbarHeigh = 50

    const { x, y } = await (async () => {
      const monitor = await primaryMonitor()
      if (!monitor) {
        return {
          x: 0,
          y: 0
        }
      }
      const monitorWidth = monitor!.size.width / monitor.scaleFactor
      const monitorHeight = monitor!.size.height / monitor.scaleFactor - taskbarHeigh

      const x = monitorWidth - width - margin
      const y = monitorHeight - height - margin

      return {
        x,
        y
      }
    })()

    const webview = new WebviewWindow('notification', {
      url: `/notification?taskId=${option?.id}`,
      title: '通知',
      width,
      height,
      x: Math.max(x, margin),
      y: Math.max(y, margin),
      resizable: false,
      maximizable: false,
      minimizable: false,
      transparent: true,
      skipTaskbar: true,
      decorations: false,
      visibleOnAllWorkspaces: true,
      alwaysOnTop: true
    })

    webview.once('tauri://created', function () {
      console.log('created')
    })
    webview.once('tauri://error', function (e) {
      console.log(e)
    })
  }
}
