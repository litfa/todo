import Taro from '@tarojs/taro'
// import type {request } from '@tarojs/taro'
import { getUserToken, refreshToken } from '../utils/auth'

const baseUrl = process.env.TARO_APP_API

type Request<T> = {
  status: number
  data: T
  msg?: string
}

const getToken = async () => {
  const token = await getUserToken()
  return 'Bearer ' + token
}

export const request = async <T>(option: Taro.request.Option): Promise<Request<T>> => {
  const config: Taro.request.Option = {
    ...option,
    ...{
      url: baseUrl + option.url,
      header: {
        Authorization: await getToken()
      }
    }
  }

  const res = await Taro.request<Request<T>>(config)
  if (res.data.status == 4001) {
    const refresh = await refreshToken()
    if (refresh) {
      return request(option)
    }
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
    // cach = ''
  }

  return data
}
