import type { Commit as CommitType, SubTask, Task, TaskList } from '@ltfei/todo-common'

/**
 * 包含同步信息的Commit
 */
export interface Commit<T = Task | SubTask | TaskList> extends CommitType<T> {
  /**
   * 同步失败次数
   */
  errorCount: number
  /**
   * 同步时间
   */
  syncTime?: number
  /**
   * 是否同步
   */
  synced: boolean
}
