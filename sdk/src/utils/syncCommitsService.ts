import type { Commit, SubTask, Task, TaskList } from '@ltfei/todo-common'
import { Create, Delete, parse36RadixId } from '@ltfei/todo-common'
import { throttle } from 'lodash'
import { type Ref, watch } from 'vue'
import { TaskApi } from '../apis/task'
import type { Config, Data, Stores, Update as UpdateFunction } from '../types'

export class SyncCommitsService {
  private commitsStore: Ref<Commit[]>
  private tasks: Ref<Task[]>
  private subTasks: Ref<SubTask[]>
  private tasksList: Ref<TaskList[]>
  private timer: number | null = null
  readonly isSynchronizing: Ref<boolean>
  private syncError: Ref<boolean>
  private config: Config
  private stores: Stores
  private lastSyncTime: Ref<number>
  private taskApi: TaskApi

  constructor(data: Data, config: Config, stores: Stores) {
    this.commitsStore = data.commits
    this.tasks = data.tasks
    this.subTasks = data.subTasks
    this.tasksList = data.taskList
    this.isSynchronizing = data.isSynchronizing
    this.syncError = data.syncError
    this.config = config
    this.lastSyncTime = data.lastSyncTime
    this.stores = stores
    this.taskApi = new TaskApi(this.config)
  }

  public async startSync(interval: number) {
    await this.sync()
    this.timer = setTimeout(() => {
      this.startSync(interval)
    }, interval)
  }

  public listen() {
    watch(
      () => this.commitsStore,
      throttle(() => this.sync(), 5000, {
        leading: false,
        trailing: true
      }),
      {
        deep: true
      }
    )
  }

  public async sync() {
    this.isSynchronizing.value = true
    const pullResult = await this.pull()
    const pushResult = await this.push()
    this.isSynchronizing.value = false
    this.syncError.value = pullResult && pushResult
  }

  private getStore(commit: Commit) {
    if (commit.targetTable === 'tasks') {
      return this.stores.task
    } else if (commit.targetTable === 'subTasks') {
      return this.stores.subTask
    } else if (commit.targetTable === 'taskList') {
      return this.stores.taskList
    } else {
      const a: never = commit.targetTable
      console.error(commit.targetTable)

      return a
    }
  }

  private getStoreAction(commit: Commit): UpdateFunction<SubTask | Task | TaskList> {
    console.log(commit, this.getStore(commit))

    return this.getStore(commit).action as UpdateFunction<SubTask | Task | TaskList>
  }

  /**
   * - 如果是 Create，判断数据是否已经存在，如果已经存在 则不做处理
   * - Create 和 Delete 全量处理(不创建commit)
   * - 判断是否有已有的commit
   * - 如有 对比修改时间，若拿到的更早，不做处理，如果更晚，则提交新的commit
   * - 如果没有 则不产生新的commit直接修改
   */
  private async pull(): Promise<boolean> {
    const { data, status } = await this.taskApi.pull(this.lastSyncTime.value)
    if (status != 200) {
      return false
    }
    console.log(
      `[pull] ${data.commits.length} ${this.lastSyncTime.value} ${data.syncTime}`,
      data
    )

    this.lastSyncTime.value = data.syncTime
    data.commits.forEach((e) => {
      const store = this.getStore(e)
      const action = this.getStoreAction(e)
      if (!action) return false

      if (e.operation == Create) {
        const exists = store.getStateById(parse36RadixId(e.data.id))
        if (exists) {
          return
        }
      }

      if (e.operation == Create || e.operation == Delete) {
        action(
          e.operation,
          { ...e.data, id: parse36RadixId(e.data.id) },
          {
            notCreateCommit: true
          }
        )
        return
      }

      let notCreateCommit = true
      const existingCommit = this.commitsStore.value.find((commit) => {
        return commit.data.id == e.data.id && !commit.synced
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
    const commits = this.commitsStore.value.filter((commit) => {
      return !commit.synced
    })

    if (commits.length == 0) {
      return true
    }

    const { data, status } = await this.taskApi.push(
      commits.map((e) => {
        delete e.synced
        return e
      })
    )
    console.log(`[push] ${commits.length} err:${data?.errCount}`, data)
    if (status != 200) {
      this.syncError.value = true
      return false
    }
    console.log(data)
    data.results.forEach((e) => {
      if (e.err == true) {
        return
      }
      const commit = commits.find((commit) => commit.commitId == e.commitId)
      if (!commit) {
        return
      }
      commit.synced = true
      if (commit.operation == 'create') {
        const store = this.getStore(commit)
        store.updateId(commit.data.createdWithLocalId, parse36RadixId(e.value))
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
