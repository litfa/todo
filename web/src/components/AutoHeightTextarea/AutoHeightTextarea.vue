<!-- todo: -->
<script setup lang="ts">
defineOptions({
  name: 'AutoHeightTextarea'
})

const inputRef = ref<null | HTMLTextAreaElement>(null)

const value = defineModel<string>()

watch(value, () => {
  if (!inputRef.value) {
    return
  }
  // const { scrollHeight } = inputRef.value
})
</script>

<template>
  <div class="auto-height-textarea">
    <textarea ref="inputRef" v-model="value"></textarea>
  </div>
</template>

<style lang="less" scoped>
// .auto-height-textarea {
// }
</style>
