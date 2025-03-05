import type { UserSetting } from '@ltfei/todo-common'
import { defaultUserSetting } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import { useStorage } from '@/utils/useStorage'
// import type { ReadonlyDeep } from '@/types'

export const useUserSetting = defineStore('userSetting', () => {
  const setting = ref<UserSetting>(defaultUserSetting)

  const getSettingItem = <T extends keyof UserSetting, K extends keyof UserSetting[T]>(
    key1: T,
    key2: K
  ): Ref<UserSetting[T][K]> => {
    if (setting.value[key1] == undefined) {
      setting.value[key1] = defaultUserSetting[key1]
    }
    if (setting.value[key1][key2] == undefined) {
      setting.value[key1][key2] = defaultUserSetting[key1][key2]
    }

    return computed({
      get() {
        return setting.value[key1][key2]
      },
      set(value) {
        setting.value[key1][key2] = value
      }
    })
  }

  return {
    // setting: setting as Ref<ReadonlyDeep<UserSetting>>,
    getSettingItem,
    useStorage: () => useStorage('setting', setting)
  }
})
