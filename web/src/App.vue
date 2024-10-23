<script setup lang="ts">
import { SyncCommitsService } from '@/utils/syncCommitsService'

const syncCommitsService = new SyncCommitsService()

// syncCommitsService.startSync(6000)

onUnmounted(() => {
  syncCommitsService.destroy()
})
</script>

<template>
  <button @click="syncCommitsService.sync()">sync</button>
  <RouterView />
</template>

<style lang="less" scoped></style>
