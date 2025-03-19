import { pull, push } from '@/apis/task'
import { TodoSDK } from '@ltfei/todo-sdk'
import { getStorage, setStorage } from '@tarojs/taro'

const baseUrl = process.env.TARO_APP_API

const todoSdk = TodoSDK({
  sync: {
    baseUrl: baseUrl,
    pull,
    push
  },
  storage: {
    async getItem(key: string) {
      try {
        const result = await getStorage({
          key
        })

        console.log(result)

        return result?.data
      } catch {
        return null
      }
    },
    setItem(key: string, value: string | object) {
      console.log('aaaa', value)

      setStorage({
        key,
        data: value
      })
    }
  }
})

export { todoSdk }
