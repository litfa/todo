<script setup lang="ts">
defineOptions({
  name: 'DevSetting'
})

const baseUrl = computed({
  get() {
    return localStorage.getItem('baseUrl') || ''
  },
  set(value) {
    localStorage.setItem('baseUrl', value)
  }
})
const token = computed({
  get() {
    return localStorage.getItem('token') || ''
  },
  set(value) {
    localStorage.setItem('token', value)
  }
})
</script>

<template>
  <div class="dev-setting">
    开发设置，仅用于调试，修改实时保存，刷新后生效
    <a-form name="basic" layout="vertical" autocomplete="off">
      <a-form-item label="baseUrl" name="username">
        <a-input v-model:value="baseUrl" />
      </a-form-item>
      <a-form-item label="token" name="username">
        <a-textarea v-model:value="token" :rows="6" />
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped></style>
