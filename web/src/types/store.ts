import type { OptionalExcept } from './common'
import { Create, Delete, Update } from '@ltfei/todo-common'

export type Action<T extends { id: string }> = {
  (operation: typeof Create, data: T): void
  (operation: typeof Delete, data: { id: string }): void
  (operation: typeof Update, data: OptionalExcept<T, 'id'>): void
}
