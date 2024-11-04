<script setup lang="ts">
import { components } from './common'
import SettingMenu from './components/SettingMenu.vue'

defineOptions({
  name: 'SettingPage'
})

withDefaults(
  defineProps<{
    isPage?: boolean
  }>(),
  {
    isPage: true
  }
)

const current = ref<keyof typeof components>('DevSetting')
</script>

<template>
  <div class="setting-page" :class="{ isPage }">
    <SettingMenu @change="(e) => (current = e)" />
    <div class="content">
      <component :is="components[current]" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.setting-page {
  display: flex;
  gap: 16px;
  // width: 500px;
  box-sizing: border-box;
  height: 100%;
  &.isPage {
    height: 100vh;
    padding: 16px;
  }
  .setting-menu {
    width: 150px;
    height: 100%;
  }
  .content {
    flex: 1;
  }
}
</style>
