<script setup lang="ts">
import SettingMenu from './components/SettingMenu.vue'

defineOptions({
  name: 'MobilePage'
})
</script>

<template>
  <div class="mobie-page">
    <SettingMenu use-router :default-keys="[]" />
  </div>
</template>

<style lang="less" scoped></style>
