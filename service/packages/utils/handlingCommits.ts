import { Commit, Update, Delete, Create, keys, Task } from '@ltfei/todo-common'
import {
  Tasks,
  Commits,
  SubTasks,
  TaskList,
  SubTasksTable,
  TaskListTable,
  TasksTable,
  sequelize
} from '@/db/'
import { Model, ModelStatic, Transaction } from 'sequelize'
import { generateId, generateIdString, parse10RadixId } from '@/utils/snowflake'
import { convertKeysToSnakeCase, convertKeysToCamelCase } from './camelToSnakeCase'
import cronParser from 'cron-parser'
import { CamelObjectKeys } from '@/db/types'
import { app as logger } from '@/utils/log'

type Table = SubTasksTable | TaskListTable | TasksTable

type Result =
  | {
      commitId: string
      err: true
    }
  | {
      commitId: string
      err: false
      value: string | number
    }

/**
 * 处理commit
 * todo: 验证数据
 * @param commits
 */
export const handlingCommits = async (
  commits: Commit[]
): Promise<{
  errCount: number
  results: Result[]
}> => {
  const results = await Promise.all(
    commits.map((commit) => {
      return handlingCommit(commit)
    })
  )

  return {
    results,
    errCount: results.reduce((previousValue, currentValue) => {
      return currentValue.err ? previousValue + 1 : previousValue
    }, 0)
  }
}

/**
 * 更新数据
 * 处理重复任务
 * 创建commit
 */
const handlingCommit = async (commit: Commit, t?: Transaction): Promise<Result> => {
  const notCommit = Boolean(t)
  t = t || (await sequelize.transaction())

  let err = false
  let value: string | number

  try {
    value = await updateData(commit, t)

    if (commit.operation == Create) {
      commit.data.id = value as string
    }

    await handlingRepeatTask(commit, t)
    await insertCommit(commit, t)
    if (notCommit) {
      return
    }
    await t.commit()
  } catch (e) {
    logger.error(e)
    await t.rollback()
    err = true
  }

  if (err) {
    return {
      err,
      commitId: commit.commitId
    }
  }
  return {
    value,
    err,
    commitId: commit.commitId
  }
}

/**
 * 获取对应的数据库实例
 */
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

/**
 * 更新数据
 * todo: 任务列表验证用户权限
 */
const updateData = async (commit: Commit, t: Transaction): Promise<number | string> => {
  const model: ModelStatic<Model<Table>> = getModel(commit.targetTable)
  if (commit.operation == Create) {
    const result = await model.create(
      {
        ...convertKeysToSnakeCase(commit.data),
        id: generateId(),
        owner: commit.user
      },
      { transaction: t }
    )
    return result.toJSON().id.toString()
  } else if (commit.operation == Delete) {
    const result = await model.destroy({
      where: {
        id: parse10RadixId(commit.data.id),
        owner: commit.user
      },
      transaction: t
    })
    return result
  } else if (commit.operation == Update) {
    const { id, ...data } = commit.data

    const [result] = await model.update(
      { ...convertKeysToSnakeCase(data) },
      {
        where: {
          id: parse10RadixId(id),
          owner: commit.user
        },
        transaction: t
      }
    )
    return result
  }
}

/**
 * 通过id获取task
 */
const getTaskById = async (id: string | bigint, t: Transaction) => {
  const task = await Tasks.findOne({
    where: {
      id
    },
    transaction: t
  })

  return task?.toJSON()
}

/**
 * 创建重复任务
 */
const createRepeatCommit = async (task: CamelObjectKeys<TasksTable>, t: Transaction) => {
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
      },
      transaction: t
    }
  )

  await handlingCommit(commit, t)
}

/**
 * 处理重复数据
 */
const handlingRepeatTask = async (commit: Commit, t: Transaction) => {
  // 重复任务创建新的
  if (
    commit.operation == Update &&
    commit.targetTable == 'tasks' &&
    commit.data.status == keys.task.status.completed
  ) {
    const task = await getTaskById(parse10RadixId(commit.data.id), t)

    if (task && task.is_repeat && !task.next_repeat_task_id) {
      await createRepeatCommit(convertKeysToCamelCase(task), t)
    }
  }
}

/**
 * 创建commit
 */
const insertCommit = async (commit: Commit, t: Transaction) => {
  await Commits.create(
    {
      ...convertKeysToSnakeCase(commit),
      commit_id: parse10RadixId(commit.commitId),
      data: JSON.stringify({
        ...commit.data,
        id: commit.data.id.toString()
      }),
      sync_time: Date.now()
    },
    {
      transaction: t
    }
  )
}
