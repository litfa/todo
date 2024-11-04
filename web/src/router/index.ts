import { createRouter, createWebHistory } from 'vue-router'
import { inbox } from '@ltfei/todo-common'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layout/Default.vue'),
      redirect: `/tasks/${inbox}`,
      children: [
        // {
        //   path: 'tasks',
        //   component: () => import('../views/Tasks/Tasks.vue')
        // },
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
    },
    {
      path: '/setting-mobie',
      component: () => import('@/layout/NavBar.vue'),
      meta: { title: '设置' },
      children: [
        {
          path: '',
          name: 'setting-mobie',
          meta: { title: '设置' },
          component: () => import('@/views/Setting/Mobile.vue')
        },
        {
          path: 'about',
          meta: { title: '关于' },
          component: () => import('@/views/Setting/components/AboutSetting.vue')
        },
        {
          path: 'account',
          meta: { title: '账户' },
          component: () => import('@/views/Setting/components/AccountSetting.vue')
        },
        {
          path: 'dev',
          meta: { title: '开发设置' },
          component: () => import('@/views/Setting/components/DevSetting.vue')
        }
      ]
    }
  ]
})

export default router
