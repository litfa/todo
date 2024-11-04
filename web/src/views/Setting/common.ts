import AccountSetting from './components/AccountSetting.vue'
import AboutSetting from './components/AboutSetting.vue'
import DevSetting from './components/DevSetting.vue'

export const components = {
  AccountSetting,
  AboutSetting,
  DevSetting
}

export type Key = keyof typeof components
