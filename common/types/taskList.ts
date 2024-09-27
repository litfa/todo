export interface TaskList {
  id: string
  /**
   * 是否共享
   */
  isSharedFolder: boolean
  /**
   *
   */
  IsOwner: boolean
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
}
