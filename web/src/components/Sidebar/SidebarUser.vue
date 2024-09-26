<script setup lang="ts">
defineOptions({
  name: 'SidebarUser'
})
</script>

<template>
  <div class="sidebar-user">
    <div class="avatar"></div>
    <div class="info">
      <div class="username">Username</div>
      <div class="sync">已同步</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar-user {
  max-width: 200px;
  background-color: pink;
  display: flex;
  align-items: center;
  padding: 8px;

  .avatar {
    width: 45px;
    height: 45px;
    background-color: red;
    border-radius: 50%;
  }
  .info {
    margin-left: 8px;
    .sync {
      font-size: 12px;
    }
  }
}
</style>
