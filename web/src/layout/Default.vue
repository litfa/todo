<script setup lang="ts">
import Sidebar from '@/components/Sidebar/Sidebar.vue'
defineOptions({
  name: 'DefaultLayout'
})
</script>

<template>
  <div class="app">
    <sidebar />
    <router-view />
  </div>
</template>

<style lang="less" scoped></style>
