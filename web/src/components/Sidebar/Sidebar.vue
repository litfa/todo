<script setup lang="ts">
import SidebarUser from './SidebarUser.vue'
import SidebarList from '../SidebarList/SidebarList.vue'
import SidebarFooter from './SidebarFooter.vue'

defineOptions({
  name: 'SideBar'
})
</script>

<template>
  <div class="sidebar">
    <SidebarUser />

    <div class="search"></div>

    <div class="list">
      <SidebarList />
    </div>

    <div class="footer">
      <SidebarFooter />
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
  max-width: 200px;
  background-color: @bg-color;
  display: flex;
  flex-direction: column;
  .list {
    flex: 1;
  }
}
</style>
