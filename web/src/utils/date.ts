import dayjs from 'dayjs'

export const isToday = (date?: dayjs.ConfigType) => {
  return dayjs(date).isSame(dayjs(), 'day')
}
export const isYesterday = (date?: dayjs.ConfigType) => {
  return dayjs(date).isSame(dayjs().add(-1, 'day'), 'day')
}
export const isTomorrow = (date?: dayjs.ConfigType) => {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day')
}
