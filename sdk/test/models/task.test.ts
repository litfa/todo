import { inbox, inboxTaskListId, Task } from '@ltfei/todo-common'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useTask } from '../../src/models/task'
import { Data } from '../../src/types'
import { generateIdString } from '../../src/utils/snowflake'

describe('task', () => {
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
  const task = useTask(data)

  const parentFolderIdList = [generateIdString(), generateIdString(), inboxTaskListId]
  const generatedData = () => {
    const id = generateIdString()
    const parentFolderIdIndex = Math.floor(Math.random() * parentFolderIdList.length)
    const parentFolderId = parentFolderIdList[parentFolderIdIndex]

    return {
      body: '',
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      isRepeat: false,
      parentFolderId,
      reminderDateTime: 0,
      id: id,
      createdWithLocalId: id,
      subject: id,
      status: 0,
      createdTime: 0,
      completedDateTime: 0,
      lastEditTime: 0,
      isImported: false,
      owner: 0
    }
  }
  const list: Task[] = []
  for (let i = 0; i < 50; i++) {
    const e = generatedData()
    list.push(e)
    task.create(e)
  }

  it('getTasksByParentFolderId', () => {
    const actual = task.getTasksByParentFolderId(parentFolderIdList[0])
    const expected = list.filter((e) => {
      return e.parentFolderId == parentFolderIdList[0]
    })

    expect(actual).toEqual(expected)
  })
  it('getTasksByParentFolderId with inbox', () => {
    const actual = task.getTasksByParentFolderId(inbox)
    const expected = list.filter((e) => {
      return e.parentFolderId == inboxTaskListId
    })

    expect(actual).toEqual(expected)
  })
  // todo: 测试默认列表
})
