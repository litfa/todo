import { on } from '@/utils/eventbus'
import { message } from 'ant-design-vue'

/**
 * 视图层事件处理
 */
export const useViewLayerEvent = () => {
  const route = useRoute()
  const router = useRouter()

  on('error_axios', (data) => {
    // message.error('网络异常' + data)
  })

  on('authentication_failed', () => {
    localStorage.removeItem('token')
    // router.replace('/login')
    message.warn('请先登录')
  })

  on('update_tasklist_id', (before: string, after: string) => {
    if (route.params.id == before) {
      router.push(`/tasks/${after}`)
    }
  })
}
