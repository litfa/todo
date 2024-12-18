<script setup lang="ts">
import { useStoreStorage } from '@/utils/useStorage'
useStoreStorage()

defineOptions({
  name: 'SimpleRoot'
})
</script>

<template>
  <RouterView />
</template>
