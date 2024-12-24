import {
  sendNotification,
  isPermissionGranted,
  requestPermission
} from '@tauri-apps/plugin-notification'
import { useTasksStore } from '@/stores'
import { getOsType, isDesktop } from '@/utils/os'
import type { OsType } from '@tauri-apps/plugin-os'
import { keys, type Task } from '@ltfei/todo-common'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { getCurrentWindow, primaryMonitor } from '@tauri-apps/api/window'
import { useUserSetting } from '@/stores/'
import type { OptionalExcept } from '@/types/'
import type { EventCallback, UnlistenFn } from '@tauri-apps/api/event'

interface NotificationOption {
  id: string
  title: string
  time: number
}

export type TaskCompletedEventPayload = OptionalExcept<Task, 'id'>

export class NotificationService {
  private readonly osType: OsType | 'browser' = getOsType()
  private readonly isDesktop = isDesktop()
  private readonly tasks = useTasksStore()
  private readonly userSetting = useUserSetting()
  private interval?: number
  private lastReminderTime = Date.now()
  public static readonly TaskCompletedEvent = 'TaskCompletedEvent'
  private unlisten: UnlistenFn | null = null

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

  public async startNotificationProcessing() {
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

    if (this.osType != 'browser') {
      const unlisten = await getCurrentWindow().listen(
        NotificationService.TaskCompletedEvent,
        this.onTaskCompletedEvent
      )
      this.unlisten = unlisten
    }
  }

  private onTaskCompletedEvent: EventCallback<TaskCompletedEventPayload> = ({ payload }) => {
    console.log(payload)
    this.tasks.action('update', payload)
  }

  public destroy() {
    clearInterval(this.interval)
    this.unlisten && this.unlisten()
  }

  public createNotification(option: NotificationOption) {
    if (!this.userSetting.getSettingItem('remind', 'enable')) {
      return
    }
    const notificationMethod = this.userSetting.getSettingItem('remind', 'notificationMethod').value
    if (this.isDesktop && notificationMethod == keys.userSetting.Remind.inApp) {
      return this.createTauriNotificationWindow(option)
    }
    if (this.osType == 'browser') {
      return this.createWebNotification(option)
    } else {
      return this.createTauriNotification(option)
    }
  }

  /**
   * 使用 web 的 Notification api
   */
  private createWebNotification(option: NotificationOption) {
    new Notification(option.title)
  }

  /**
   * 使用 tauri 的 Notification api
   */
  private createTauriNotification(option: NotificationOption) {
    sendNotification({
      title: option.title,
      extra: {
        id: option.id
      }
    })
  }

  /**
   * 桌面端右下角弹窗提醒
   */
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
      // visible: false
    })

    webview.once('tauri://created', function () {
      console.log('created')
    })
    webview.once('tauri://error', function (e) {
      console.log(e)
    })
  }
}
