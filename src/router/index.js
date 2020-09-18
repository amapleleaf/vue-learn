import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout'
import NotFound from '../views/errorPage/404'
import Home from '../views/home'
Vue.use(Router)
export default new Router({
  base: process.env.BASE_URL,
  routes: [{
    path: '/login',
    name:'login',
    component: Login
  }]
})

export const PublicLoginRoutes = [
  {
    path: '/',
    component: Layout,
    name: 'layout',
    redirect: 'home',
    meta: {
      name: '首页',
      requiresAuth: true,
    },
    children: [
      {
        id: 1,
        path: 'home',
        component: Home,
        name: 'home',
        meta: {
          name: '首页',
          icon: 'el-icon-s-home'
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]
