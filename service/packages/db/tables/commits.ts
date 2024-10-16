/**
 * commits
 * 提交记录
 */

import { sequelize } from '../connect'
import { DataTypes, Model } from 'sequelize'
import { Commit } from '@ltfei/todo-common'
import { UnderlineObjectKeys } from '../types'

type Table = UnderlineObjectKeys<Commit<string>>

export const Commits = sequelize.define<Model<Table, Table>, Table>(
  'commits',
  {
    commit_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },

    created_time: DataTypes.BIGINT,
    last_edit_time: DataTypes.BIGINT,
    operation: DataTypes.CHAR,
    target_table: DataTypes.CHAR,
    source: DataTypes.CHAR,
    user: DataTypes.BIGINT,
    data: DataTypes.TEXT
  },
  {
    timestamps: false,
    indexes: [
      {
        fields: ['commit_id'],
        unique: true
      }
    ]
  }
)
