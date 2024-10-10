<script setup lang="ts">
import { keys } from '@ltfei/todo-common'
import { useTasksStore, useTasksListStore } from '@/stores/'
import AddTaskInput from '@/components/AddTask/AddTaskInput.vue'
import { generateId } from '@/utils/snowflake'
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

const task = computed(() => tasksStore.tasks.find((e) => e.id == props.taskId)!)

const checked = computed({
  get() {
    return task.value?.status == keys.task.status.completed
  },
  set(value) {
    task.value.status = value ? keys.task.status.completed : keys.task.status.notStarted
  }
})

const addTask = (value: string, clearInput: () => void) => {
  const id = generateId()
  task.value.subtasks.push({
    parentId: task.value.id,
    id,
    createdWithLocalId: id,
    subject: value,
    status: 0,
    createdTime: Date.now(),
    completedDateTime: 0,
    lastEditTime: 0
  })

  clearInput()
}

const deleteSubTask = (id: string) => {
  const i = task.value.subtasks.findIndex((e) => e.id == id)

  return new Promise((resolve) => {
    Modal.confirm({
      title: '删除步骤',
      content: `将永久删除 ${task.value.subtasks[i].subject}`,
      onOk() {
        task.value.subtasks.splice(i, 1)
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
  const subTask = task.value.subtasks.find((e) => e.id == id)

  if (!subTask) {
    return
  }
  if (!subTask.subject) {
    const result = await deleteSubTask(subTask.id)
    if (!result) {
      subTask.subject = originSubject.get(subTask.id)!
    }
  }
}

const textareaBlur = () => {
  if (!task.value.subject) {
    task.value.subject = originSubject.get(task.value.id)!
  }
}
</script>

<template>
  <div class="editor" v-if="task">
    <div class="task">
      <task-radio v-model="task.status" />
      <!-- todo: 封装禁止换行的文本域 -->
      <a-textarea
        v-model:value.lazy="task.subject"
        auto-size
        :bordered="false"
        @focus="focus(task.id, task.subject)"
        @blur="textareaBlur"
        size="large"
      />
    </div>
    <div class="sub-task" v-for="i in task?.subtasks" :key="i.id">
      <task-radio v-model:status="i.status" />
      <a-textarea
        v-model:value="i.subject"
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
