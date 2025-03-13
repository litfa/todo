import { Task } from '@ltfei/todo-common'
import { useAction } from '../utils/useActio'
import { Data } from '../types'

export const useTask = (data: Data) => {
  return useAction<Task>(data, 'tasks')
}
