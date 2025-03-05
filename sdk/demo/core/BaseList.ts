import { Ref } from 'vue'
import { BaseItem } from '../core/BaseItem'

export abstract class BaseList<T> extends BaseItem {
  readonly list: Ref<T[]>
  abstract toJSON(): Object
  abstract add(data: T): void
  abstract remove(id: number): void
  abstract update(id: number, data: Partial<T>): void
  abstract findxxx(): void
}
