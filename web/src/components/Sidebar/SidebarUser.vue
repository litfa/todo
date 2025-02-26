<script setup lang="ts">
import { useUserStore, useCommitsStore } from '@/stores'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'SidebarUser'
})

const commitsStore = useCommitsStore()
const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const syncStatus = computed(() => {
  const notSyncCount = commitsStore.commits.reduce((previousValue, currentValue) => {
    if (!currentValue.synced) {
      return previousValue + 1
    }
    return previousValue
  }, 0)

  // if(commitsStore.syncError) {
  //   return ''
  // }

  return notSyncCount > 0 ? '正在同步' : '同步完成'
})
</script>

<template>
  <div class="sidebar-user" v-if="user.isLogin">
    <div class="avatar">
      <img :src="user.userInfo.avatar" alt="" />
    </div>
    <div class="info">
      <div class="username" :title="user.userInfo.username">{{ user.userInfo.username }}</div>
      <div class="sync">{{ syncStatus }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar-user {
  display: flex;
  align-items: center;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;

  .avatar {
    width: 45px;
    height: 45px;
    background-color: red;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .info {
    margin-left: 8px;
    width: 0;
    flex: auto;
    .username {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sync {
      font-size: 12px;
    }
  }
}
</style>
