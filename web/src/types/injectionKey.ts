import { useThemes } from '@/utils/theme'

export const themeMode = Symbol() as InjectionKey<ReturnType<typeof useThemes>['mode']>
export const openMenu = Symbol() as InjectionKey<() => void>
export const closeMenu = Symbol() as InjectionKey<() => void>
export const useMenuMask = Symbol() as InjectionKey<globalThis.ComputedRef<boolean>>
// export const syncCommits = Symbol() as InjectionKey<SyncCommitsService['sync']>
