<script setup lang="ts">
import { useTasksStore } from '@/stores/index'
import { keys } from '@ltfei/todo-common'
import { inbox, important, myday, planned, assignedToMe } from '@ltfei/todo-common'

defineOptions({
  name: 'SidebarListItem'
})

const props = defineProps<{
  name: string
  checked: boolean
  id: string
}>()

const tasks = useTasksStore()

const count = computed(() => {
  return tasks.getTasksByParentFolderId(props.id).filter((e) => {
    return e.status == keys.task.status.notStarted
  }).length
})
</script>

<template>
  <div class="sidebar-list-item" :class="{ checked }">
    <div class="icon">
      <icon-star v-if="id == important" fill="var(--warning)" />
      <icon-home v-else-if="id == inbox" fill="var(--primary)" />
      <icon-sun-one v-else-if="id == myday" fill="var(--info)" />
      <icon-plan v-else-if="id == planned" fill="var(--info)" />
      <icon-user v-else-if="id == assignedToMe" fill="var(--info)" />

      <icon-list v-else />
    </div>
    <div class="title">{{ name }}</div>
    <a-badge
      class="count"
      :count
      size="small"
      :number-style="{
        backgroundColor: '#fff',
        color: '#999'
      }"
    />
  </div>
</template>

<style lang="less" scoped>
.i-icon {
  display: flex;
}
.sidebar-list-item {
  padding: 0 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 30px;
  transition: all 0.2s;
  user-select: none;
  flex-shrink: 0;

  .icon {
    margin-right: 8px;
  }
  .title {
    font-size: 14px;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &.checked,
  &:hover {
    background-color: @black-opacity-1;
  }
}
</style>
