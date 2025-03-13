// export type OptionalExcept<T, K extends keyof T> = {
//   [P in keyof T]: P extends K ? T[P] : T[P] | void
// }

export type OptionalExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

export type ReadonlyDeep<T> = {
  // 如果 T 是数组，则递归地使数组元素变为只读
  readonly [P in keyof T]: T[P] extends (infer U)[]
    ? ReadonlyDeep<U>[]
    : // 如果 T 是对象，则递归地使对象的每个属性都变为只读
      T[P] extends object
      ? ReadonlyDeep<T[P]>
      : // 否则，保持原类型但变为只读
        T[P]
}

export type ValueOf<T> = T[keyof T]
