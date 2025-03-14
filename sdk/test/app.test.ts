import { describe, it, expect, beforeEach } from 'vitest'
import { TodoSDK } from '../src/app'
import type { Config } from '../src/types'

describe('TodoSDK', () => {
  let config: Config

  beforeEach(() => {
    config = {}
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

  it('should set user correctly', async () => {
    const sdk = TodoSDK(config)
    await sdk.setUser(1)
    expect(sdk.data.user.value).toBe(1)
  })

  it('should have task store', () => {
    const sdk = TodoSDK(config)
    expect(sdk.task).toBeDefined()
  })

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
})
