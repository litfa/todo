<script setup lang="ts">
import { useLogin } from './useLogin'
import { loginMethod } from '@ltfei/todo-common'
import type { ValueOf } from '@/types'
import WxMiniprogram from './WxMiniprogram.vue'
import AccountLogin from './AccountLogin.vue'

defineOptions({
  name: 'LoginCard'
})

const { loginMethods, qrCode, view, checkTips } = await useLogin()

const loginMethodsButton = computed(() => {
  return [
    {
      key: 'account',
      class: 'account',
      text: '账号密码登录',
      show: loginMethods.value.includes(loginMethod.account),
      onClick: () => {
        currentLoginMethod.value = 'account'
      }
    },
    {
      key: 'qq_connect',
      class: 'qq',
      text: 'QQ登录',
      show: loginMethods.value.includes(loginMethod.qqConnect),
      onClick: () => {}
    },
    {
      key: 'wx_miniprogram',
      class: 'wx',
      text: '微信登录',
      show: loginMethods.value.includes(loginMethod.wxMiniprogram),
      onClick: () => {
        currentLoginMethod.value = 'wx_miniprogram'
      }
    }
  ]
})

const currentLoginMethod = ref<ValueOf<typeof loginMethod>>('account')
</script>

<template>
  <div class="login-card">
    <h2 class="title">登录</h2>
    <div class="content">
      <WxMiniprogram
        v-if="currentLoginMethod == 'wx_miniprogram'"
        :qr-code="qrCode!"
        :lodaing="!Boolean(qrCode)"
        :view="view"
        :checkTips
      />
      <AccountLogin v-if="currentLoginMethod == 'account'" />
    </div>

    <a-divider><span class="divider-text">其他登录方式</span></a-divider>

    <div class="login-methods">
      <button
        v-for="(i, index) in loginMethodsButton"
        v-show="i.show && i.key != currentLoginMethod"
        :key="index"
        :class="i.class"
        @click="i.onClick"
      >
        {{ i.text }}
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-card {
  display: flex;
  flex-direction: column;
  padding: 18px 16px;
  background-color: @bg-color;
  border-radius: 8px;
  min-width: 280px;
  .divider-text {
    font-size: 12px;
    color: @text-color-placeholder;
  }
  .title {
    margin-bottom: 24px;
  }
  .login-methods {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .qq {
      --color: #009cff;
    }
    .wx {
      --color: #2aae67;
    }
    button {
      outline: none;
      border: none;
      color: #fff;
      padding: 8px 4px;
      border-radius: 8px;
      background-color: var(--color, @primary);
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
