export interface BasisTask {
  /**
   * id
   */
  id: string
  /**
   * 创建时的本地id
   */
  createdWithLocalId: string
  /**
   * 主题
   */
  subject: string

  /**
   * 完成状态
   */
  status: number
  /**
   * 创建时间
   */
  createdTime: number
  /**
   * 实际完成时间
   */
  completedDateTime: number
  /**
   * 最后编辑时间
   */
  lastEditTime: boolean
  /**
   * todo: order
   */
}

export interface Task extends BasisTask {
  /**
   * 正文
   */
  body: string
  /**
   * 重要的
   */
  isImported: boolean
  /**
   * 到期时间
   */
  expirationTime: number
  /**
   * 开始时间
   */
  startTime: number
  /**
   * 是否提醒
   */
  isReminderOn: boolean

  /**
   * 所在分组id
   */
  parentFolderId: string
  /**
   * 提醒时间
   */
  reminderDateTime: number
  /**
   * 创建用户
   */
  createUser: number
  /**
   * 子任务
   */
  subtasks: SubTask[]
}

export interface SubTask extends BasisTask {
  parentId: string
}
