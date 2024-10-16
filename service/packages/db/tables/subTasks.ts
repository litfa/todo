/**
 * tasks
 * 任务
 */

import { sequelize } from '../connect'
import { DataTypes, Model } from 'sequelize'
import { SubTask } from '@ltfei/todo-common'
import { UnderlineObjectKeys } from '../types'

type Table = UnderlineObjectKeys<SubTask>

export const SubTasks = sequelize.define<Model<Table, Table>, Table>(
  'sub_tasks',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    is_imported: DataTypes.BOOLEAN,
    created_with_local_id: DataTypes.CHAR,
    subject: DataTypes.CHAR,
    status: DataTypes.INTEGER,
    created_time: DataTypes.BIGINT,
    completed_date_time: DataTypes.BIGINT,
    last_edit_time: DataTypes.BIGINT,
    parent_id: DataTypes.BIGINT,
    owner: DataTypes.BIGINT
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
