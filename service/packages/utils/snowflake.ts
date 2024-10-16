import { Snowflake } from '@sapphire/snowflake'

const epoch = new Date('2000-01-01T00:00:00.000Z')

export const snowflake = new Snowflake(epoch)

/**
 * 生成10进制id
 * @returns 10进制id
 */
export const generateId = () => {
  const id = snowflake.generate()
  return id.toString(10)
}
