<script setup lang="ts">
import type { AvatarSize } from 'ant-design-vue/es/avatar'

defineOptions({
  name: 'UserAvatar'
})

defineProps<{
  src?: string
  username?: string
  size?: AvatarSize
}>()
</script>

<template>
  <div class="user-avatar">
    <a-avatar :src="src" :size="size">
      {{ username?.substring(0, 4) }}
    </a-avatar>
  </div>
</template>

<style lang="less" scoped>
.user-avatar {
  // width: 100%;
  height: 100%;
}
.ant-avatar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
