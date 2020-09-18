const About = () => import('../views/about')
const MyAbout = () => import('../views/about/my-about')
const YourAbout = () => import('../views/about/your-about')
/*所有需要权限判断的路由 */
const dynamicRoutes = [
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      name: '关于',
      icon: 'el-icon-warning-outline'
    },
    children:[
      {
        path: 'myabout',
        name: 'my-about',
        component: MyAbout,
        meta: {
          name: '关于我',
          icon: 'el-icon-more'
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
