<script setup lang="ts">
import TaskList from '@/components/TaskList/TaskList.vue'
import { todoSdk } from '@/utils/useTodoSdk'
import './index.less'

todoSdk.syncService.startSync(1000 * 5)

defineOptions({
  name: 'index-view'
})

console.log(todoSdk)
</script>

<template>
  <div class="index">
    <TaskList />
  </div>
</template>
