<script setup lang="ts">
import { useUserSetting } from '@/stores/'
import i18n from '@/lang'

defineOptions({
  name: 'MoreSetting'
})
const userSetting = useUserSetting()

const { getSettingItem } = userSetting

const { messages } = i18n.global
</script>

<template>
  更多设置
  <div class="more-setting">
    <a-form name="basic" layout="vertical" autocomplete="off">
      <a-form-item label="语言">
        <a-select v-model:value="getSettingItem('more', 'lang').value">
          <a-select-option v-for="(item, index) in messages" :key="index" :value="index">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped></style>
