import * as Common from '@ltfei/todo-common'
import { BasisTask } from './BasisTask'

export class Task extends BasisTask implements Common.Task {
  body: string
  expirationTime: number
  startTime: number
  isReminderOn: boolean
  isRepeat: boolean
  repetitionPeriod?: string
  nextRepeatTaskId?: string
  parentFolderId: string
  reminderDateTime: number
  constructor(data: Common.Task) {
    super()
    this.setData(data)
  }
  setData(data: Common.Task) {
    for (const i in data) {
      const index = i as keyof Common.Task
      this[index] = data[index] as never
    }
  }
  toJSON(): Common.Task {
    return this
  }
}
