import router, { PublicLoginRoutes } from '@/router'
import dynamicRouter from '@/router/dynamic-router'
export default {
  namespaced:true,
  state: {
    sidebarMenu: [] /** 导航菜单 */,
    controlList: [] /** 完整的权限列表 */,
    currentMenu: '' /** 当前active导航菜单 */,
    avatar: ''/** 头像 */,
    account: ''/** 登陆账号 */
  },
  mutations:{
    setAvatar(state, avatar) {
      state.avatar = avatar
    },
    setAccount(state, account) {
      state.account = account
    },
    setMenu(state, menu) {
      state.sidebarMenu = menu
    },
    clearMenu(state) {
      state.sidebarMenu = []
    },
    setCurrentMenu(state, currentMenu) {
      state.currentMenu = currentMenu
    },
    setControlList(state,controlList){
      state.controlList = controlList;
    }
  },
  actions: {
    fetchUserinfo({ commit, state }){
      commit('setAvatar',"images/avatar.png")
      commit('setAccount',"admin")
      let MainContainer = PublicLoginRoutes.find(v => v.name === 'layout')
      let children = MainContainer.children
      commit('setMenu', [...children, ...dynamicRouter])
      commit('setControlList', [...children, ...dynamicRouter])
      children.push(...dynamicRouter)
      router.addRoutes(PublicLoginRoutes)
    }
  }
}
