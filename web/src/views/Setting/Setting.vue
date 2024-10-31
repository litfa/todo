<script setup lang="ts">
import AccountSetting from './components/AccountSetting.vue'
import AboutSetting from './components/AboutSetting.vue'
import DevSetting from './components/DevSetting.vue'

defineOptions({
  name: 'SettingPage'
})

withDefaults(
  defineProps<{
    padding?: boolean
  }>(),
  {
    padding: true
  }
)

const components = {
  AccountSetting,
  AboutSetting,
  DevSetting
}

const selectedKeys = ref<(keyof typeof components)[]>(['AccountSetting'])
const current = computed(() => {
  return selectedKeys.value[0]
})
</script>

<template>
  <div class="setting-page" :class="{ padding }">
    <a-menu v-model:selected-keys="selectedKeys" class="menu">
      <a-menu-item key="DevSetting">
        <template #icon> <icon-api /> </template>
        开发设置
      </a-menu-item>
      <a-menu-item key="AccountSetting">
        <template #icon> <icon-user /> </template>
        账户
      </a-menu-item>
      <a-menu-item disabled>
        <template #icon> <icon-setting /> </template>
        常规
      </a-menu-item>
      <a-menu-item disabled>
        <template #icon> <icon-remind /> </template>
        提醒
      </a-menu-item>
      <a-menu-item disabled>
        <template #icon> <icon-sync /> </template>
        同步
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key="AboutSetting">
        <template #icon> <icon-info /> </template>
        关于
      </a-menu-item>
    </a-menu>
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
  height: 100%;
  &.padding {
    padding: 16px;
  }
  .menu {
    width: 150px;
    height: 100%;
  }
  .content {
    flex: 1;
  }
}
</style>
