<script setup lang="ts">
import LoginCard from './components/LoginCard.vue'
defineOptions({
  name: 'LoginPageMobile'
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

<style lang="less" scoped></style>
