import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getUserinfo } from './utils/getUserInfo'

import './app.less'
// import "@nutui/nutui-taro/dist/style.css";

const App = createApp({
  onShow() {},
  created() {
    getUserinfo()
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())

export default App
