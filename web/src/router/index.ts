import { createRouter, createWebHistory } from 'vue-router'
import mainRouters from './main'
import simpleRouters from './simple'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: () => import('@/root/Main.vue'),
      children: mainRouters
    },
    {
      path: '',
      component: () => import('@/root/Simple.vue'),
      children: simpleRouters
    }
  ]
})

export default router
