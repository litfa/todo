<script setup lang="ts">
import { useLogin } from './useLogin'
import { loginMethod } from '@ltfei/todo-common'

defineOptions({
  name: 'LoginForm'
})

const { loginMethods, qrCode } = await useLogin()
</script>

<template>
  <div class="login-form">
    <a-image :src="qrCode" alt="" v-if="loginMethods.includes(loginMethod.wxMiniprogram)">
      <template #placeholder>
        <a-spin />
      </template>
    </a-image>
    <button v-if="loginMethods.includes(loginMethod.qqConnect)" class="qq">QQ登录</button>
    <button v-if="loginMethods.includes(loginMethod.wxOpen)" class="wx">微信登录</button>
  </div>
</template>

<style lang="less" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  width: 180px;
  gap: 8px;
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
    padding: 8px 0;
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
</style>
