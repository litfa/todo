import type { TaskList } from '@ltfei/todo-common'
import { useAction } from '../utils/useActio'
import type { Data } from '../types'

export const useTaskList = (data: Data) => {
  return useAction<TaskList>(data, 'taskList')
}
