import { sequelize } from './connect'

await sequelize.sync({ alter: true })
export { sequelize }

export * from './tables/permission'
export * from './tables/permission_groups'
export * from './tables/permission_user_group'
export * from './tables/config'
export * from './tables/tasks'
export * from './tables/taskList'
export * from './tables/subTasks'
export * from './tables/commits'
export * from './tables/users'
export * from './tables/login_queue'

import('./assocs')
