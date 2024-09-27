<script setup lang="ts">
import Sidebar from '@/components/Sidebar/Sidebar.vue'
defineOptions({
  name: 'DefaultLayout'
})
</script>

<template>
  <div class="app">
    <sidebar />
    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<style lang="less" scoped>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  .page {
    flex: 1;
  }
}
</style>
