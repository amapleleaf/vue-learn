import router, { PublicLoginRoutes } from '@/router'
import dynamicRouter from '@/router/dynamic-router'
import { getLoginUserInfo } from '@/api/userapi'
import {recursionRouter} from '@/util/recursion-router'
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
    async fetchUserinfo({commit, state}) {
      debugger;
      let userInfo = await getLoginUserInfo();
      commit('setAvatar', "images/avatar.png");
      commit('setAccount', userInfo.userName);
      let routes = recursionRouter(userInfo.menuCodeList, dynamicRouter);
      let MainContainer = PublicLoginRoutes.find(v => v.name === 'Layout');
      let children = MainContainer.children;
      commit('setControlList', [...children, ...dynamicRouter])
      if(routes&&routes.length>0) {
        children.push(...routes);
      }
      commit('setMenu', children);
      router.addRoutes(PublicLoginRoutes)
    }
  }
}
