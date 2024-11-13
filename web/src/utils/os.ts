import { type } from '@tauri-apps/plugin-os'

export const getOsType = () => {
  try {
    return type()
  } catch {
    return 'browser'
  }
}

export const isDesktop = () => {
  const osType = getOsType()
  return ['windows', 'macos', 'linux'].includes(osType)
}
