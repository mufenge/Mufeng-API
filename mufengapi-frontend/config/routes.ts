export default [
  { path: '/', name: '主页', icon: 'smile', component: './Index' },
  { path: '/user/account', name: '个人信息', icon: 'user', component: './User/Account' },
  { path: '/user/myinterface', name: '接口信息', icon: 'appstore', component: './User/MyInterface' },
  {
    path: '/interface_info/:id',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },

  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        path: '/admin/interface_info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口分析',
        path: '/admin/interface_analysis',
        component: './Admin/InterfaceAnalysis',
      },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
