import { Config } from '@tarojs/taro'

export default {
  appid: 'wxbf9769e7ef535e44',
  pages: [
    //
    'pages/index/index',
    'pages/my/my'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',

        iconPath: 'static/tabBar/home.png',
        selectedIconPath: 'static/tabBar/home_active.png',
        text: '首页'
      },
      {
        pagePath: 'pages/my/my',
        iconPath: 'static/tabBar/user.png',
        selectedIconPath: 'static/tabBar/user_active.png',
        text: '我'
      }
    ]
  },
  subPackages: [
    {
      root: 'subpkg',
      pages: ['login/login', 'editUserInfo/editUserInfo']
    }
  ]
} as Config
