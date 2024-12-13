import AccountSetting from './components/AccountSetting.vue'
import AboutSetting from './components/AboutSetting.vue'
import DevSetting from './components/DevSetting.vue'
import RemindSetting from './components/RemindSetting.vue'

export const components = {
  AccountSetting,
  AboutSetting,
  DevSetting,
  RemindSetting
}

export type Key = keyof typeof components
