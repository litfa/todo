import type { SubTask } from '@ltfei/todo-common'
import { useAction } from '../utils/useAction'
import type { Data } from '../types'

export const useSubTask = (data: Data) => {
  return useAction<SubTask>(data, 'subTasks')
}
