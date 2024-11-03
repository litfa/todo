import { Commit, Update, Delete, Create, keys, Task } from '@ltfei/todo-common'
import { Tasks, Commits, SubTasks, TaskList } from '@/db/'
import { Model, ModelStatic } from 'sequelize'
import { generateId, generateIdString, parse10RadixId } from '@/utils/snowflake'
import { convertKeysToSnakeCase, convertKeysToCamelCase } from './camelToSnakeCase'
import cronParser from 'cron-parser'

const getModel = (table: Commit<any>['targetTable']): ModelStatic<Model<any>> => {
  switch (table) {
    case 'tasks':
      return Tasks
    case 'subTasks':
      return SubTasks
    case 'taskList':
      return TaskList
  }
}
// todo: 添加任务时判断任务列表是否有权限
const updateData = async (
  commit: Commit<any>
): Promise<{
  commitId: string | bigint
  value: number | string
}> => {
  // commit.data.id = parse10RadixId(commit.data.id)

  const model: ModelStatic<Model<any>> = getModel(commit.targetTable)
  if (commit.operation == Create) {
    const result = await model.create({
      ...convertKeysToSnakeCase(commit.data),
      id: generateId().toString(),
      owner: commit.user
    })
    return {
      commitId: commit.commitId,
      value: result.toJSON().id
    }
  } else if (commit.operation == Delete) {
    const result = await model.destroy({
      where: {
        id: parse10RadixId(commit.data.id),
        owner: commit.user
      }
    })
    return {
      commitId: commit.commitId,
      value: result
    }
  } else if (commit.operation == Update) {
    // console.log('update', parse10RadixId(commit.data.id))
    const { id, ...data } = commit.data

    const [result] = await model.update(
      { ...convertKeysToSnakeCase(data) },
      {
        where: {
          id: parse10RadixId(id),
          owner: commit.user
        }
      }
    )
    return {
      commitId: commit.commitId,
      value: result
    }
  }
}

/**
 * 处理commit
 * @returns
 * - create: value is insertId
 * - delete/update : value is affectedCount
 */
export const handlingCommits = async (commit: Commit) => {
  const result = await updateData(commit)

  if (commit.operation == Create) {
    console.log(result.value)

    // @ts-ignore
    commit.data.id = parse10RadixId(result.value)
    console.log(parse10RadixId(result.value))
  }

  // 重复任务创建新的
  if (
    commit.operation == Update &&
    commit.targetTable == 'tasks' &&
    commit.data.status == keys.task.status.completed
  ) {
    console.log('创建新任务', commit.data.id)

    const task = await getTaskById(parse10RadixId(commit.data.id))
    console.log(task)

    if (task && task.is_repeat && !task.next_repeat_task_id) {
      console.log('create commit')

      await createRepeatCommit(convertKeysToCamelCase(task))
    }
  }

  console.log(commit.data)

  await Commits.create({
    ...convertKeysToSnakeCase(commit),
    // @ts-ignore
    commit_id: parse10RadixId(commit.commitId),
    data: JSON.stringify({
      ...commit.data,
      id: commit.data.id.toString()
    }),
    sync_time: Date.now()
  })

  return result
}

const getTaskById = async (id: string | bigint) => {
  console.log(id)

  const task = await Tasks.findOne({
    // @ts-ignore
    where: {
      id
    }
  })

  return task?.toJSON()
}

const createRepeatCommit = async (task: Task) => {
  const taskId = generateIdString()

  const interval = cronParser.parseExpression(task.repetitionPeriod, {
    currentDate: task.expirationTime
  })

  const expirationTime = interval.next().toDate().valueOf()
  const diff = expirationTime - task.expirationTime

  const getNewTime = (current: number) => {
    return current == 0 ? 0 : current + diff
  }

  const newTask: Task = {
    ...task,
    id: taskId,
    createdWithLocalId: taskId,
    lastEditTime: 0,
    expirationTime,
    startTime: getNewTime(task.startTime),
    reminderDateTime: getNewTime(task.reminderDateTime),
    status: keys.task.status.notStarted,
    completedDateTime: 0
  }

  const commit: Commit<Task> = {
    commitId: generateIdString(),
    operation: 'create',
    targetTable: 'tasks',
    source: '',
    user: task.owner,
    data: newTask,
    createdTime: Date.now(),
    lastEditTime: 0
  }

  await Tasks.update(
    {
      next_repeat_task_id: newTask.id.toString()
    },
    {
      where: {
        id: task.id
      }
    }
  )

  handlingCommits(commit)
}
