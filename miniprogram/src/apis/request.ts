import Taro from '@tarojs/taro'
// import type {request } from '@tarojs/taro'

const baseUrl = process.env.TARO_APP_API

type Request<T> = {
  status: number
  data: T
  msg?: string
}

let cach = ''
const getToken = async () => {
  if (cach) {
    return cach
  }
  try {
    const token = await Taro.getStorage({
      key: 'token'
    })
    cach = 'Bearer ' + token.data
    return cach
  } catch {
    return null
  }
}

export const request = async <T>(option: Taro.request.Option) => {
  // todo: 拦截加上token
  const res = await Taro.request<Request<T>>({
    ...option,
    ...{
      url: baseUrl + option.url,
      header: {
        Authorization: await getToken()
      }
    }
  })
  if (res.data.status == 4001) {
    cach = ''
  }
  return res.data
}

export const upload = async <T>(option: Taro.uploadFile.Option): Promise<Request<T>> => {
  const res = await Taro.uploadFile({
    ...option,
    ...{
      url: baseUrl + option.url,
      header: {
        Authorization: await getToken()
      }
    }
  })

  const data = JSON.parse(res.data) as Request<T>

  if (data.status == 4001) {
    cach = ''
  }

  return data
}
