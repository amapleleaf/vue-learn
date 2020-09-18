import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (!store.state.UserToken) {
    if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (!store.state.userinfo.controlList||store.state.userinfo.controlList.length == 0 ) {
      store.dispatch('userinfo/fetchUserinfo').then(() => {
        next({ path: to.path })
      }) 
    } else {
      if (to.path !== '/login') {
        next()
      } else {
        next(from.fullPath)
      }
    }
  }
})
router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('userinfo/setCurrentMenu', to.name)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
