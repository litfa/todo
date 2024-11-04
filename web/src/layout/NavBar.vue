<script setup lang="ts">
defineOptions({
  name: 'NavBar'
})

const route = useRoute()
</script>

<template>
  <div class="app">
    <div class="nav-bar">
      <div class="left" @click="$router.back()">
        <icon-left size="20" />
      </div>
      <div class="title">{{ route.meta.title }}</div>
      <div class="right"></div>
    </div>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  .nav-bar {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    .left,
    .right {
      width: 40px;
    }
    .title {
      flex: 1;
      text-align: center;
    }
  }
  .page {
    flex: 1;
  }
}
</style>
