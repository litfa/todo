<script setup lang="ts">
import { type Key } from '../common'
import type { MenuProps } from 'ant-design-vue'
import i18n from '@/lang'

defineOptions({
  name: 'SettingMenu'
})

const { t } = i18n.global

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
      {{ t('account_setting') }}
    </a-menu-item>
    <a-menu-item key="RemindSetting">
      <template #icon> <icon-remind /> </template>
      {{ t('remind_setting') }}
    </a-menu-item>
    <a-menu-item disabled>
      <template #icon> <icon-sync /> </template>
      {{ t('sync_setting') }}
    </a-menu-item>
    <a-menu-item key="MoreSetting">
      <template #icon> <icon-more-two /> </template>
      {{ t('more_setting') }}
    </a-menu-item>
    <a-menu-divider />
    <a-menu-item key="AboutSetting">
      <template #icon> <icon-info /> </template>
      {{ t('about_setting') }}
    </a-menu-item>
  </a-menu>
</template>

<style lang="less" scoped></style>
