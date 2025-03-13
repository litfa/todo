import { Commit, SubTask, Task, TaskList } from '@ltfei/todo-common'
import { reactive, ref } from 'vue'
import { useCommit } from './models/commit'
import { useTask } from './models/task'
import { Config, Data } from './types'
import { useStorage } from './utils/storage'
import { SyncCommitsService } from './utils/syncCommitsService'

/**
 * todo:
 * - sync
 *  - 自定义获取token方法
 *  - 自定义请求体
 *  - 手动实现请求 pull push sync
 *
 */

const SDK = (config: Config) => {
  const data: Data = {
    tasks: reactive<Task[]>([]),
    taskList: reactive<TaskList[]>([]),
    subTasks: reactive<SubTask[]>([]),
    commits: reactive<Commit[]>([]),
    user: ref(0),
    isSynchronizing: ref(false),
    syncError: ref(false),
    lastSyncTime: ref(0)
  }

  const storage = useStorage(data, config)

  const setUser = async (user: number) => {
    data.user.value = user
    await storage.getLocalStore()
  }

  const stores = {
    task: useTask(data)
  }

  const sync = new SyncCommitsService(data, config, stores)
  sync.startSync(5000)

  return {
    data,
    setUser,
    commit: useCommit(data),
    ...stores
  }
}

const sdk = SDK({
  storage: {
    setItem(key, value) {
      console.log('setItem', key, value)
    },
    getItem<T>(key: string) {
      console.log('getItem', key)
      return [] as T
    }
  }
})
