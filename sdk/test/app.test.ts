import { describe, it, expect, beforeEach } from 'vitest'
import { TodoSDK } from '../src/app'
import type { Config } from '../src/types'
import { generateIdWithSource, generateIdString } from '@ltfei/todo-common'

describe('TodoSDK', () => {
  let config: Config

  beforeEach(() => {
    config = {
      storage: {
        getItem() {
          return null
        },
        setItem() {}
      }
    }
  })

  it('should initialize with default data', () => {
    const sdk = TodoSDK(config)
    expect(sdk.data.tasks.value).toEqual([])
    expect(sdk.data.taskList.value).toEqual([])
    expect(sdk.data.subTasks.value).toEqual([])
    expect(sdk.data.commits.value).toEqual([])
    expect(sdk.data.user.value).toBe(0)
    expect(sdk.data.isSynchronizing.value).toBe(false)
    expect(sdk.data.syncError.value).toBe(false)
    expect(sdk.data.lastSyncTime.value).toBe(0)
  })

  // it('should set user correctly', async () => {
  //   const sdk = TodoSDK(config)
  //   await sdk.setUser(1)
  //   expect(sdk.data.user.value).toBe(1)
  // })

  // it('should have task store', () => {
  //   const sdk = TodoSDK(config)
  //   expect(sdk.task).toBeDefined()
  // })

  it('should have taskList store', () => {
    const sdk = TodoSDK(config)
    expect(sdk.taskList).toBeDefined()
  })

  it('should have subTask store', () => {
    const sdk = TodoSDK(config)
    expect(sdk.subTask).toBeDefined()
  })

  it('should have commit functionality', () => {
    const sdk = TodoSDK(config)
    expect(sdk.commit).toBeDefined()
  })

  it('should have syncService', () => {
    const sdk = TodoSDK(config)
    expect(sdk.syncService).toBeDefined()
  })

  /**
   * 创建任务列表，在id更新之前，创建任务，然后同步时更新任务列表的id，任务的 parentFolderId 应当同步更新
   * 1. 创建任务列表
   * 2. 创建任务
   * 3. 更新任务列表 id
   * 4. 验证 parentFolderId 是否为新的 id
   */
  it('should update task parentFolderId when taskList id is updated', () => {
    const sdk = TodoSDK(config)

    // 1. 创建任务列表
    const taskList = sdk.taskList.createList('test')
    const taskId = generateIdWithSource()

    // 2. 创建任务
    sdk.task.create({
      body: '',
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      isRepeat: false,
      parentFolderId: taskList.id,
      reminderDateTime: 0,
      id: taskId,
      createdWithLocalId: taskId,
      subject: '',
      status: 0,
      createdTime: 0,
      completedDateTime: 0,
      lastEditTime: 0,
      isImported: false,
      owner: 0
    })

    // 3. 更新任务列表 id
    const newTaskListId = generateIdString()
    sdk.taskList.updateId(taskList.id, newTaskListId)

    // 4. 验证 parentFolderId 是否为新的 id
    expect(sdk.task.getStateById(taskId)?.parentFolderId).toEqual(newTaskListId)
  })
})
