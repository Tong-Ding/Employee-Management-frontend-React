export default [
  {path: '/*', component: '@/pages/404'},
  {
    path: '/',
    redirect: '/department'
  },
  {
    name: 'System',
    icon_: '#icon-bailongjichuxinxi',
    routes: [
      {
        name: 'Department',
        path: '/department',
        component: './Department/Department',
        icon_: '#icon-bailongyingxiaoguanli',
      },
      {
        name: 'Employee',
        path: '/employee',
        component: './Employee/Employee',
        icon_: '#icon-bailongzhanghaoguanli',
      }
    ]
  },
]
