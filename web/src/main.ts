import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { persistedstate } from '@/utils/localforage'

import App from './App.vue'
import router from './router'

import './assets/style/main.less'

const app = createApp(App)
const pinia = createPinia()

pinia.use(persistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
