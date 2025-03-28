import { emit } from '@/utils/eventbus'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getUserToken, refreshToken } from './auth'

const LocalbaseURL = localStorage.getItem('baseUrl')

const baseURL = LocalbaseURL || import.meta.env.VITE_API_BASE_URL || ''

const axiosRequest = axios.create({
  baseURL: baseURL
})

axiosRequest.interceptors.request.use((config) => {
  const token = getUserToken()
  if (token && config.headers) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

axiosRequest.interceptors.response.use(
  async (data) => {
    /**
     * todo: 封装权限 让用户点击时直接跳转登录，而不需要发送请求
     */
    if (data.data.status == 4001) {
      const isRefresh = await refreshToken()

      if (!isRefresh) {
        emit('authentication_failed')
        return data
      }
      return await axiosRequest.request(data.config)
    }
    return data
  },
  (err: Error) => {
    emit('error_axios', err.message)
    console.log('axios error', err.message)
  }
)

const request = async (AxiosRequestConfig: AxiosRequestConfig<any>) => {
  const res = await axiosRequest(AxiosRequestConfig)
  if (!res?.data) {
    return {
      status: 500
    }
  }
  return res.data
}

export type Response<T> = Promise<{
  status: number
  data: T
  msg?: string
}>

export default request
