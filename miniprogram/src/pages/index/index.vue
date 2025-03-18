<script setup lang="ts">
import './index.less'
import { todoSdk } from '../../utils/useTodoSdk'
todoSdk.syncService.startSync(1000 * 5)

defineOptions({
  name: 'index-view'
})

console.log(todoSdk)
</script>

<template>
  <div class="index">
    {{ todoSdk.data }}
  </div>
</template>
