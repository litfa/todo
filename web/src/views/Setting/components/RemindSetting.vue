<script setup lang="ts">
import { useUserSetting } from '@/stores/'
import { keys } from '@ltfei/todo-common'
import { isDesktop } from '@/utils/os'

defineOptions({
  name: 'RemindSetting'
})

const userSetting = useUserSetting()

const { getSettingItem } = userSetting
</script>

<template>
  <div class="remind-setting">
    {{ $t('remind_setting') }}
    <a-form name="basic" layout="vertical" autocomplete="off">
      <a-form-item :label="$t('remind_enable')">
        <a-switch v-model:checked="getSettingItem('remind', 'enable').value" />
      </a-form-item>
      <a-form-item :label="$t('remind_notification_method')" v-if="isDesktop()">
        <a-select v-model:value="getSettingItem('remind', 'notificationMethod').value">
          <a-select-option v-for="(i, index) in keys.userSetting.Remind" :key="i" :value="i">
            {{ index }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped></style>
