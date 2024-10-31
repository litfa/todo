import { Modal } from 'ant-design-vue'
import SettingContent from '@/views/Setting/Setting.vue'
import './settingModal.less'
import { type, type OsType } from '@tauri-apps/plugin-os'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

const openSettingModal = () => {
  const modal = Modal.info({
    title: '设置',
    wrapClassName: 'setting-modal',
    content: h(SettingContent, {
      padding: false
    }),
    icon: null,
    footer: null,
    closable: true,
    width: '800px',
    onOk() {
      console.log('ok')
    }
  })

  const destroy = modal.destroy

  return destroy
}

const openWindow = () => {
  const webview = new WebviewWindow('setting', {
    url: '/setting',
    title: '设置',
    resizable: false,
    maximizable: false,
    minimizable: false
  })

  webview.once('tauri://created', function () {
    console.log('created')
  })
  webview.once('tauri://error', function (e) {
    console.log(e)
  })
}

/**
 * setting
 * web/android 使用弹窗
 * win考虑使用弹出窗口
 */
export const openSettingWindow = () => {
  let platformName
  try {
    platformName = type()
  } catch {
    //
  }
  const desktop: OsType[] = ['windows', 'macos', 'linux']

  if (platformName && desktop.includes(platformName)) {
    return openWindow()
  }

  const destroy = openSettingModal()

  return {
    destroy: destroy
  }
}
