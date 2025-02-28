import { inbox } from '@ltfei/todo-common'
import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw[]>[
  {
    path: '',
    name: 'layout',
    component: () => import('@/layout/Default.vue'),
    redirect: `/tasks/${inbox}`,
    meta: {
      auth: true
    },
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
  }
]
