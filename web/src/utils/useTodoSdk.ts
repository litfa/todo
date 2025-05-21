import { TodoSDK } from '@ltfei/todo-sdk'
import { getUserToken } from '@/utils/auth'

const LocalbaseURL = localStorage.getItem('baseUrl')

const baseURL = LocalbaseURL || import.meta.env.VITE_API_BASE_URL || ''

const todoSdk = TodoSDK({
  retryCount: 5,
  sync: {
    baseUrl: baseURL,
    token: () => getUserToken() || ''
  }
})

export { todoSdk }
