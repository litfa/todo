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
    <div class="title" v-if="!isPage">设置</div>
    <div class="setting-content">
      <SettingMenu @change="(e) => (current = e)" />
      <div class="content">
        <component :is="components[current]" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.setting-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  &.isPage {
    height: 100vh;
    padding: 16px;
  }
  .title {
    font-weight: 600;
    font-size: 16px;
  }
  .setting-content {
    display: flex;
    gap: 16px;
    // width: 500px;
    box-sizing: border-box;
    flex: auto;
    height: 0;

    .setting-menu {
      width: 150px;
      height: 100%;
    }
    .content {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
