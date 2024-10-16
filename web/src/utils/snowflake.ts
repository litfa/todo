import { Snowflake } from '@sapphire/snowflake'

const epoch = new Date('2000-01-01T00:00:00.000Z')

export const snowflake = new Snowflake(epoch)

/**
 * 生成带有来源标识的36进制字符串id
 * @returns 36进制字符串
 */
export const generateIdWithSource = () => {
  return 'web:' + generateIdString()
}

/**
 * 生成36进制字符串id
 */
export const generateIdString = () => {
  return generateId().toString(36)
}

/**
 * 生成10进制id
 */
export const generateId = () => {
  return snowflake.generate()
}
