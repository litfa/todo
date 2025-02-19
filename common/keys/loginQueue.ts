export const loginStatus = {
  /**
   * 未登录
   */
  notLogin: 0,
  /**
   * 已扫码
   */
  scanCode: 1,
  /**
   * 已获取qq互联登录url 已创建登录地址
   */
  getQqConnectUrl: 2,
  /**
   * 登录成功
   */
  loginSucceed: 10,
  /**
   * 登录失败(用户取消登录)
   */
  loginFailedUserCancel: 20,
  /**
   * 登录失败(其他原因)
   */
  loginFailedOtherCause: 21,
  /**
   * 登录失败(登录超时) (不在数据库体现，仅返回数据时判断时间)
   */
  loginFailedTimeout: 22
} as const
