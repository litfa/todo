<script setup lang="ts">
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'AccountSetting'
})

const userStore = useUserStore()
userStore.getUserInfo()
const { user } = storeToRefs(userStore)
</script>

<template>
  <template v-if="user.isLogin && user.userInfo">
    <div class="account-setting">账户配置</div>
    <div class="userinfo">
      <a-avatar :src="user.userInfo.avatar" :size="64"></a-avatar>
      <div class="username">{{ user.userInfo.username }}</div>
    </div>
    <a-form class="form">
      <a-form-item label="微信">
        <span>{{ user.userInfo.wxOpenid }}</span>
        <!-- <a-button disabled>检查更新</a-button> -->
      </a-form-item>
      <a-form-item label="QQ">
        <span>{{ user.userInfo.qqOpenid ? '已绑定' : '未绑定' }}</span>
      </a-form-item>
      <a-form-item label="账号管理">
        <a-button disabled type="link" danger>注销账号</a-button>
      </a-form-item>
    </a-form>
  </template>
</template>

<style lang="less" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
