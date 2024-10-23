<script setup lang="ts">
import { SyncCommitsService } from '@/utils/syncCommitsService'

const syncCommitsService = new SyncCommitsService()

syncCommitsService.listen()

onUnmounted(() => {
  syncCommitsService.destroy()
})
</script>

<template>
  <RouterView />
</template>

<style lang="less" scoped></style>
