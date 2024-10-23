<script setup lang="ts">
import { keys } from '@ltfei/todo-common'
import { useTasksStore, useSubTasksStore } from '@/stores/'
import AddTaskInput from '@/components/AddTask/AddTaskInput.vue'
import { generateIdWithSource } from '@/utils/snowflake'
import TaskRadio from '@/components/TaskRadio/TaskRadio.vue'
import { MoreOne as IconMoreOne, Delete as IconDelete } from '@icon-park/vue-next'
import { Modal } from 'ant-design-vue'

defineOptions({
  name: 'TaskEditor'
})

const props = defineProps<{
  taskId: string
}>()

const tasksStore = useTasksStore()
const subTasksStore = useSubTasksStore()

const task = computed(() => tasksStore.tasks.find((e) => e.id == props.taskId)!)
const subTasks = computed(() => subTasksStore.subTasks.filter((e) => e.parentId == props.taskId))

const addTask = (value: string, clearInput: () => void) => {
  const id = generateIdWithSource()
  subTasksStore.action('create', {
    parentId: task.value.id,
    id,
    createdWithLocalId: id,
    subject: value,
    status: keys.task.status.notStarted,
    createdTime: Date.now(),
    completedDateTime: 0,
    lastEditTime: 0,
    isImported: false,
    owner: 1
  })

  clearInput()
}

const deleteSubTask = (id: string) => {
  const subTask = subTasksStore.subTasks.find((e) => e.id == id)!

  return new Promise((resolve) => {
    Modal.confirm({
      title: '删除步骤',
      content: `将永久删除 ${subTask.subject}`,
      onOk() {
        subTasksStore.action('delete', { id })
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
  const subTask = subTasksStore.subTasks.find((e) => e.id == id)

  if (!subTask) {
    return
  }
  if (!subTask.subject) {
    const result = await deleteSubTask(subTask.id)
    if (!result) {
      subTasksStore.action('update', {
        id,
        subject: originSubject.get(subTask.id)!
      })
    }
  }
}

const textareaBlur = () => {
  if (!task.value.subject) {
    tasksStore.action('update', {
      id: task.value.id,
      subject: originSubject.get(task.value.id)!
    })
  }
}

const updateTaskSubject = (value: string) => {
  tasksStore.action('update', {
    id: task.value.id,
    subject: value
  })
}

const updateTaskStatus = (value: number) => {
  tasksStore.action('update', {
    id: task.value.id,
    status: value
  })
}
const updateSubTaskStatus = (id: string, value: number) => {
  subTasksStore.action('update', {
    id,
    status: value
  })
}
const updateSubTaskSubject = (id: string, value: string) => {
  subTasksStore.action('update', {
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
      <AddTaskInput placeholder="下一步" :icon-size="14" @add-task="addTask" />
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
    .icon {
      width: 25px;
      height: 25px;
      padding: 5px;
      box-sizing: border-box;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      &:hover {
        background-color: #aaaaaa28;
      }
    }
  }
}
</style>
