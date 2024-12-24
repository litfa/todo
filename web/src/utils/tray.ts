import { getCurrentWindow, LogicalPosition, type Window } from '@tauri-apps/api/window'
import type { TrayIconEventBase, TrayIconClickEvent } from '@tauri-apps/api/tray'
import { isDesktop } from '@/utils/os'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

type TrayIconEvent = TrayIconEventBase<'Click'> & TrayIconClickEvent

export class TrayService {
  private currentWindow: Window
  private webview: WebviewWindow

  constructor() {
    if (!isDesktop()) {
      throw Error('Only allowed in desktop')
    }

    this.currentWindow = getCurrentWindow()
    this.webview = this.createTrayWindow()
    this.registerWindowEvent()
  }
  /**
   * 注册窗口事件
   */
  private registerWindowEvent() {
    this.currentWindow.onCloseRequested((e) => {
      e.preventDefault()
      this.currentWindow.hide()
    })

    this.currentWindow.listen<TrayIconEvent>('tray_click', (e) => {
      if (e.payload.button == 'Left' && e.payload.buttonState == 'Up') {
        this.onClickLeft()
      }
      if (e.payload.button == 'Right' && e.payload.buttonState == 'Up') {
        this.onClickRight(e.payload)
      }
    })
  }

  /**
   * 隐藏右键菜单
   */
  public hideWindow() {
    this.currentWindow.hide()
  }
  /**
   * 展示右键菜单
   */
  public async showWindow() {
    await this.currentWindow.show()
    await this.currentWindow.unminimize()
    await this.currentWindow.setFocus()
  }
  /**
   * 获取缩放倍数
   */
  private async getScaleFactor() {
    const scaleFactor = await this.currentWindow.scaleFactor()
    return scaleFactor
  }
  /**
   * 获取光标位置
   */
  private async getMousePosition(e: TrayIconEvent) {
    const { x, y } = e.position
    const scaleFactor = await this.getScaleFactor()
    return {
      x: x / scaleFactor,
      y: y / scaleFactor
    }
  }
  /**
   * 计算窗口出现的位置
   */
  private async getWindowPosition(e: TrayIconEvent) {
    const { x, y } = await this.getMousePosition(e)
    const size = await this.webview.size()
    const scaleFactor = await this.getScaleFactor()
    const { height, width } = size.toLogical(scaleFactor)

    return {
      x: Math.max(x - width, 0),
      y: Math.max(y - height, 0)
    }
  }
  /**
   * 左键托盘图标
   */
  private onClickLeft() {
    this.showWindow()
  }
  /**
   * 右键托盘图标
   */
  private onClickRight(e: TrayIconEvent) {
    this.showTrayMenu(e)
  }
  /**
   * 展示右键菜单
   */
  private async showTrayMenu(e: TrayIconEvent) {
    this.webview.setFocus()
    const { x, y } = await this.getWindowPosition(e)
    this.webview.setPosition(new LogicalPosition(x, y))
    this.webview.show()
  }
  /**
   * 创建右键菜单窗口
   */
  private createTrayWindow() {
    const webview = new WebviewWindow('tray-menu', {
      url: `/tray-menu`,
      title: '菜单',
      // width,
      // height,
      x: 0,
      y: 0,
      resizable: false,
      maximizable: false,
      minimizable: false,
      transparent: true,
      skipTaskbar: true,
      decorations: false,
      visibleOnAllWorkspaces: true,
      alwaysOnTop: true,
      focus: true,
      visible: false
    })

    webview.once('tauri://created', function () {
      console.log('created')
    })
    webview.once('tauri://error', function (e) {
      console.log(e)
    })

    return webview
  }
}
