export default [
  { path: '/', name: '主页', icon: 'home', component: './Index' },
  { path: '/user/account', name: '个人中心', icon: 'user', component: './User/Account' },
  { path: '/user/myinterface', name: '个人接口', icon: 'appstore', component: './User/MyInterface' },
  { path: '/interface_analysis',name: '热门接口', icon: 'BarChart',component: './InterfaceAnalysis'},
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
    ],
  },
  { path: '*', layout: false, component: './404' },
];
