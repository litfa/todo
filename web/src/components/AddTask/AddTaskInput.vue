<script setup lang="ts">
import i18n from '@/lang'

const { t } = i18n.global

const props = withDefaults(
  defineProps<{
    placeholder?: string
    iconSize?: number
  }>(),
  {
    iconSize: 22
  }
)
defineOptions({
  name: 'AddTaskInput'
})
const emit = defineEmits<{
  addTask: [value: string, clearInput: () => void]
}>()

const text = defineModel<string>({ default: '' })

const iconSizePx = computed(() => props.iconSize + 8 + 'px')

const submit = () => {
  const clearInput = () => {
    text.value = ''
  }
  emit('addTask', text.value, clearInput)
}
</script>

<template>
  <div class="add-task-input">
    <input
      type="text"
      class="task-name"
      :placeholder="placeholder || t('add_task')"
      v-model="text"
      @keydown.stop.enter="submit"
    />
    <icon-round :size="iconSize" class="icon-radio" />
    <icon-plus :size="iconSize" class="icon-add" />
  </div>
</template>

<style lang="less" scoped>
.i-icon {
  display: flex;
}

.add-task-input {
  width: 100%;
  height: 40px;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  position: relative;

  .icon-radio,
  .icon-add {
    // font-size: 22px;
    position: absolute;
    left: 8px;
    transition: all 0.05s linear;
  }
  .icon-radio {
    opacity: 0;
  }
  .task-name {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    // margin-left: 30px;
    margin-left: v-bind(iconSizePx);
    font-size: 14px;
    &::placeholder {
      color: @text-color;
    }
    &:focus ~ .icon-add {
      opacity: 0;
    }
    &:focus ~ .icon-radio {
      opacity: 1;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
}
</style>
