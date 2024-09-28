import type { Task } from '@ltfei/todo-common'
import { keys } from '@ltfei/todo-common'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([
    {
      body: '',
      isImported: false,
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      parentFolderId: '1',
      reminderDateTime: 0,
      createUser: 0,
      subtasks: [],
      id: '1',
      subject: '吃饭',
      status: keys.task.status.notStarted,
      createdTime: 0,
      completedDateTime: 0,
      lastEditTime: false,
      createdWithLocalId: ''
    },
    {
      body: '',
      isImported: false,
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      parentFolderId: '1',
      reminderDateTime: 0,
      createUser: 0,
      subtasks: [],
      id: '2',
      subject: '睡觉',
      status: keys.task.status.notStarted,
      createdTime: 0,
      completedDateTime: 0,
      lastEditTime: false,
      createdWithLocalId: ''
    },
    {
      body: '',
      isImported: false,
      expirationTime: 0,
      startTime: 0,
      isReminderOn: false,
      parentFolderId: '',
      reminderDateTime: 0,
      createUser: 0,
      subtasks: [],
      id: '3',
      subject: '打豆豆',
      status: keys.task.status.notStarted,
      createdTime: 0,
      completedDateTime: 0,
      lastEditTime: false,
      createdWithLocalId: ''
    }
  ])

  return { tasks }
})
