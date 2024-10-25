<script setup lang="ts">
defineOptions({
  name: 'SidebarListGroup'
})
</script>

<template>
  <div class="sidebar-list-group">
    <div class="header">
      <div class="icon">
        <icon-components />
      </div>
      <div class="title">列表名</div>
      <div class="right-icon">
        <icon-right />
      </div>
    </div>
    <div class="sub-list"></div>
  </div>
</template>

<style lang="less" scoped>
.i-icon {
  display: flex;
}
.sidebar-list-group {
  padding: 0 8px;
  .header {
    display: flex;
    height: 30px;
    align-items: center;
    .icon {
      margin-right: 8px;
    }
    .title {
      font-size: 14px;
    }
    .right-icon {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }
}
</style>
