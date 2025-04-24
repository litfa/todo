<script setup lang="ts">
import TaskListMenu from '@/components/TaskListMenu/TaskListMenu.vue'
import SideBar from '@/components/SideBar/SideBar.vue'
import { useWindowSize } from '@vueuse/core'
import { injectionKey } from '@/types/'

defineOptions({
  name: 'DefaultLayout'
})

const { width } = useWindowSize()
const useMenuMask = computed(() => width.value < 520)
const open = ref(true)
const route = useRoute()

const openMenu = () => {
  open.value = true
}
const closeMenu = () => {
  open.value = false
}

const showSideBar = computed(() => {
  return width.value > 650
})

watch(
  () => route.path,
  () => {
    closeMenu()
  }
)

provide(injectionKey.useMenuMask, useMenuMask)
provide(injectionKey.openMenu, openMenu)
provide(injectionKey.closeMenu, closeMenu)
</script>

<template>
  <div class="app">
    <side-bar v-if="showSideBar" />
    <a-drawer
      v-if="useMenuMask"
      v-model:open="open"
      class="menu-drawer"
      width="200"
      placement="left"
      :get-container="false"
      :header-style="{
        padding: '8px 12px'
      }"
      :bodyStyle="{
        padding: 0
      }"
    >
      <TaskListMenu :show-user="!showSideBar" />
    </a-drawer>
    <TaskListMenu v-else :show-user="!showSideBar" />

    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<style lang="less" scoped>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  :deep(.menu-drawer) {
    background-color: @bg-color;
  }
  .page {
    flex: 1;
  }
}
</style>
