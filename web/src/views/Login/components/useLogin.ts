import * as loginApi from '@/apis/auth'
import { loginMethod } from '@ltfei/todo-common'

export const useLogin = async () => {
  const { status, data } = await loginApi.init()

  if (status != 200) {
    //
  }

  const { loginMethods, uuid } = data

  /**
   * 获取小程序码
   */
  const qrCode = ref<string>()
  const getWxQrCode = async () => {
    const res = await loginApi.getQrCode(uuid)
    const url = URL.createObjectURL(new Blob([res]))

    qrCode.value = url
  }
  if (loginMethods.includes(loginMethod.wxMiniprogram)) {
    getWxQrCode()
  }
  /**
   * 轮询登录状态
   */

  /**
   * qq登录的跳转
   */

  return {
    loginMethods,
    uuid,
    qrCode
  }
}
