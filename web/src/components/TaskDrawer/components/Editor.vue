<script setup lang="ts">
import AddTaskInput from '@/components/AddTask/AddTaskInput.vue'
import TaskRadio from '@/components/TaskRadio/TaskRadio.vue'
import { useUserStore } from '@/stores/'
import { todoSdk } from '@/utils/useTodoSdk'
import { generateIdWithSource, keys } from '@ltfei/todo-common'
import { Modal } from 'ant-design-vue'

defineOptions({
  name: 'TaskEditor'
})

const props = defineProps<{
  taskId: string
}>()

const userStore = useUserStore()

const task = computed(() => todoSdk.data.tasks.value.find((e) => e.id == props.taskId)!)
const subTasks = computed(() =>
  todoSdk.data.subTasks.value.filter((e) => e.parentId == props.taskId)
)

const addTask = (value: string, clearInput: () => void) => {
  const id = generateIdWithSource()
  todoSdk.subTask.action('create', {
    parentId: task.value.id,
    id,
    createdWithLocalId: id,
    subject: value,
    status: keys.task.status.notStarted,
    createdTime: Date.now(),
    completedDateTime: 0,
    lastEditTime: 0,
    isImported: false,
    owner: userStore.user.userInfo!.id
  })

  clearInput()
}

const deleteSubTask = (id: string) => {
  const subTask = todoSdk.data.subTasks.value.find((e) => e.id == id)!

  return new Promise((resolve) => {
    Modal.confirm({
      title: '删除步骤',
      content: `将永久删除 ${subTask.subject}`,
      onOk() {
        todoSdk.subTask.action('delete', { id })
        resolve(true)
      },
      onCancel() {
        resolve(false)
      }
    })
  })
}

const originSubject = new Map<string, string>()

const focus = (id: string, subject: string) => {
  originSubject.set(id, subject)
}
const subTaskTextareaBlur = async (id: string) => {
  const subTask = todoSdk.data.subTasks.value.find((e) => e.id == id)

  if (!subTask) {
    return
  }
  if (!subTask.subject) {
    const result = await deleteSubTask(subTask.id)
    if (!result) {
      todoSdk.subTask.action('update', {
        id,
        subject: originSubject.get(subTask.id)!
      })
    }
  }
}

const textareaBlur = () => {
  if (!task.value.subject) {
    todoSdk.task.action('update', {
      id: task.value.id,
      subject: originSubject.get(task.value.id)!
    })
  }
}

const updateTaskSubject = (value: string) => {
  todoSdk.task.action('update', {
    id: task.value.id,
    subject: value
  })
}

const updateTaskStatus = (value: number) => {
  todoSdk.task.action('update', {
    id: task.value.id,
    status: value,
    completedDateTime: Date.now()
  })
}
const updateSubTaskStatus = (id: string, value: number) => {
  todoSdk.subTask.action('update', {
    id,
    status: value
  })
}
const updateSubTaskSubject = (id: string, value: string) => {
  todoSdk.subTask.action('update', {
    id,
    subject: value
  })
}
</script>

<template>
  <div class="editor" v-if="task">
    <div class="task">
      <task-radio :status="task.status" @update:status="updateTaskStatus" />
      <!-- todo: 封装禁止换行的文本域 -->
      <a-textarea
        :value="task.subject"
        @update:value="updateTaskSubject"
        auto-size
        :bordered="false"
        @focus="focus(task.id, task.subject)"
        @blur="textareaBlur"
        size="large"
      />
    </div>
    <div class="sub-task" v-for="i in subTasks" :key="i.id">
      <task-radio :status="i.status" @update:status="(value) => updateSubTaskStatus(i.id, value)" />
      <a-textarea
        :value="i.subject"
        @update:value="(value) => updateSubTaskSubject(i.id, value)"
        auto-size
        :bordered="false"
        @focus="focus(i.id, i.subject)"
        @blur="subTaskTextareaBlur(i.id)"
      />

      <a-popover :arrow="false" placement="bottomRight" trigger="click">
        <template #content>
          <div class="task-tooltip-content">
            <a-button danger @click="deleteSubTask(i.id)">
              <template #icon>
                <icon-delete />
              </template>
              删除步骤
            </a-button>
          </div>
        </template>

        <div class="icon">
          <icon-more-one />
        </div>
      </a-popover>
    </div>

    <div class="add-task">
      <AddTaskInput :placeholder="$t('next_step')" :icon-size="14" @add-task="addTask" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.i-icon {
  display: flex;
}

.task-tooltip-content {
  // width: 200px;
  :deep(.ant-btn) {
    display: flex;
    align-items: center;
  }
}

.editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #aaaaaa45;
  padding: 8px;
  border-radius: 4px;
  .task {
    :deep(textarea) {
      font-weight: bold;
      // font-size: 16px;
    }
  }
  .sub-task {
    border-bottom: 1px solid #aaaaaa2e;
  }
  .task,
  .sub-task {
    display: flex;
    align-items: center;
    .task-radio {
      width: 32px;
      display: flex;
      justify-content: center;
    }
    .input {
      flex: 1;
      line-height: 18px;
      font-size: 18px;
    }
    // .icon {
    //   width: 25px;
    //   height: 25px;
    //   padding: 5px;
    //   box-sizing: border-box;
    //   border-radius: 4px;
    //   display: flex;
    //   justify-content: center;
    //   &:hover {
    //     background-color: #aaaaaa28;
    //   }
    // }
  }
}
</style>
