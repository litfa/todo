import { on } from '@/utils/eventbus'
import { message } from 'ant-design-vue'

/**
 * 视图层事件处理
 */
export const useViewLayerEvent = () => {
  on('error_axios', (data) => {
    message.error('网络异常' + data)
  })

  on('authentication_failed', () => {
    localStorage.removeItem('token')
    const router = useRouter()
    router.replace('/login')
    message.warn('请先登录')
  })
}
