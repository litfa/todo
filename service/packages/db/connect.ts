import { getLocalConfig } from '@/config/getLocalConfig'
import { Sequelize } from 'sequelize'
import { db as logger } from '@/utils/log'

const sqlType = await getLocalConfig('sql', 'type')

const connect = async () => {
  if (sqlType == 'mysql') {
    const { database, host, password, port, username } = await getLocalConfig('mysql')
    return new Sequelize({
      dialect: 'mysql',
      database,
      host,
      password: password.toString(),
      port,
      username,
      timezone: '+08:00',
      logging: logger.info.bind(logger)
    })
  } else if (sqlType == 'sqlite') {
    const storage = await getLocalConfig('sqlite', 'storage')
    return new Sequelize({
      dialect: 'sqlite',
      storage,
      logging: logger.info.bind(logger)
    })
  }
}

export const sequelize = await connect()
