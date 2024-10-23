/**
 * commits
 * 提交记录
 */

import { sequelize } from '../connect'
import { DataTypes, Model } from 'sequelize'
import { Commit } from '@ltfei/todo-common'
import { UnderlineObjectKeys } from '../types'

interface TableType extends Commit<string> {
  commit_id: number
}

type Table = UnderlineObjectKeys<TableType>

export const Commits = sequelize.define<Model<Table, Table>, Table>(
  'commits',
  {
    commit_id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },

    created_time: DataTypes.BIGINT,
    last_edit_time: DataTypes.BIGINT,
    operation: DataTypes.CHAR,
    target_table: DataTypes.CHAR,
    source: DataTypes.CHAR,
    user: DataTypes.BIGINT,
    data: DataTypes.TEXT,
    sync_time: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
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
