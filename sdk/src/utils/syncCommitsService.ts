import type { Commit as OriginCommit, SubTask, Task, TaskList } from '@ltfei/todo-common'
import { Create, Delete, parse36RadixId } from '@ltfei/todo-common'
import { throttle } from 'lodash'
import { type Ref, watch } from 'vue'
import { TaskApi } from '../apis/task'
import type { Config, Data, Stores, Update as UpdateFunction } from '../types'
import type { Commit } from '../types/commit'

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

  private getStore(commit: OriginCommit) {
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

  private getStoreAction(
    commit: OriginCommit
  ): UpdateFunction<SubTask | Task | TaskList> {
    console.log(commit, this.getStore(commit))

    return this.getStore(commit).action as UpdateFunction<SubTask | Task | TaskList>
  }

  /**
   * - 如果是 Create，通过id判断数据是否已经存在，如果已经存在 则不做处理
   * - 通过localId判断是否为同步成功但未正确标记的内容，如有，则将commit标记为同步完成
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
      // Create，通过id判断数据是否已经存在，如果已经存在 则不做处理
      if (e.operation == Create) {
        const exists = store.getStateById(parse36RadixId(e.data.id))
        if (exists) {
          return
        }

        // 通过localId判断是否为同步成功但未正确标记的内容，如有，则将commit标记为同步完成
        const synced = store.find((state) => {
          return state.createdWithLocalId == e.data.createdWithLocalId
        })
        if (synced) {
          const commit = this.commitsStore.value.find((commit) => {
            return commit.commitId == e.commitId
          })
          if (!commit) {
            return
          }
          commit.synced = true
        }
      }

      // Create 和 Delete 全量处理(不创建commit)
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

      // 判断是否有已有的commit
      let notCreateCommit = true
      const existingCommit = this.commitsStore.value.find((commit) => {
        return commit.data.id == e.data.id && !commit.synced
      })

      // 如有 对比修改时间，若拿到的更早，不做处理，如果更晚，则提交新的commit
      if (existingCommit) {
        if (
          Math.max(existingCommit.createdTime, existingCommit.lastEditTime) >
          Math.max(e.createdTime, e.lastEditTime)
        ) {
          return
        }
        notCreateCommit = false
      }

      // 如果没有 则不产生新的commit直接修改
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
      if (
        this.config.retryCount != undefined &&
        this.config.retryCount != -1 &&
        commit.errorCount > this.config.retryCount
      ) {
        return false
      }
      return !commit.synced
    })

    if (commits.length == 0) {
      return true
    }

    const { data, status } = await this.taskApi.push(
      (commits as Commit[]).map((e) => {
        const { synced, syncTime, errorCount, ...data } = e
        return data
      })
    )
    console.log(`[push] ${commits.length} err:${data?.errCount}`, data)
    if (status != 200) {
      this.syncError.value = true
      return false
    }
    console.log(data)
    data.results.forEach((e) => {
      const commit = commits.find((commit) => commit.commitId == e.commitId)
      if (!commit) {
        return
      }
      if (e.err == true) {
        if (!commit.errorCount) {
          commit.errorCount = 1
        } else {
          commit.errorCount++
        }
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
