import { useCommitsStore, useTasksStore, useSubTasksStore, useTasksListStore } from '@/stores'
import type { Commit, Task, SubTask, TaskList } from '@ltfei/todo-common'
import { Create, Delete } from '@ltfei/todo-common'
import { pull, push } from '@/apis/task'
import type { Update as UpdateFunction } from '@/types/store'

/**
 * @deprecated
 */
export const useSyncCommits = () => {
  const commitsStore = useCommitsStore()
  const tasks = useTasksStore()
  // const subTasks = useSubTasksStore()
  const tasksList = useTasksListStore()

  console.log(commitsStore)

  const interval = setInterval(() => {
    const commits = commitsStore.commits.filter((e) => {
      return !e.synced
    })
    syncCommit(commits, commitsStore.lastSyncTime)
  }, 3000)

  const getStore = (commit: Commit) => {
    if (commit.targetTable == 'tasks') {
      return tasks
    } else if (commit.targetTable == 'subTasks') {
      return tasks
    } else if (commit.targetTable == 'taskList') {
      return tasksList
    } else {
      const a: never = commit.targetTable
      return a
    }
  }

  const action = (commit: Commit) => {
    const store = getStore(commit)
    if (!store) return
    ;(store.action as UpdateFunction<SubTask | Task | TaskList>)(commit.operation, commit.data, {
      notCreateCommit: true
    })
  }

  const syncCommit = async (commits: Commit[], lastSyncTime: number) => {
    const { data } = await pull(lastSyncTime)
    commitsStore.lastSyncTime = data.syncTime
    data.commits.forEach((e) => {
      action(e)
    })
  }

  const destroy = () => {
    clearInterval(interval)
  }

  return destroy
}

// todo: action加一个改id

export class SyncCommitsService {
  private commitsStore = useCommitsStore()
  private tasks = useTasksStore()
  private subTasks = useSubTasksStore()
  private tasksList = useTasksListStore()
  private timer: number | null = null

  constructor() {
    // this.startSync()
  }

  public async startSync(interval: number) {
    await this.sync()
    this.timer = setTimeout(() => {
      this.startSync(interval)
    }, interval)
  }

  public async sync() {
    this.commitsStore.isSynchronizing = true
    const pullResult = await this.pull()
    const pushResult = await this.push()
    this.commitsStore.isSynchronizing = false
    this.commitsStore.syncError = pullResult && pushResult
  }

  private getStore(commit: Commit) {
    if (commit.targetTable === 'tasks') {
      return this.tasks
    } else if (commit.targetTable === 'subTasks') {
      return this.tasks
    } else if (commit.targetTable === 'taskList') {
      return this.tasksList
    } else {
      const a: never = commit.targetTable
      return a
    }
  }

  private getStoreAction(commit: Commit): UpdateFunction<SubTask | Task | TaskList> {
    return this.getStore(commit).action as UpdateFunction<SubTask | Task | TaskList>
  }

  /**
   * - Create 和 Delete 全量处理(不创建commit)
   * - 判断是否有已有的commit
   * - 如有 对比修改时间，若拿到的更早，不做处理，如果更晚，则提交新的commit
   * - 如果没有 则不产生新的commit直接修改
   */
  private async pull(): Promise<boolean> {
    const { data } = await pull(this.commitsStore.lastSyncTime)
    this.commitsStore.lastSyncTime = data.syncTime
    data.commits.forEach((e) => {
      const action = this.getStoreAction(e)
      if (!action) return false

      if (e.operation == Create || e.operation == Delete) {
        action(e.operation, e.data, {
          notCreateCommit: true
        })
      }

      let notCreateCommit = true
      const existingCommit = this.commitsStore.commits.find((commit) => {
        return commit.data.id == e.data.id
      })

      if (existingCommit) {
        if (
          Math.max(existingCommit.createdTime, existingCommit.lastEditTime) >
          Math.max(e.createdTime, e.lastEditTime)
        ) {
          return
        }
        notCreateCommit = false
      }

      action(e.operation, e.data, {
        notCreateCommit
      })
    })
    return true
  }

  /**
   * push时 过滤已同步的commit，提交
   * todo: 过滤非当前用户的
   * 返回的结果中
   * 成功，标记为已同步，将id修改为返回的id，并删除commit
   * 失败：
   */
  private async push(): Promise<boolean> {
    const commits = this.commitsStore.commits.filter((commit) => {
      return !commit.synced
    })

    const { data, status } = await push(
      commits.map((e) => {
        delete e.synced
        return e
      })
    )
    if (status != 200) {
      this.commitsStore.syncError = true
      return false
    }
    console.log(data)
    data.results.forEach((e) => {
      if (e.err) {
        return
      }
      const commit = commits.find((commit) => commit.commitId == e.value.commitId)
      if (!commit) {
        return
      }
      commit.synced = true
      if (commit.operation == 'create') {
        const store = this.getStore(commit)
        store.updateId(commit.data.createdWithLocalId, e.value.value.toString(36))
      }
    })
    return true
  }

  public destroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
