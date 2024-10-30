/**
 * tasks
 * 任务
 */

import { sequelize } from '../connect'
import { DataTypes, Model } from 'sequelize'
import { Task } from '@ltfei/todo-common'
import { UnderlineObjectKeys } from '../types'

type Table = UnderlineObjectKeys<Task>

export const Tasks = sequelize.define<Model<Table, Table>, Table>(
  'tasks',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    body: DataTypes.TEXT,
    is_imported: DataTypes.BOOLEAN,
    expiration_time: DataTypes.BIGINT,
    start_time: DataTypes.BIGINT,
    is_reminder_on: DataTypes.BOOLEAN,
    parent_folder_id: DataTypes.BIGINT,
    is_repeat: DataTypes.BOOLEAN,
    repetition_period: DataTypes.CHAR,
    reminder_date_time: DataTypes.BIGINT,
    owner: DataTypes.INET,
    created_with_local_id: {
      type: DataTypes.CHAR,
      unique: true
    },
    subject: DataTypes.CHAR,
    status: DataTypes.INTEGER,
    created_time: DataTypes.BIGINT,
    completed_date_time: DataTypes.BIGINT,
    last_edit_time: DataTypes.BIGINT
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
