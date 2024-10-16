export const Create = 'create'
export const Delete = 'delete'
export const Update = 'update'

export type Operation = typeof Create | typeof Delete | typeof Update
export type TargetTable = 'tasks' | 'subTasks' | 'taskList'

export interface Commit<T> {
  commitId: string
  /**
   * 操作(增删改)
   */
  operation: Operation
  /**
   * 要操作的表
   */
  targetTable: TargetTable
  /**
   * 来源
   */
  source: string
  /**
   * 操作用户
   */
  user: number
  /**
   * 数据
   */
  data: T
  /**
   * 创建时间
   */
  createdTime: number
  /**
   * 最后编辑时间
   */
  lastEditTime: number
  /**
   * 是否同步
   */
  synced?: boolean
}
