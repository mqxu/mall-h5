// user.js
import axios from '../utils/axios'

// 注册
export function register (params) {
    return axios.post('/user/register', params)

// 登录
export function login (params) {
    return axios.post('/user/login', params)
}

// 获取用户信息
export function getUserInfo () {
    return axios.get('/user/info')
}

// 登出
export function logout () {
    return axios.post('/user/logout')
}

}