const SysConf = () => import('../views/sysconf')
const UserManage = () => import('../views/sysconf/user-manage')
const YourAbout = () => import('../views/sysconf/your-about')
/*所有需要权限判断的路由 */
const dynamicRoutes = [
  {
    path: '/sysconf',
    name: 'SysConf',
    component: SysConf,
    meta: {
      name: '系统配置',
      icon: 'el-icon-setting'
    },
    children:[
      {
        path: 'usermanage',
        name: 'UserManage',
        component: UserManage,
        meta: {
          name: '用户管理',
          icon: 'el-icon-user'
        }
      },
      {
        path: 'yourabout',
        name: 'your-about',
        component: YourAbout,
        meta: {
          name: '关于你',
          icon: 'el-icon-more-outline'
        }
      }
    ]
  }
]

export default dynamicRoutes
