import type { OptionalExcept } from './common'

export type StoreCommit<T extends { id: string }> = {
  (operation: 'create', data: T): void
  (operation: 'delete', data: { id: string }): void
  (operation: 'update', data: OptionalExcept<T, 'id'>): void
}
