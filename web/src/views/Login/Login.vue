<script setup lang="ts">
import LoginCard from './components/LoginCard.vue'
defineOptions({
  name: 'LoginPage'
})
</script>

<template>
  <div class="login">
    <Suspense>
      <LoginCard />
      <template #fallback>
        <a-spin />
      </template>
    </Suspense>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: @bg-color-page;
  .min-width(500px, {
    .login-card {
      flex-direction: column
    }
  });
}
</style>
