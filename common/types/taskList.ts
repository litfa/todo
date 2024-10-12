export interface TaskList {
  id: string
  /**
   * 创建时的本地id
   */
  createdWithLocalId: string
  /**
   * 是否共享
   */
  isSharedFolder: boolean

  /**
   * 分组名
   */
  name: string
  /**
   * todo: 排序
   */
  /**
   * 共享链接
   */
  sharingLink: string
  /**
   * 显示已完成的任务
   */
  showCompletedTasks: boolean
  // 升序
  sortAscending: boolean
  /**
   * 排序类型
   */
  sortType: string
  /**
   * 主体背景
   */
  themeBackground: string
  /**
   * 主题色
   */
  themeColor: string
  /**
   * 所在组id
   */
  parentFolderGroupId: string
  /**
   * 创建用户
   */
  owner: string
  /**
   * 状态
   */
  status: number
  /**
   * 创建时间
   */
  createdTime: number
}
