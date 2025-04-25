<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'
import { auth } from '@/apis/'
import { message } from 'ant-design-vue'
import { setToken } from '@/utils/auth'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'AccountLogin'
})

const formState = reactive({
  account: '',
  password: ''
})
const router = useRouter()

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const rules: Record<string, Rule[]> = {
  account: [
    { required: true, message: '请输入邮箱!' },
    {
      validator(_, value) {
        if (!emailRegexp.test(value)) {
          return Promise.reject()
        }
        return Promise.resolve()
      },
      message: '请输入正确的邮箱'
    }
  ],
  password: [
    { required: true, message: '请输入密码!' },
    {
      min: 4,
      max: 30,
      message: '密码错误'
    }
  ]
}

const onFinish = async () => {
  const res = await auth.accountLogin(formState.account, formState.password)

  if (res.status != 200) {
    return message.error(res.msg)
  }

  setToken(res.data)
  message.success('登录成功')
  setTimeout(() => {
    router.replace('/')
  }, 1000)
}
</script>

<template>
  <div class="account-login">
    <a-form :model="formState" @finish="onFinish" :rules="rules">
      <a-form-item label="邮箱" name="account">
        <a-input v-model:value="formState.account" autocomplete="account" />
      </a-form-item>

      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password" autocomplete="current-password" />
      </a-form-item>

      <a-form-item>
        <a-button class="login" type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 100%;
}
</style>
