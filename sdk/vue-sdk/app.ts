import { Task, TaskList, SubTask } from '@ltfei/todo-common'
import { SyncCommitsService } from '@/syncCommitsService'
import {
  useCommitsStore,
  useTasksStore,
  useSubTasksStore,
  useTasksListStore
} from '@/stores'
import { useStoreStorage } from '@/utils/useStorage'

export type Config = {
  tasks: Task[]
  taskList: TaskList[]
  subTasks: SubTask[]
  syncInterval?: number
}

const syncSdk = (config: Config) => {
  const commitsStore = useCommitsStore()
  const tasks = useTasksStore()
  const subTasks = useSubTasksStore()
  const tasksList = useTasksListStore()
  useStoreStorage()
  const { startSync } = new SyncCommitsService()

  startSync(config.syncInterval ?? 1000 * 10)

  return {
    commitsStore,
    tasks,
    subTasks,
    tasksList
  }
}
