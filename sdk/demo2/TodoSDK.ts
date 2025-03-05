import * as Common from '@ltfei/todo-common'
import { CommitManager } from './managers/CommitManager'
import { TaskManager } from './managers/TaskManager'
import { LocalStorageManager } from './services/LocalStorageManager'
import { Sync } from './services/Sync'
// import { Task } from './models/Task'
// import { Commit } from './models/Commit'
import { reactive, ref, watch } from 'vue'

class TodoSDK {
  task: TaskManager
  commit: CommitManager
  LocalStorageManager: LocalStorageManager
  Sync: Sync
  user: number
  constructor(config: {
    task: Common.Task[]
    taskList: Common.TaskList[]
    subTask: Common.SubTask[]
    commit: Common.Commit[]
    user: number
    LocalStorageManager?: typeof LocalStorageManager
  }) {
    const taskManager = new TaskManager(config.task)
    const commitManager = new CommitManager(config.commit)

    const data = {
      task: taskManager,
      commit: commitManager,
      user: config.user
    }
    taskManager.setData(data)
    commitManager.setData(data)

    const LocalStorageManagerClass = config.LocalStorageManager || LocalStorageManager

    this.LocalStorageManager = new LocalStorageManagerClass(data)
    this.Sync = new Sync(data)

    this.task = taskManager
    this.commit = commitManager

    this.user = config.user

    this.init()
  }

  init() {
    console.log('init')

    this.LocalStorageManager.load(this.user)
  }
}

class Storage extends LocalStorageManager {
  getItem<T>(key: string): Promise<T> {
    console.log(key)
    return Promise.resolve([{ id: 1 }] as T)
  }
  setItem<T>(key: string, value: T): Promise<T> {
    console.log(key, value)
    return
  }
  clear(): Promise<void> {
    console.log('clear')
    return
  }
}
const task = reactive([])
watch(
  task,
  () => {
    console.log('watch')
  },
  {
    deep: true
  }
)
const todoSdk = new TodoSDK({
  commit: [],
  subTask: [],
  task: task,
  taskList: [],
  user: 0,
  LocalStorageManager: Storage
})

console.log(todoSdk)

// todoSdk.init()

// console.log(todoSdk)
// const t = new Task({
//   body: '',
//   expirationTime: 0,
//   startTime: 0,
//   isReminderOn: false,
//   isRepeat: false,
//   parentFolderId: '',
//   reminderDateTime: 0,
//   id: '',
//   createdWithLocalId: '',
//   subject: '',
//   status: 1,
//   createdTime: 0,
//   completedDateTime: 0,
//   lastEditTime: 0,
//   isImported: false,
//   owner: 0
// })
setTimeout(() => {
  todoSdk.task.create({
    body: '',
    expirationTime: 0,
    startTime: 0,
    isReminderOn: false,
    isRepeat: false,
    parentFolderId: '',
    reminderDateTime: 0,
    id: '',
    createdWithLocalId: '',
    subject: '',
    status: 1,
    createdTime: 0,
    completedDateTime: 0,
    lastEditTime: 0,
    isImported: false,
    owner: 0
  })
  console.log(todoSdk)
}, 2000)
const p = () => {
  return new Promise((res) => {
    setInterval(() => {}, 5000)
  })
}
p()
