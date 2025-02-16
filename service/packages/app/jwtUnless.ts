/**
 * jwt忽略的路由列表
 * 仅匹配开头
 */
const paths: string[] = ['/auth/']

export default paths.map((e) => {
  return new RegExp(`^${e}`)
})
