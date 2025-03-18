import { getUserinfo as getUserinfoApi } from '../apis/user'
import { userStore } from '../stores/user'
import { todoSdk } from '../utils/useTodoSdk'

export const getUserinfo = async () => {
  const user = userStore()
  const res = await getUserinfoApi()
  if (res.status == 200) {
    user.user.isLogin = true
    user.user.userinfo = res.data
    todoSdk.setUser(res.data.id)
  }
}
