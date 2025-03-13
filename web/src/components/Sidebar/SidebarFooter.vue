<script setup lang="ts">
// import { useTasksListStore } from '@/stores/'
import { todoSdk } from '@/utils/useTodoSdk'

defineOptions({
  name: 'SidebarFooter'
})

// const tasksList = useTasksListStore()

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

  // todo: 创建待办列表
  // todoSdk.createList(name.value)
  name.value = ''
  open.value = false
}
</script>

<template>
  <div class="sidebar-footer">
    <div class="create-list" @click="createList">
      <div class="icon">
        <icon-plus />
      </div>
      新建列表
    </div>
    <div class="create-group icon">
      <icon-folder-plus />
    </div>
  </div>

  <a-modal
    v-model:open="open"
    title="新建列表"
    ok-text="新建列表"
    cancel-text="取消"
    @ok="submitCreateList"
  >
    <a-input v-model:value="name" placeholder="输入列表标题" ref="nameInputRef" />
  </a-modal>
</template>

<style lang="less" scoped>
.sidebar-footer {
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
