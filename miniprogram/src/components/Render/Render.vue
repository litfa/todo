<script setup lang="ts">
import './render.less'

defineOptions({
  name: 'Render'
})

const props = defineProps<{
  text: string
}>()
</script>

<template>
  <!-- {{ html }} -->
  <div class="render" v-html="text"></div>
</template>

<style lang="less" scoped></style>
