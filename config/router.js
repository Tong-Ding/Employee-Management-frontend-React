import SubRouter from "./subRouter"

export default [
  {
    path: '/',
    component: '@/layouts/SecurityLayout',
    routes: SubRouter
  },
  {
    path: '/login',
    component: '@/layouts/DoorLayout',
    routes: [
      {
        name: 'Login',
        path: '/login',
        // 约定式路由默认以 pages/* 文件夹的文件层级结构来生成路由表
        component: './Login',
      },
    ]
  },
]
