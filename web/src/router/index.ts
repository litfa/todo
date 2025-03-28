import { hasToken } from '@/utils/auth'
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

router.beforeEach((to) => {
  if (!to.meta.auth) {
    return
  }
  if (hasToken()) {
    return
  }

  return '/login'
})

export default router
