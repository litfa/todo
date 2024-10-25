<script setup lang="ts">
import { Round as IconRound, CheckOne as IconCheckOne } from '@icon-park/vue-next'

defineOptions({
  name: 'SwitchButton'
})

const checked = defineModel('checked', {
  required: true,
  default: true
})
</script>

<template>
  <div class="switch" :class="{ checked }" @click.stop="checked = !checked">
    <slot name="default" v-if="!$slots.checked || !checked" :checked>
      <IconRound v-show="!checked" />
      <IconCheckOne v-show="checked" />
    </slot>
    <slot name="checked" v-if="checked"> </slot>
  </div>
</template>

<style lang="less" scoped></style>
