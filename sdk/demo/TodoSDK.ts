import { ref, Ref } from 'vue'
import { TaskManager } from './managers/TaskManager'
import { LocalStorageManager } from './storage/LocalStorageManager'
import { CommitManager } from './managers/CommitManager'
import { Commit } from './models/Commit'
import { Task } from './models/Task'

class TodoSDK {
  task: TaskManager
  commit: CommitManager
  currentUser: Ref<number> = ref(null)
  LocalStorageManager: LocalStorageManager
  constructor(id: number) {
    this.currentUser.value = id
    this.init()
  }
  async init() {
    const data = await this.LocalStorageManager.loadTaskData(this.currentUser.value)
    this.task.setList(data)
  }
  setLocalStorageManager(LocalStorageManager: LocalStorageManager) {
    this.LocalStorageManager = LocalStorageManager
  }
  action() {
    const commit = new Commit()
    this.commit.add(commit)
    this.task.add(new Task())
  }
}
