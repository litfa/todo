import { getCurrentWindow, type Window } from '@tauri-apps/api/window'
import type { TrayIconEventBase, TrayIconClickEvent } from '@tauri-apps/api/tray'
import { isDesktop } from '@/utils/os'

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
    this.showMenu()
  }
  private showMenu() {}
}

/**
 * 设置
 * 锁定
 *
 * 退出
 */
