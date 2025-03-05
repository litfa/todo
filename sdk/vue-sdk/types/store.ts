import type { OptionalExcept } from './common'
import { Create, Delete, Update, type Operation } from '@ltfei/todo-common'

interface Option {
  notCreateCommit?: boolean
}

export type Action<T extends { id: string }> = {
  (operation: typeof Create, data: T, option?: Option): void
  (operation: typeof Delete, data: { id: string }, option?: Option): void
  (operation: typeof Update, data: OptionalExcept<T, 'id'>, option?: Option): void
}

export type Update<T extends { id: string }> = {
  (operation: Operation, data: OptionalExcept<T, 'id'>, option?: Option): void
}
