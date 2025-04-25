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
    meta: {
      auth: true
    },
    component: () => import('@/views/Setting/Setting.vue')
  },
  {
    path: '/setting-mobie',
    component: () => import('@/layout/NavBar.vue'),
    meta: { title: '设置', auth: true },
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
      },
      {
        path: 'remind',
        meta: { title: '提醒' },
        component: () => import('@/views/Setting/components/RemindSetting.vue')
      },
      {
        path: 'more',
        meta: { tiele: '更多' },
        component: () => import('@/views/Setting/components/MoreSetting.vue')
      }
    ]
  },
  {
    path: '/tray-menu',
    name: 'tray-menu',
    component: () => import('@/views/TrayMenu/TrayMenu.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => {
      if (window.innerWidth < 450) {
        return import('@/views/Login/Mobile.vue')
      }

      return import('@/views/Login/Login.vue')
    }
  }
  // {
  //   path: '/login-mobile',
  //   name: 'login-mobie',
  //   component: () => import('@/views/Login/Mobile.vue')
  // }
]
