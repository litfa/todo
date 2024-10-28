import dayjs from 'dayjs'
import i18n from '@/lang'

const { t } = i18n.global

export const isToday = (date?: dayjs.ConfigType) => {
  return dayjs(date).isSame(dayjs(), 'day')
}
export const isYesterday = (date?: dayjs.ConfigType) => {
  return dayjs(date).isSame(dayjs().add(-1, 'day'), 'day')
}
export const isTomorrow = (date?: dayjs.ConfigType) => {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day')
}

export const getWeekText = (date: dayjs.ConfigType) => {
  date = dayjs(date)
  const day = date.day()

  if (date.isSame(dayjs(), 'week')) {
    return t('this_week_n', [t('week_' + day)])
  }
  if (date.isSame(dayjs().add(1, 'week'), 'week')) {
    return t('next_week_n', [t('week_' + day)])
  }
  if (date.isSame(dayjs().add(-1, 'week'), 'week')) {
    return t('last_week_n', [t('week_' + day)])
  }

  return t('week_' + day)
}

export const formatDate = (date: dayjs.ConfigType, accuracy: 'day'): string => {
  date = dayjs(date)
  if (accuracy == 'day') {
    if (isToday(date)) return t('today')
    if (isYesterday(date)) return t('yesterday')
    if (isTomorrow(date)) return t('tomorrow')
    // 当年，返回 月日
    if (dayjs().isSame(date, 'year')) {
      date.format('MM-DD')
      return `${date.format('MM-DD')} ${getWeekText(date)}`
    }
    // 非当年，返回年月日
    return `${date.format('YYYY-MM-DD')} ${getWeekText(date)}`
  }
  return date.format('YYYY-MM-DD')
}
