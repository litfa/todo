import { Snowflake } from '@sapphire/snowflake'

const epoch = new Date('2000-01-01T00:00:00.000Z')

export const snowflake = new Snowflake(epoch)

/**
 * 生成带有来源标识的32进制字符串id
 * @returns 32进制字符串
 */
export const generateId = () => {
  const id = snowflake.generate()
  return id.toString(10)
}
