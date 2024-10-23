type UpperLetter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'

type UnderlineChar<Str extends string> = Str extends UpperLetter
  ? `_${Lowercase<Str>}`
  : Str

/**
 * 驼峰转下划线
 */
export type UnderlineCase<Str extends string> =
  Str extends `${infer First}${infer Upper}${infer Rest}`
    ? `${UnderlineChar<First>}${UnderlineChar<Upper>}${UnderlineCase<Rest>}`
    : Str

/**
 * 下划线转驼峰
 */
export type CamelCase<Str extends string> =
  Str extends `${infer First}_${infer Second}${infer Rest}`
    ? `${First}${Uppercase<Second>}${CamelCase<Rest>}`
    : Str

/**
 * 将对象的key转换为下划线
 */
export type UnderlineObjectKeys<T> = {
  [K in keyof T as UnderlineCase<string & K>]: T[K]
}

/**
 * 将对象的key转换为驼峰
 */
export type CamelObjectKeys<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K]
}
