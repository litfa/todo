<script setup lang="ts">
import { useLogin } from './useLogin'
import { loginMethod } from '@ltfei/todo-common'

defineOptions({
  name: 'LoginForm'
})

const { loginMethods, qrCode, view, checkTips } = await useLogin()
</script>

<template>
  <div class="login-form" :class="{ 'show-tips': view }">
    <div class="status" v-if="view" @click="checkTips">
      <component :is="view.icon" size="40" />
      <div class="icon"></div>
      <div class="info">{{ view.info }}</div>
      <div class="tips">{{ view.tips }}</div>
    </div>
    <div class="content">
      <a-image
        class="qrcode"
        :src="qrCode"
        :preview="false"
        v-if="qrCode && loginMethods.includes(loginMethod.wxMiniprogram)"
      >
        <template #placeholder>
          <a-spin />
        </template>
      </a-image>
      <div class="qrcode" v-else>
        <a-spin />
      </div>
      <button v-if="loginMethods.includes(loginMethod.qqConnect)" class="qq">QQ登录</button>
      <button v-if="loginMethods.includes(loginMethod.wxOpen)" class="wx">微信登录</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-form {
  border-radius: 4px;
  overflow: hidden;
  width: 220px;
  height: 160px;
  padding: 8px;
  gap: 8px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  .status {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: @black-opacity-6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    align-items: center;
    color: @white-opacity-8;
  }
  &.show-tips {
    .content {
      filter: blur(0.8px);
    }
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    :deep(.qrcode) {
      width: 120px;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .qq {
      --color: #009cff;
    }
    .wx {
      --color: #2aae67;
    }
    .qq,
    .wx {
      outline: none;
      border: none;
      color: #fff;
      padding: 8px 4px;
      border-radius: 8px;
      background-color: var(--color);
      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 1;
      }
    }
  }
}
</style>
