<script setup lang="ts">
import { List as IconList } from '@icon-park/vue-next'

defineOptions({
  name: 'SidebarListItem'
})

defineProps<{
  name: string
  checked: boolean
}>()
</script>

<template>
  <div class="sidebar-list-item" :class="{ checked }">
    <div class="icon">
      <icon-list />
    </div>
    <div class="title">{{ name }}</div>
  </div>
</template>

<style lang="less" scoped>
.i-icon {
  display: flex;
}
.sidebar-list-item {
  padding: 0 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 30px;
  transition: all 0.2s;
  user-select: none;

  .icon {
    margin-right: 8px;
  }
  .title {
    font-size: 14px;
  }
  &.checked,
  &:hover {
    background-color: @black-opacity-1;
  }
}
</style>
