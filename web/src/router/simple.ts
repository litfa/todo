import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw[]>[
  {
    path: '/notification',
    name: 'notification',
    component: () => import('@/views/Notification/Notification.vue')
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
  },
  {
    path: '/tray-menu',
    name: 'tray-menu',
    component: () => import('@/views/TrayMenu/TrayMenu.vue')
  }
]
