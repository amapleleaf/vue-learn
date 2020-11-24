import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout'
import NotFound from '../views/errorPage/404'
import Home from '../views/home'
Vue.use(Router)
//push
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
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
    name: 'Layout',
    redirect: 'Home',
    meta: {
      name: '首页',
      requiresAuth: true,
    },
    children: [
      {
        id: 1,
        path: 'home',
        component: Home,
        name: 'Home',
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
