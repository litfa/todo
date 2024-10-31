<script setup lang="ts">
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import { useWindowSize } from '@vueuse/core'

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

watch(
  () => route.path,
  () => {
    closeMenu()
  }
)

provide('useMenuMask', useMenuMask)
provide('openMenu', openMenu)
</script>

<template>
  <div class="app">
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
      <sidebar />
    </a-drawer>
    <sidebar v-else />

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
