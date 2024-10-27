import dayjs from 'dayjs'

export const isToday = (date?: dayjs.ConfigType) => {
  return dayjs(date).isSame(dayjs(), 'day')
}
