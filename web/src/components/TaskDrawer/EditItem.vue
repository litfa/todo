<script setup lang="ts">
import type { Component } from 'vue'
defineOptions({
  name: 'EditItem'
})

defineProps<{
  icon?: Component
  text: string
  extendText?: string
  extendIcon?: Component | false
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
      <div class="text">{{ text }}</div>
      <div class="extend">
        <slot name="extend">
          {{ extendText }}
        </slot>
      </div>
    </div>
    <div class="extend-icon" @click.stop="$emit('clickExtendIcon')" v-if="extendIcon">
      <component :is="extendIcon" />
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
      size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
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
