<script setup lang="ts">
import { useUserSetting } from '@/stores/'

defineOptions({
  name: 'DevSetting'
})

const userSetting = useUserSetting()

const { getSettingItem } = userSetting
</script>

<template>
  <div class="dev-setting">
    开发设置，仅用于调试，修改实时保存，刷新后生效
    <a-form name="basic" layout="vertical" autocomplete="off">
      <a-form-item label="baseUrl">
        <a-input v-model:value="getSettingItem('dev', 'baseUrl').value" />
      </a-form-item>
      <a-form-item label="token">
        <a-textarea v-model:value="getSettingItem('dev', 'token').value" :rows="6" />
      </a-form-item>
      <a-form-item label="vConsole">
        <a-input v-model:value="getSettingItem('dev', 'vConsole').value" />
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.dev-setting {
  padding: 8px;
}
</style>
