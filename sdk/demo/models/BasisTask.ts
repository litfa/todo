import * as Common from '@ltfei/todo-common'

export abstract class BasisTask implements Common.BasisTask {
  id: string
  createdWithLocalId: string
  subject: string
  status: number
  createdTime: number
  completedDateTime: number
  lastEditTime: number
  isImported: boolean
  owner: number
  abstract toJSON(): Object
}
