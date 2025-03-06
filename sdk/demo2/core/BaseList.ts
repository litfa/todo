import * as Common from '@ltfei/todo-common'
import { Data } from './data'
import { OptionalExcept, PartialPart } from '../types/common'
import { generateIdWithSource } from '../utils/snowflake'

type Models = Common.Task | Common.TaskList | Common.SubTask

interface Option {
  notCreateCommit?: boolean
}

export abstract class BaseList<T extends Models> extends Data {
  readonly list: T[]
  abstract readonly targetTable: Common.TargetTable
  constructor(data: T[]) {
    super()
    this.list = data
  }
  /**
   * 覆盖原有数据 更新数据
   */
  setList(data: T[]) {
    this.list.splice(0, Infinity, ...data)
  }
  /**
   * 创建数据，并新建commit
   */
  create(
    state: PartialPart<
      T,
      'id' | 'createdWithLocalId' | 'owner' | 'createdTime' | 'lastEditTime'
    >,
    option: Option = {}
  ) {
    const id = generateIdWithSource()
    const data: T = {
      id,
      createdWithLocalId: id,
      owner: this.options.user,
      createdTime: Date.now(),
      lastEditTime: 0,
      ...state
    } as T

    if (!option.notCreateCommit) {
      this.commit.createCommit(Common.Create, this.targetTable, data)
    }
    this.list.push(data)
  }
  /**
   * 更新数据
   */
  update(data: OptionalExcept<T, 'id'>, option: Option = {}) {
    if (!option.notCreateCommit) {
      this.commit.createCommit(Common.Create, this.targetTable, data as T)
    }
    const i = this.list.findIndex((e) => {
      return e.id == data.id
    })

    this.list[i] = {
      ...this.list[i],
      ...data
    }
  }
  /**
   * 删除数据
   */
  delete(data: { id: string }, option: Option = {}) {
    if (!option.notCreateCommit) {
      this.commit.createCommit(Common.Delete, this.targetTable, data as T)
    }
    const i = this.list.findIndex((e) => {
      return e.id == data.id
    })
    this.list.splice(i, 1)
  }
}
