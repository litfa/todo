// https://pinia.esm.dev/introduction.html
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Userinfo {
  id: number
  username: string
  avatar: string
  city?: string
  gender: number
  desc: string
  register_date: string
  last_login_date?: any
  status: number
  avatar_pendant?: any
  get_likes: number
  followers: number
  following: number
}
type User =
  | {
      isLogin: false
      userinfo?: {}
    }
  | {
      isLogin: true
      userinfo: Userinfo
    }
export const userStore = defineStore('counter', () => {
  const user = ref<User>({
    isLogin: false,
    userinfo: {}
  })

  return { user }
})
