import { defineStore } from 'pinia'
import type { User } from '@ltfei/todo-common'
import * as api from '@/apis'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<
    | {
        isLogin: false
      }
    | {
        isLogin: true
        userInfo: Omit<User, 'password'>
      }
  >({
    isLogin: false
  })

  const getUserInfo = async () => {
    const { status, data } = await api.user.getUserInfo()
    if (status != 200) {
      user.value.isLogin = false
      return
    }
    user.value = {
      isLogin: true,
      userInfo: data
    }
  }

  return {
    user,
    getUserInfo
  }
})
