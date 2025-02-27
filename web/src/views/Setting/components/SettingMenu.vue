<script setup lang="ts">
import { type Key } from '../common'
import type { MenuProps } from 'ant-design-vue'

defineOptions({
  name: 'SettingMenu'
})

const props = defineProps<{
  useRouter?: boolean
  defaultKeys?: Key[]
}>()

const router = props.useRouter && useRouter()
const emit = defineEmits(['change'])

const selectedKeys = ref<Key[]>(props.defaultKeys || ['DevSetting'])

const select: MenuProps['onSelect'] = (e) => {
  emit('change', e.key)
  if (props.useRouter && router) {
    router.push('/setting-mobie/' + (e.key as string).replace(/Setting$/, '').toLowerCase())
  }
}
</script>

<template>
  <a-menu v-model:selected-keys="selectedKeys" @select="select" class="setting-menu">
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
    <a-menu-item key="RemindSetting">
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
</template>

<style lang="less" scoped></style>
