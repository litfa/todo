import { createI18n } from 'vue-i18n'
import zhCn from './zh-cn'
import en from './en'
import { type Lang } from '@ltfei/todo-common'

type MessageSchema = typeof zhCn

const i18n = createI18n<[MessageSchema], Lang>({
  locale: 'zh-cn',
  legacy: false,
  globalInjection: true,
  messages: {
    'zh-cn': zhCn,
    en
  }
})

export default i18n
