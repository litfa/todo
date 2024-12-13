import type { UserSetting } from '@ltfei/todo-common'
import { defaultUserSetting } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import { useStorage } from '@/utils/useStorage'

export const useUserSetting = defineStore('userSetting', () => {
  const setting = ref<UserSetting>(defaultUserSetting)

  return {
    setting: setting,
    useStorage: () => useStorage('setting', setting)
  }
})
