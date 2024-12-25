import { openSettingWindow } from '@/components/Setting'
import { exit } from '@tauri-apps/plugin-process'

export const useTrayMenu = () => {
  const exitApp = async () => {
    await exit()
  }

  const openSetting = () => {
    return openSettingWindow()
  }

  return {
    exitApp,
    openSetting
  }
}
