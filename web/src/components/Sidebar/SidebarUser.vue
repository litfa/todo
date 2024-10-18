<script setup lang="ts">
import { useCommitsStore } from '@/stores/'

defineOptions({
  name: 'SidebarUser'
})

const commitsStore = useCommitsStore()

const syncStatus = computed(() => {
  const notSyncCount = commitsStore.commits.reduce((previousValue, currentValue) => {
    if (currentValue) {
      return previousValue + 1
    }
    return currentValue
  }, 0)

  return notSyncCount
})
</script>

<template>
  <div class="sidebar-user">
    <div class="avatar"></div>
    <div class="info">
      <div class="username">Username</div>
      <div class="sync">{{ syncStatus }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar-user {
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
