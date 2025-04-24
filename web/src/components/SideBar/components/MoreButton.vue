<script setup lang="ts">
import { openSettingWindow } from '@/components/Setting'

defineOptions({
  name: 'MoreButton'
})

const visible = ref(false)

const openSetting = () => {
  openSettingWindow()
  visible.value = false
}
</script>

<template>
  <a-popover placement="rightBottom" v-model:open="visible">
    <template #content>
      <a-space direction="vertical">
        <div class="button">
          <div class="icon">
            <IconHome />
          </div>
          首页
        </div>
        <div class="button">
          <div class="icon">
            <IconHelp />
          </div>
          反馈建议
        </div>
        <div class="button">
          <div class="icon">
            <icon-arrow-circle-up />
          </div>
          检查更新
        </div>
        <div class="button" @click="openSetting">
          <div class="icon">
            <IconSetting />
          </div>
          设置
        </div>
      </a-space>
    </template>

    <IconMoreTwo size="20" />
  </a-popover>
</template>

<style lang="less" scoped>
.button {
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
  &:hover {
    background-color: @black-opacity-1;
  }
  &:active {
    background-color: @black-opacity-2;
  }
  .i-icon {
    display: flex;
  }
}
.ant-btn {
  width: 100%;
  text-align: left;
}
</style>
