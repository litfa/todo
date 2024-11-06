<script setup lang="ts">
import { getVersion } from '@/utils/getVersion'

defineOptions({
  name: 'AboutSetting'
})
console.log()
const version = getVersion()
</script>

<template>
  <div class="about-setting">
    <a-form class="form">
      <a-form-item label="版本信息">
        <span>{{ version }}</span>
        <a-button disabled>检查更新</a-button>
      </a-form-item>
      体验版本，不代表最终品质
    </a-form>

    <footer>©2024 ltfei all rights reserved.</footer>
  </div>
</template>

<style lang="less" scoped>
.about-setting {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  box-sizing: border-box;
  footer {
    width: 100%;
    text-align: center;
    margin-top: auto;
  }
}
</style>
