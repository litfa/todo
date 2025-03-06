export type OptionalExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

/**
 * 部分可选
 */
export type PartialPart<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
