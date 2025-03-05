import * as Common from '@ltfei/todo-common'
import { BaseItem } from '../core/BaseItem'

export abstract class BasisTask extends BaseItem implements Common.BasisTask {
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
