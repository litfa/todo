import { sequelize } from '../connect'
import { DataTypes, Model } from 'sequelize'
import { Config } from '@/config/types'

export type Table = {
  id: number
  uuid: string
  url: string
  status: number
  date: number
  user_id: number
  ineffective: boolean
  auth_method: keyof Config['login_method']
}
/**
 * todo: 添加 生成端 和 登录端 和 是否完成
 */

export const LoginQueue = sequelize.define<Model<Table, Table>, Table>(
  'login_queue',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: DataTypes.UUID
    },
    /**
     * 登录后前端页面的回调地址
     * todo: 增加验证域名是否合法
     */
    url: DataTypes.CHAR,
    status: DataTypes.INTEGER,
    date: DataTypes.BIGINT,
    user_id: DataTypes.INTEGER,
    /**
     * 是否失效
     */
    ineffective: DataTypes.BOOLEAN,
    auth_method: DataTypes.CHAR
  },
  {
    timestamps: false,
    indexes: [
      {
        fields: ['id', 'uuid'],
        unique: true
      }
    ]
  }
)
