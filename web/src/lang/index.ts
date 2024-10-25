import { createI18n } from 'vue-i18n'
import zhCn from './zh-cn'

type MessageSchema = typeof zhCn

const i18n = createI18n<[MessageSchema], 'zh-cn'>({
  locale: 'zh-cn',
  legacy: false,
  globalInjection: true,
  messages: {
    'zh-cn': zhCn
  }
})

export default i18n
