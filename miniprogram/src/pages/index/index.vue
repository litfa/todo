<script setup lang="ts">
import './index.less'
import { todoSdk } from '../../utils/useTodoSdk'
import TaskList from '../../components/TaskList/TaskList.vue'

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
