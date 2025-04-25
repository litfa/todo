<script setup lang="ts">
import type { Icon } from '@icon-park/vue-next/lib/runtime'

defineOptions({
  name: 'WxMiniprogram'
})

defineProps<{
  qrCode: string
  lodaing: boolean
  view?: {
    info?: string
    tips?: string
    icon?: Icon
  }
  checkTips: () => void
}>()
</script>

<template>
  <div class="wx-miniprogram">
    <div class="status" v-if="view" @click="checkTips">
      <component :is="view.icon" size="40" />
      <div class="icon"></div>
      <div class="info">{{ view.info }}</div>
      <div class="tips">{{ view.tips }}</div>
    </div>
    <div class="qrcode" v-if="lodaing">
      <a-spin />
    </div>
    <a-image v-else class="qrcode" :src="qrCode" :preview="false">
      <template #placeholder>
        <a-spin />
      </template>
    </a-image>
  </div>
</template>

<style lang="less" scoped>
.wx-miniprogram {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 150px;
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
  :deep(.qrcode) {
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
