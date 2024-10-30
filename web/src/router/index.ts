import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layout/Default.vue'),
      children: [
        {
          path: 'tasks',
          component: () => import('../views/Tasks/Tasks.vue')
        },
        {
          path: 'tasks/:id',
          component: () => import('../views/Tasks/Tasks.vue')
        }
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Setting/Setting.vue')
    }
  ]
})

export default router
