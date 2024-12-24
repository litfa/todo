import {
  cursorPosition,
  getCurrentWindow,
  monitorFromPoint,
  primaryMonitor,
  type Window
} from '@tauri-apps/api/window'
import type { TrayIconEventBase, TrayIconClickEvent } from '@tauri-apps/api/tray'
import { isDesktop } from '@/utils/os'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

type TrayIconEvent = TrayIconEventBase<'Click'> & TrayIconClickEvent

export class TrayService {
  private currentWindow: Window

  constructor() {
    if (!isDesktop()) {
      throw Error('Only allowed in desktop')
    }

    const currentWindow = getCurrentWindow()
    this.currentWindow = currentWindow
    console.log(currentWindow)

    currentWindow.onCloseRequested((e) => {
      e.preventDefault()
      currentWindow.hide()
    })

    currentWindow.listen<TrayIconEvent>('tray_click', (e) => {
      console.log(e)

      if (e.payload.button == 'Left' && e.payload.buttonState == 'Up') {
        console.log('left')

        this.onClickLeft()
      }
      if (e.payload.button == 'Right' && e.payload.buttonState == 'Up') {
        this.onClickRight(e.payload)
      }
    })
  }
  public hideWindow() {
    this.currentWindow.hide()
  }
  public async showWindow() {
    await this.currentWindow.show()
    await this.currentWindow.unminimize()
    await this.currentWindow.setFocus()
  }
  private onClickLeft() {
    this.showWindow()
  }
  private onClickRight(e: TrayIconEvent) {
    this.showTrayMenu(e)
  }
  private async showTrayMenu(e: TrayIconEvent) {
    const { x, y } = await (async () => {
      const { x, y } = e.position

      const monitor = await monitorFromPoint(x, y)
      if (!monitor) {
        return {
          x: 0,
          y: 0
        }
      }

      return {
        x: x / monitor.scaleFactor,
        y: y / monitor.scaleFactor
      }
    })()
    const width = 100
    const height = 200

    const webview = new WebviewWindow('tray-menu', {
      url: `/tray-menu`,
      title: '菜单',
      width,
      height,
      x,
      y: y - height,
      resizable: false,
      maximizable: false,
      minimizable: false,
      transparent: true,
      skipTaskbar: true,
      decorations: false,
      visibleOnAllWorkspaces: true,
      alwaysOnTop: true,
      focus: true
    })

    webview.once('tauri://created', function () {
      console.log('created')
    })
    webview.once('tauri://error', function (e) {
      console.log(e)
    })
  }
}
