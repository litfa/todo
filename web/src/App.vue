<script setup lang="ts">
import { SyncCommitsService } from '@/utils/syncCommitsService'

const syncCommitsService = new SyncCommitsService()

syncCommitsService.startSync(1000 * 10)

onUnmounted(() => {
  syncCommitsService.destroy()
})
</script>

<template>
  <RouterView />
</template>

<style lang="less" scoped></style>
