import type { PiniaPluginContext } from 'pinia'
import localforage from 'localforage'

const prefix = 'todo_'
const getStoreKey = (storeId: string) => `${prefix}${storeId}`

/**
 * @deprecated
 */
export function persistedstate({ pinia }: PiniaPluginContext) {
  pinia.use(async ({ store }) => {
    const data = await localforage.getItem(getStoreKey(store.$id))
    store.$state = data as {}

    store.$subscribe((e, state) => {
      localforage.setItem(getStoreKey(e.storeId), JSON.parse(JSON.stringify(state)))
    })
  })
}
