import { UnderlineObjectKeys, CamelObjectKeys } from '@/db/types'

/**
 * 将对象的键从驼峰转换为下划线
 */
export function convertKeysToSnakeCase<T>(obj: T): UnderlineObjectKeys<T> {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToSnakeCase(item)) as any
  } else if (typeof obj === 'object' && obj !== null) {
    const result: any = {}
    Object.keys(obj).forEach((key) => {
      const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
      result[newKey] = convertKeysToSnakeCase((obj as any)[key])
    })
    return result
  }
  return obj as UnderlineObjectKeys<T>
}

export function convertKeysToCamelCase<T>(obj: T): CamelObjectKeys<T> {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item)) as any
  } else if (typeof obj === 'object' && obj !== null) {
    const result: any = {}
    Object.keys(obj).forEach((key) => {
      let newKey = key
      if (key.includes('_')) {
        const parts = key.split('_')
        newKey =
          parts[0] +
          parts
            .slice(1)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('')
      }
      result[newKey] = convertKeysToCamelCase((obj as any)[key])
    })
    return result
  }
  return obj as CamelObjectKeys<T>
}
