import { SubTask, Task, TaskList } from '@ltfei/todo-common'

export class Data {
  private tasks: Task[]
  private taskList: TaskList[]
  private subTasks: SubTask[]

  constructor(config: Config) {
    this.tasks = config.tasks
    this.taskList = config.taskList
    this.subTasks = config.subTasks
  }

  getTasks() {
    return this.tasks
  }
  setTasks(tasks: Task[]) {
    this.tasks = tasks
  }
  getTaskList() {
    return this.taskList
  }
  setTaskList(taskList: TaskList[]) {
    this.taskList = taskList
  }
  getSubTasks() {
    return this.subTasks
  }
  setSubTasks(subTasks: SubTask[]) {
    this.subTasks = subTasks
  }
}
