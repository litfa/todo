import { Task, generateIdString, generateIdWithSource } from '@ltfei/todo-common'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { Data } from '../../src/types'
import { useAction } from '../../src/utils/useAction'

describe('useAction', () => {
  const data: Data = {
    tasks: ref([]),
    taskList: ref([]),
    subTasks: ref([]),
    commits: ref([]),
    user: ref(0),
    isSynchronizing: ref(false),
    syncError: ref(false),
    lastSyncTime: ref(0)
  }
  const action = useAction<Task>(data, 'tasks')

  it('should add task', () => {
    const id = generateIdWithSource()
    const item = {
      id,
      createdWithLocalId: id,
      status: 0,
      createdTime: 0,
      lastEditTime: 0,
      owner: 0,
      subject: '',
      completedDateTime: 0,
      isImported: false,
      body: '',
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      isRepeat: false,
      parentFolderId: '',
      reminderDateTime: 0
    }
    action.create(item)
    expect(data.tasks.value[0]).toEqual(item)
  })

  it('should get tasks by id', () => {
    const id = generateIdWithSource()
    const item = {
      id,
      createdWithLocalId: id,
      status: 0,
      createdTime: 0,
      lastEditTime: 0,
      owner: 0,
      subject: '',
      completedDateTime: 0,
      isImported: false,
      body: '',
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      isRepeat: false,
      parentFolderId: '',
      reminderDateTime: 0
    }
    action.create(item)
    expect(action.getStateById(id)).toEqual(item)
  })

  it('should update task', () => {
    const id = generateIdWithSource()
    const item = {
      id,
      createdWithLocalId: id,
      status: 0,
      createdTime: 0,
      lastEditTime: 0,
      owner: 0,
      subject: '',
      completedDateTime: 0,
      isImported: false,
      body: '',
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      isRepeat: false,
      parentFolderId: '',
      reminderDateTime: 0
    }
    action.create(item)
    action.update({ id: id, subject: 'new' })
    expect(action.getStateById(id)?.subject).toBe('new')
  })

  it('should remove task', () => {
    const id = generateIdWithSource()
    const item = {
      id,
      createdWithLocalId: id,
      status: 0,
      createdTime: 0,
      lastEditTime: 0,
      owner: 0,
      subject: '',
      completedDateTime: 0,
      isImported: false,
      body: '',
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      isRepeat: false,
      parentFolderId: '',
      reminderDateTime: 0
    }
    action.create(item)
    action.remove(id)
    expect(action.getStateById(id)).toBe(undefined)
  })

  it('updateId', () => {
    const id = generateIdWithSource()
    const item = {
      id,
      createdWithLocalId: id,
      status: 0,
      createdTime: 0,
      lastEditTime: 0,
      owner: 0,
      subject: '',
      completedDateTime: 0,
      isImported: false,
      body: '',
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      isRepeat: false,
      parentFolderId: '',
      reminderDateTime: 0
    }
    action.create(item)
    const newId = generateIdString()
    action.updateId(id, newId)
    expect(action.getStateById(newId)).toEqual(item)
  })
})
