import type { SubTask } from '@ltfei/todo-common'
import { useAction } from '../utils/useActio'
import type { Data } from '../types'

export const useSubTask = (data: Data) => {
  return useAction<SubTask>(data, 'subTasks')
}
