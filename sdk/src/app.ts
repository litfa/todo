import type { Commit, SubTask, Task, TaskList } from '@ltfei/todo-common'
import { reactive, ref } from 'vue'
import { useCommit } from './models/commit'
import { useSubTask } from './models/subTask'
import { useTask } from './models/task'
import { useTaskList } from './models/TaskList'
import type { Config, Data } from './types'
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

export const TodoSDK = (config: Config) => {
  const data: Data = {
    tasks: ref<Task[]>([]),
    taskList: ref<TaskList[]>([]),
    subTasks: ref<SubTask[]>([]),
    commits: ref<Commit[]>([]),
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
    task: useTask(data),
    taskList: useTaskList(data),
    subTask: useSubTask(data)
  }

  const syncService = new SyncCommitsService(data, config, stores)

  return {
    data,
    setUser,
    commit: useCommit(data),
    ...stores,
    syncService
  }
}
