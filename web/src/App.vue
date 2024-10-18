<script setup lang="ts">
import { useSyncCommits } from '@/utils/useSyncCommits'

useSyncCommits()
</script>

<template>
  <RouterView />
</template>

<style lang="less" scoped></style>
