<script setup lang="ts">
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useSideBar } from './useSideBar'
import MoreButton from './components/MoreButton.vue'

defineOptions({
  name: 'SideBar'
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { isSynchronizing, sideBarItems, sync } = useSideBar()
</script>

<template>
  <div class="side-bar">
    <div class="top">
      <div class="user">
        <div class="avatar">
          <user-avatar :src="user.userInfo?.avatar" :username="user.userInfo?.username" />
        </div>
      </div>
      <div class="side-bar-item" v-for="i in sideBarItems" :key="i.key">
        <a-tooltip placement="right" :mouse-enter-delay="1">
          <template #title>
            <span>{{ i.title }}</span>
          </template>
          <component
            v-if="$route.path.startsWith(i.key)"
            :is="i.icon"
            size="20"
            theme="filled"
            fill="var(--primary)"
          />
          <component v-else :is="i.icon" size="20" @click="$router.push(i.key)" />
        </a-tooltip>
      </div>
    </div>
    <div class="footer">
      <div class="item" :class="{ 'is-synchronizing': isSynchronizing }" @click="sync">
        <a-tooltip placement="right" :mouse-enter-delay="1">
          <template #title>
            <span>立即同步</span>
          </template>
          <IconRefresh size="20" />
        </a-tooltip>
      </div>
      <div class="item">
        <MoreButton />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.i-icon {
  display: flex;
}
.side-bar {
  width: 58px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 0;
  box-sizing: border-box;
  border-right: 1px solid @black-opacity-1;
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    .user {
      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      &.is-synchronizing {
        animation: rotate 1.2s infinite;
      }
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
