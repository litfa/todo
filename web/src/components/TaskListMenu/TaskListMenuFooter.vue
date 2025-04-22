<script setup lang="ts">
import { todoSdk } from '@/utils/useTodoSdk'

defineOptions({
  name: 'TaskListMenuFooter'
})

const name = ref('')
const nameInputRef = ref<HTMLElement | null>(null)
const open = ref(false)

const createList = () => {
  name.value = ''
  open.value = true
  nextTick(() => {
    nameInputRef.value?.focus()
  })
}

const submitCreateList = () => {
  console.log(name.value)

  if (!name.value) {
    return
  }

  todoSdk.taskList.createList(name.value)
  name.value = ''
  open.value = false
}
</script>

<template>
  <div class="task-list-menu-footer">
    <div class="create-list" @click="createList">
      <div class="icon">
        <icon-plus />
      </div>
      {{ $t('create_task_list') }}
    </div>
    <div class="create-group icon">
      <icon-folder-plus />
    </div>
  </div>

  <a-modal
    v-model:open="open"
    :title="$t('create_task_list')"
    :ok-text="$t('create')"
    :cancel-text="$t('cancel')"
    @ok="submitCreateList"
  >
    <a-input v-model:value="name" :placeholder="$t('enter_list_title')" ref="nameInputRef" />
  </a-modal>
</template>

<style lang="less" scoped>
.task-list-menu-footer {
  display: flex;
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
  .create-list {
    flex: 1;
    display: flex;
    align-items: center;

    cursor: pointer;
    &:hover {
      background-color: @black-opacity-1;
      transition: all 0.1s;
    }
  }
}
</style>
