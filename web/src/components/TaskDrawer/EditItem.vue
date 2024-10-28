<script setup lang="ts">
import type { Component } from 'vue'
defineOptions({
  name: 'EditItem'
})

defineProps<{
  icon?: Component
  text: string
  subText?: string
  extendText?: string
  extendIcon?: Component | 'close' | false
  highlight?: boolean
}>()

defineEmits(['clickExtendIcon'])
</script>

<template>
  <div class="edit-item" :class="{ highlight }">
    <div class="left">
      <div class="icon">
        <slot name="icon">
          <component :is="icon" />
        </slot>
      </div>
      <div class="text">
        <span class="text-line1">
          {{ text }}
        </span>
        <span class="text-line2" v-if="subText"> {{ subText }} </span>
      </div>
      <div class="extend">
        <slot name="extend">
          {{ extendText }}
        </slot>
      </div>
    </div>
    <div class="extend-icon" @click.stop="$emit('clickExtendIcon')" v-if="extendIcon">
      <IconClose v-if="extendIcon == 'close'" />
      <component v-else :is="extendIcon" />
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.i-icon) {
  display: flex;
}
.edit-item {
  display: flex;
  align-items: center;
  color: @text-color-regular;
  user-select: none;
  border-radius: 4px;
  overflow: hidden;
  font-size: 14px;
  min-width: 150px;
  &.highlight {
    .left {
      color: @primary;
    }
  }
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px 8px;
    &:hover {
      background-color: @black-opacity-1;
    }
    .icon {
      margin-right: 8px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text {
      display: flex;
      flex-direction: column;
      .text-line2 {
        color: @text-color;
        font-size: 12px;
      }
    }
    .extend {
      margin-left: auto;
      height: 100%;
    }
  }

  .extend-icon {
    height: 100%;
    padding: 10px 8px;
    &:hover {
      background-color: @black-opacity-1;
    }
  }
}
</style>
