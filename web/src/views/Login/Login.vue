<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'

defineOptions({
  name: 'LoginPage'
})
</script>

<template>
  <div class="login">
    <div class="login-card">
      <div class="logo">
        <img src="@/assets/images/logo.png" class="logo-img" alt="logo" />
        <h2>欢迎使用 ToDo</h2>
      </div>
      <Suspense>
        <LoginForm />
        <template #fallback>
          <a-spin />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: @bg-color-page;

  .login-card {
    padding: 16px;
    background-color: @bg-color;
    display: flex;
    // flex-direction: column;
    gap: 40px;
    border-radius: 8px;

    .logo {
      width: 100%;
      h2 {
        font-size: 18px;
        width: 100%;
      }
      .logo-img {
        width: 60px;
      }
    }
  }
}
</style>
