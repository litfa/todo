import { Commit, Update, Delete, Create } from '@ltfei/todo-common'
import { Tasks, Commits, SubTasks, TaskList } from '@/db/'
import { Model, ModelStatic } from 'sequelize'
import { generateId } from '@/utils/snowflake'
import { convertKeysToSnakeCase } from './camelToSnakeCase'

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
  commitId: string
  value: number | string
}> => {
  const model: ModelStatic<Model<any>> = getModel(commit.targetTable)
  if (commit.operation == Create) {
    const result = await model.create({
      ...convertKeysToSnakeCase(commit.data),
      id: generateId(),
      owner: commit.user
    })
    return {
      commitId: commit.commitId,
      value: result.toJSON().id
    }
  } else if (commit.operation == Delete) {
    const result = await model.destroy({
      where: {
        id: commit.data.id,
        owner: commit.user
      }
    })
    return {
      commitId: commit.commitId,
      value: result
    }
  } else if (commit.operation == Update) {
    const [result] = await model.update(
      { ...convertKeysToSnakeCase(commit.data) },
      {
        where: {
          id: commit.data.id,
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
export const handlingCommits = async (commit: Commit<any>) => {
  const result = await updateData(commit)

  if (commit.operation == Create) {
    commit.data.id = result.value
  }

  await Commits.create({
    ...convertKeysToSnakeCase(commit),
    commit_id: parseInt(commit.commitId, 36),
    data: JSON.stringify(commit.data),
    sync_time: Date.now()
  })

  return result
}
