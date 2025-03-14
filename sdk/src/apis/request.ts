import type { Config, GetToken } from '../types'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

export type Response<T> = Promise<{
  status: number
  data: T
  msg?: string
}>

export class Requset {
  private axiosInstance!: AxiosInstance
  constructor(config: Config | AxiosInstance) {
    this.setInstance(config)
  }

  getToken!: GetToken

  private setInstance(config: Config | AxiosInstance) {
    if (config instanceof Function) {
      this.axiosInstance = config
      return
    }

    const syncConfig = config?.sync

    this.axiosInstance = this.setInterceptors(
      axios.create({
        baseURL: syncConfig?.baseUrl
      })
    )

    this.getToken = syncConfig?.token || (() => '')
  }

  private setInterceptors(request: AxiosInstance) {
    request.interceptors.request.use((config) => {
      const token = this.getToken && this.getToken()
      if (token && config.headers) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    })

    request.interceptors.response.use(
      async (data) => {
        if (data.data.status == 4001) {
          // emit('authentication_failed')
        }
        return data
      },
      (err: Error) => {
        // emit('error_axios', err.message)
        console.log('axios error', err.message)
      }
    )

    return request
  }

  public request = async (AxiosRequestConfig: AxiosRequestConfig<any>) => {
    const res = await this.axiosInstance(AxiosRequestConfig)
    if (!res?.data) {
      return {
        status: 500
      }
    }
    return res.data
  }
}
