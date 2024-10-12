/**
 * tasks
 * 任务
 */

import { sequelize } from '../connect'
import { DataTypes, Model } from 'sequelize'
import { TaskList as TaskListType } from '@ltfei/todo-common'
import { UnderlineObjectKeys } from '../types'

type Table = UnderlineObjectKeys<TaskListType>

export const TaskList = sequelize.define<Model<Table, Table>, Table>(
  'task_list',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    owner: DataTypes.INET,
    created_with_local_id: DataTypes.CHAR,
    status: DataTypes.INTEGER,
    created_time: DataTypes.BIGINT,
    is_shared_folder: DataTypes.BOOLEAN,
    name: DataTypes.CHAR,
    sharing_link: DataTypes.CHAR,
    show_completed_tasks: DataTypes.BOOLEAN,
    sort_ascending: DataTypes.BOOLEAN,
    sort_type: DataTypes.CHAR,
    theme_background: DataTypes.CHAR,
    theme_color: DataTypes.CHAR,
    parent_folder_group_id: DataTypes.BIGINT
  },
  {
    timestamps: false,
    indexes: [
      {
        fields: ['id'],
        unique: true
      }
    ]
  }
)
