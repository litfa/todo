<script setup lang="ts">
import TaskListItem from './TaskListItem.vue'
defineOptions({
  name: 'TaskList'
})
</script>

<template>
  <div class="task-list">
    <TaskListItem v-for="i in 5" :key="i" />
  </div>
</template>

<style lang="less" scoped></style>
