import { Snowflake } from '@sapphire/snowflake'
import bigInt from 'big-integer'

const epoch = new Date('2000-01-01T00:00:00.000Z')

export const snowflake = new Snowflake(epoch)

/**
 * 生成10进制bigint id
 * @returns 10进制id
 */
export const generateId = () => {
  const id = snowflake.generate()
  return id
}

/**
 * 生成36进制字符串id
 */
export const generateIdString = () => {
  return generateId().toString(36)
}

/**
 * 解析id并转为36进制字符串
 */
export const parse36RadixId = (id: string | number | BigInt): string => {
  if (typeof id == 'number') {
    return id.toString(36)
  }
  if (typeof id == 'bigint' || typeof id == 'object') {
    return id.toString(36)
  }
  if (/[0-9]{0,}/.test(id)) {
    return bigInt(id).toString(36)
  }
  return id
}

/**
 * 解析id并转为10进制bigint
 */
export const parse10RadixId = (id: string | number | BigInt | bigint): bigint => {
  if (typeof id == 'number') {
    return BigInt(id)
  }
  if (typeof id == 'object') {
    return BigInt(id.toString())
  }
  if (typeof id == 'bigint') {
    return id
  }

  if (/^[0-9]{0,}$/.test(id)) {
    return BigInt(id)
  }
  return BigInt(bigInt(id, 36).toString())
}
