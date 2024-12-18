import type { RouteRecordRaw } from 'vue-router'
import { inbox } from '@ltfei/todo-common'

export default <RouteRecordRaw[]>[
  {
    path: '',
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
  }
]
