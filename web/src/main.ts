import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './root/App.vue'
import router from './router'
import i18n from './lang'

import './assets/style/main.less'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
