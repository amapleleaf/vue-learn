import axios from '@/util/httpConfig'
export function userAccesstoken(param) {
    return axios.post('/user/accesstoken',param)
}
export function querySysUserList(param) {
    return axios.post('/user/querySysUserList',param)
}
export function saveSysUser(param) {
    return axios.post('/user/saveSysUser',param)
}
export function getLoginUserInfo(param) {
    return axios.post('/user/getLoginUserInfo',param)
}
export function querySysRoleList(param) {
    return axios.post('/role/querySysRoleList',param)
}
