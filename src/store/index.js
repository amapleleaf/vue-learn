import Vue from 'vue'
import Vuex from 'vuex'
import userinfo from './userinfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    get UserToken() {
      return localStorage.getItem('token')
    },
    set UserToken(value) {
      localStorage.setItem('token', value)
    },
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: []
  },
  mutations: {
    loginIn(state, token) {
      state.UserToken = token
    },
    loginOut(state) {
      state.UserToken = ''
    },
    toggleNavCollapse(state) {
      state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
      state.crumbList = list
    }
  },
  actions: {
  },
  modules: {
    userinfo
  }
})
