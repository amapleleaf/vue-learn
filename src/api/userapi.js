import axios from '@/util/httpConfig'
export function userAccesstoken(param) {
    return axios.post('/user/accesstoken',param)
}
export function querySysUserList(param) {
    return axios.post('/user/querySysUserList',param)
}