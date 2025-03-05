import { BaseList } from '../core/BaseList'
import * as Common from '@ltfei/todo-common'

export class TaskManager extends BaseList<Common.Task> {
  targetTable: Common.TargetTable = 'tasks'
}
