import * as loginApi from '@/apis/auth'
import type { ValueOf } from '@/types'
import type { Icon } from '@icon-park/vue-next/lib/runtime'
import { loginMethod } from '@ltfei/todo-common'
import { keys } from '@ltfei/todo-common'

const { loginStatus: loginStatusKeys } = keys.loginQueue

export const useLogin = async () => {
  const views: {
    [key in ValueOf<typeof loginStatusKeys>]?: {
      info?: string
      tips?: string
      icon?: Icon
    }
  } = {
    [loginStatusKeys.scanCode]: {
      info: '扫码成功',
      tips: '请在手机上确认登录',
      icon: IconCheckOne
    },
    [loginStatusKeys.getQqConnectUrl]: {
      info: '正在使用qq登录',
      tips: '请在弹出的界面继续操作',
      icon: IconCheckOne
    },
    [loginStatusKeys.loginSucceed]: {
      info: '登录成功',
      icon: IconCheckOne
    },
    [loginStatusKeys.loginFailedUserCancel]: {
      info: '登录失败',
      tips: '你已取消操作',
      icon: IconCloseOne
    },
    [loginStatusKeys.loginFailedOtherCause]: {
      info: '登录失败',
      tips: '请刷新后重试',
      icon: IconCloseOne
    },
    [loginStatusKeys.loginFailedTimeout]: {
      info: '登录已过期',
      tips: '请点击刷新',
      icon: IconCloseOne
    }
  }

  const view = computed(() => {
    return views[loginStatus.value]
  })

  const uuid = ref<string>()
  const loginMethods = ref<string[]>([])
  const loginStatus = ref<ValueOf<typeof loginStatusKeys>>(loginStatusKeys.notLogin)
  const qrCode = ref<string>()

  /**
   * 获取小程序码
   */
  const getWxQrCode = async () => {
    const res = await loginApi.getQrCode(uuid.value!)
    const url = URL.createObjectURL(new Blob([res]))

    qrCode.value = url
  }

  /**
   * 轮询登录状态
   */
  const checkStatus = async (timeout: number) => {
    const { data, status } = await loginApi.getStatus(uuid.value!)
    if (status != 200) {
      loginStatus.value = loginStatusKeys.loginFailedOtherCause
      return
    }

    loginStatus.value = data.status

    if (data.status >= 10) {
      return
    }

    setTimeout(() => {
      checkStatus(timeout)
    }, timeout)
  }

  /**
   * 初始化，获取uuid
   */
  const init = async () => {
    const { status, data } = await loginApi.init()
    if (status != 200) {
      return
    }
    uuid.value = data.uuid
    loginMethods.value = data.loginMethods
    qrCode.value = ''

    if (loginMethods.value.includes(loginMethod.wxMiniprogram)) {
      getWxQrCode()
    }
    checkStatus(2000)
  }
  await init()

  /**
   * 点击提示蒙层
   */
  const checkTips = () => {
    if (loginStatus.value >= 20) {
      init()
    }
  }

  /**
   * qq登录的跳转
   */

  return {
    loginMethods,
    uuid,
    qrCode,
    loginStatus,
    views,
    view,
    checkTips
  }
}
